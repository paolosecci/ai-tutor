'use client';
import React, { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';

interface ChatInterfaceProps {
  pdfId: string;
  onHighlight?: (highlights: string[]) => void;
}

export default function ChatInterface({ pdfId, onHighlight }: ChatInterfaceProps) {
  const { messages, sendMessage, status, error, setMessages } = useChat();
  const lastHighlightRef = useRef<string | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const DEBUG = process.env.NODE_ENV === 'development';

  // Initialize system prompt
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

  // Autoscroll to bottom when new messages are added or user submits
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Check if user is near the bottom (within 100px)
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    // Scroll to bottom if near bottom or new message was just added
    if (isNearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const isLoading = status === 'submitted' || status === 'streaming';

  // Handle message submit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem('input') as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;
    sendMessage(
      {
        id: `user-${Date.now()}`,
        role: 'user',
        parts: [{ type: 'text', text: value }],
      },
      { body: { pdfId } }
    );
    input.value = '';
    // Force scroll to bottom after user submits
    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  // Extract JSON from response
  const extractJson = (text: string) => {
    if (!text) return null;
    try {
      // Remove markdown-style ```json fences
      const cleaned = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      // Try direct JSON parse
      try {
        return JSON.parse(cleaned);
      } catch {
        // Try to extract JSON substring
        const jsonMatch = cleaned.match(/{[\s\S]*}/);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[0]);
          } catch (innerErr) {
            if (DEBUG) console.warn('⚠️ Loose JSON parse attempt failed:', innerErr);
            const loose = jsonMatch[0]
              .replace(/,\s*}/g, '}')
              .replace(/,\s*]/g, ']');
            return JSON.parse(loose);
          }
        }
      }
      return null;
    } catch (err) {
      if (DEBUG) console.debug('extractJson(): no JSON found');
      return null;
    }
  };

  // Get display text for messages
  const getDisplayText = (text: string, role: string) => {
    if (role !== 'assistant') return text;
    const parsed = extractJson(text);
    return parsed?.response || text;
  };

  // Extract highlight string
  const extractHighlight = (text: string) => {
    const parsed = extractJson(text);
    if (parsed?.highlight && typeof parsed.highlight === 'string' && parsed.highlight.trim()) {
      return parsed.highlight.trim();
    }
    return null;
  };

  // Handle new assistant messages for highlighting
  useEffect(() => {
    if (messages.length === 0 || status === 'streaming') return; // Skip during streaming

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'assistant' || lastMsg.id === lastMessageIdRef.current) return;

    lastMessageIdRef.current = lastMsg.id;

    lastMsg.parts.forEach(part => {
      if (part.type === 'text') {
        if (DEBUG) console.debug('🧩 Processing final AI response:', part.text);
        const highlight = extractHighlight(part.text);
        if (highlight && highlight !== lastHighlightRef.current) {
          if (DEBUG) {
            console.debug('✅ New highlight found:', highlight);
            console.debug('🔍 Calling onHighlight with:', [highlight]);
          }
          lastHighlightRef.current = highlight;
          onHighlight?.([highlight]);
        } else {
          if (DEBUG) console.debug('ℹ️ No new highlight in response');
        }
      }
    });
  }, [messages, status, onHighlight, DEBUG]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">

      {/* Header */}
      <div className="h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
      >
        {messages.map((msg: any) =>
          msg.parts.map((part: any, idx: number) => {
            if (part.type === 'text') {
              const displayText = getDisplayText(part.text, msg.role);
              return (
                <div
                  key={`${msg.id}-${idx}`}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] break-words p-4 m-1 rounded-2xl shadow ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
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

      {/* Input */}
      <form onSubmit={onSubmit} className="flex justify-center mt-2 p-2 border-t bg-white rounded-b">
        <input
          name="input"
          type="text"
          placeholder="Ask about the PDF..."
          className="flex-1 p-2 rounded-l bg-gray-100 focus:outline-none"
          disabled={isLoading}
        />
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