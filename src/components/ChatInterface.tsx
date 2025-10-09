'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface ChatInterfaceProps {
  pdfId: string;
  onHighlight?: (highlights: string[]) => void;
}

export default function ChatInterface({ pdfId, onHighlight }: ChatInterfaceProps) {
  const { messages, sendMessage, status, error, setMessages } = useChat();
  const { transcript, isListening, startListening, stopListening, setTranscript } = useSpeechRecognition();
  const { speak, cancel, isSpeaking } = useSpeechSynthesis({ lang: 'en-US', rate: 1 });
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);

  const lastHighlightRef = useRef<string | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const DEBUG = process.env.NODE_ENV === 'development';

  // === Initialize system prompt ===
  useEffect(() => {
    setMessages((prev: any[]) => {
      if (prev.some((m: any) => m.role === 'system')) return prev;
      return [
        {
          id: 'init',
          role: 'system',
          parts: [
            {
              type: 'reasoning',
              text: `You are an AI tutor assisting with questions about a PDF (ID: ${pdfId}). 
Answer clearly and concisely. Always return JSON in the following format:
{ "highlight": "exact text from the PDF to highlight", "response": "natural language response" }.
For every query, include the most relevant passage from the PDF in the "highlight" field to provide context for your answer, even if the query does not explicitly mention "highlight". If no relevant passage exists or the query cannot be answered logically, set "highlight" to an empty string ("").`,
            },
          ],
        },
        ...prev,
      ];
    });
  }, [pdfId, setMessages]);

  // === Autoscroll on new messages ===
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
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

    setTranscript('');
    stopListening();

    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, 0);
  };

  // Optional: auto-send after stopping mic
  useEffect(() => {
    if (!isListening && transcript.trim()) {
      const value = transcript.trim();
      sendMessage(
        { id: `user-${Date.now()}`, role: 'user', parts: [{ type: 'text', text: value }] },
        { body: { pdfId } }
      );
      setTranscript('');
    }
  }, [isListening]);

  // === Extract JSON from assistant response ===
  const extractJson = (text: string) => {
    if (!text) return null;
    try {
      const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      try { return JSON.parse(cleaned); } catch {
        const match = cleaned.match(/{[\s\S]*}/);
        if (match) {
          try { return JSON.parse(match[0]); } catch {
            const loose = match[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
            return JSON.parse(loose);
          }
        }
      }
      return null;
    } catch { return null; }
  };

  const getDisplayText = (text: string, role: string) => {
    if (role !== 'assistant') return text;
    const parsed = extractJson(text);
    return parsed?.response || text;
  };

  const extractHighlight = (text: string) => {
    const parsed = extractJson(text);
    if (parsed?.highlight && typeof parsed.highlight === 'string' && parsed.highlight.trim()) {
      return parsed.highlight.trim();
    }
    return null;
  };

  // === Handle new assistant messages for highlight + TTS ===
  useEffect(() => {
    if (messages.length === 0 || status === 'streaming') return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'assistant' || lastMsg.id === lastMessageIdRef.current) return;

    lastMessageIdRef.current = lastMsg.id;

    lastMsg.parts.forEach(part => {
      if (part.type === 'text') {
        const parsed = extractJson(part.text);
        const highlight = parsed?.highlight;
        const response = parsed?.response;

        if (highlight && highlight !== lastHighlightRef.current) {
          lastHighlightRef.current = highlight;
          onHighlight?.([highlight]);
        }

        if (response && isSpeakingEnabled) speak(response);
      }
    });
  }, [messages, status, onHighlight, isSpeakingEnabled]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">

      {/* Header */}
      <div className="h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
        <button
          type="button"
          className={`px-3 py-1 rounded ${isSpeakingEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
        >
          {isSpeakingEnabled ? '🔊 Voice On' : '🔈 Off'}
        </button>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map((msg: any) =>
          msg.parts.map((part: any, idx: number) => {
            if (part.type === 'text') {
              const displayText = getDisplayText(part.text, msg.role);
              return (
                <div key={`${msg.id}-${idx}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] break-words p-4 m-1 rounded-2xl shadow ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                    {displayText}
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      {/* Error display */}
      {error && <div className="text-red-500 p-2">{String(error)}</div>}

      {/* Input + mic + send */}
      <form onSubmit={onSubmit} className="flex justify-center mt-2 p-2 border-t bg-white rounded-b">
        <input
          name="input"
          type="text"
          placeholder={isListening ? 'Listening...' : 'Ask about the PDF...'}
          className="flex-1 p-2 rounded-l bg-gray-100 focus:outline-none"
          disabled={isLoading}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={`p-2 px-3 transition ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          title={isListening ? 'Stop recording' : 'Start voice input'}
        >
          🎤
        </button>
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
