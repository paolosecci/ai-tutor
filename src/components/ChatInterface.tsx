'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface ChatInterfaceProps {
  chatId: string;
  pdfId: string;
  onHighlight?: (highlights: string[]) => void;
}

export default function ChatInterface({ pdfId, chatId, onHighlight }: ChatInterfaceProps) {
  const { messages, sendMessage, status, error, setMessages } = useChat();
  const { transcript, isListening, startListening, stopListening, setTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis({ lang: 'en-US', rate: 1 });
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const lastHighlightRef = useRef<string | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // === LOAD SAVED MESSAGES ONCE ===
  useEffect(() => {
    fetch(`/api/messages?chatId=${chatId}`)
      .then(r => r.json())
      .then(saved => {
        if (Array.isArray(saved) && saved.length > 0) {
          setMessages(saved.map((m: any) => ({
            id: m.id,
            role: m.role,
            parts: [{ type: 'text', text: m.content }]
          })));
        }
        setHasInitialized(true);
      })
      .catch(() => setHasInitialized(true));
  }, [chatId, setMessages]);

  // === ADD SYSTEM PROMPT ONLY ONCE, AFTER MESSAGES LOADED ===
  useEffect(() => {
    if (!hasInitialized) return;
    if (messages.length === 0) {
      setMessages([
        {
          id: 'system-init',
          role: 'system',
          parts: [{
            type: 'reasoning',
            text: `You are an AI tutor assisting with questions about a PDF (ID: ${pdfId}). Answer clearly and concisely. Always return JSON in the following format: { "highlight": "exact text from the PDF to highlight", "response": "natural language response" }. For every query, include the most relevant passage from the PDF in the "highlight" field. If no relevant passage exists, set "highlight" to "".`,
          }],
        },
      ]);
    }
  }, [hasInitialized, messages.length, pdfId, setMessages]);

  // === AUTO-SCROLL TO BOTTOM ===
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const isLoading = status === 'submitted' || status === 'streaming';

  // === Handle submit ===
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = transcript.trim();
    if (!value) return;

    sendMessage(
      { id: `user-${Date.now()}`, role: 'user', parts: [{ type: 'text', text: value }] },
      { body: { pdfId } }
    );

    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, role: 'user', content: value })
    }).catch(() => {});

    setTranscript('');
    stopListening();
  };

  // Auto-send after voice
  useEffect(() => {
    if (!isListening && transcript.trim()) {
      const value = transcript.trim();
      sendMessage(
        { id: `user-${Date.now()}`, role: 'user', parts: [{ type: 'text', text: value }] },
        { body: { pdfId } }
      );

      fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, role: 'user', content: value })
      }).catch(() => {});

      setTranscript('');
    }
  }, [isListening]);

  // === Process assistant response (highlight + TTS + save ONCE) ===
  useEffect(() => {
    if (messages.length === 0 || status === 'streaming') return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'assistant' || lastMsg.id === lastMessageIdRef.current) return;

    lastMessageIdRef.current = lastMsg.id;

    lastMsg.parts.forEach(part => {
      if (part.type === 'text') {
        const text = part.text.trim();
        if (!text) return;

        // YOUR PREFERRED CHECK — only last message
        const alreadySaved = messages.length > 0 &&
                             messages[messages.length - 1].role === 'assistant' &&
                             messages[messages.length - 1].parts[0].type === 'text' &&
                             (messages[messages.length - 1].parts[0] as { text: string }).text.trim() === text;

        if (!alreadySaved) {
          fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId, role: 'assistant', content: text })
          }).catch(() => {});
        }

        // Highlight + TTS
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.highlight?.trim() && parsed.highlight.trim() !== lastHighlightRef.current) {
              lastHighlightRef.current = parsed.highlight.trim();
              onHighlight?.([parsed.highlight.trim()]);
            }
            if (parsed.response && isSpeakingEnabled) {
              speak(parsed.response);
            }
          }
        } catch {}
      }
    });
  }, [messages, status, onHighlight, isSpeakingEnabled, chatId]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">
      <div className="h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
        <button
          type="button"
          className={`px-3 py-1 rounded text-sm ${isSpeakingEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setIsSpeakingEnabled(v => !v)}
        >
          {isSpeakingEnabled ? 'Voice On' : 'Voice Off'}
        </button>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map((msg: any) =>
          msg.parts.map((part: any, idx: number) => {
            if (part.type !== 'text') return null;
            const displayText = msg.role === 'assistant'
              ? (JSON.parse(part.text.match(/\{[\s\S]*\}/)?.[0] || '{}')?.response || part.text)
              : part.text;

            return (
              <div key={`${msg.id}-${idx}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] break-words p-4 rounded-2xl shadow ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  {displayText}
                </div>
              </div>
            );
          })
        )}
      </div>

      {error && <div className="text-red-500 p-2 text-center">{String(error)}</div>}

      <form onSubmit={onSubmit} className="flex p-2 border-t bg-white rounded-b gap-2">
        <input
          type="text"
          placeholder={isListening ? 'Listening...' : 'Ask about the PDF...'}
          className="flex-1 px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={`p-3 rounded ${isListening ? 'bg-red-500 text-gray-300' : 'bg-gray-200 hover:bg-gray-500'}`}
        >
          {isListening ? '...' : '🎤'}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}