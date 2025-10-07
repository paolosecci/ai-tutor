'use client';
import React, { useEffect } from 'react';
import { useChat } from '@ai-sdk/react';

interface ChatInterfaceProps {
  pdfId: string;
  onHighlight?: (highlights: string[]) => void;
}

export default function ChatInterface({ pdfId, onHighlight }: ChatInterfaceProps) {
  const { messages, sendMessage, status, error, setMessages } = useChat();

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
{ "highlight": "exact text to highlight (optional)", "response": "natural language response" }.
If there is no highlight, "highlight" can be an empty string.`,
            },
          ],
        },
        ...prev,
      ];
    });
  }, [pdfId, setMessages]);

  const isLoading = status === 'submitted' || status === 'streaming';

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
  };

  // Extract JSON from assistant messages
  const extractJson = (text: string) => {
    try {
      return JSON.parse(text.trim());
    } catch {
      console.log('Direct JSON parse failed, trying to extract JSON...');
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found');
    }
  };

  // Get display text for messages
  const getDisplayText = (text: string, role: string) => {
    if (role !== 'assistant') return text; // Display user/system messages as-is
    try {
      const parsed = extractJson(text);
      return parsed?.response || text;
    } catch (err) {
      console.error('Display parse error:', err, 'on text:', text);
      return text; // Fallback to raw text if parsing fails
    }
  };

  // Extract highlight from assistant messages
  const extractHighlight = (text: string) => {
    try {
      const parsed = extractJson(text);
      if (parsed?.highlight && typeof parsed.highlight === 'string' && parsed.highlight.trim()) {
        return parsed.highlight.trim();
      }
      return null;
    } catch {
      return null;
    }
  };

  // Handle new AI responses for highlights
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'assistant') return;

    lastMsg.parts.forEach(part => {
      if (part.type === 'text') {
        console.log('Processing new AI response:', part.text);
        const highlight = extractHighlight(part.text);
        if (highlight) {
          console.log('New highlight found:', highlight);
          console.log('Calling onHighlight with:', [highlight]);
          onHighlight?.([highlight]);
        } else {
          console.log('No highlight in new response');
        }
      }
    });
  }, [messages, onHighlight]);

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded shadow">
      {/* Header */}
      <div className="h-[4vh] px-4 flex items-center border-b bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
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

      {/* Error */}
      {error && <div className="text-red-500 p-2">{String(error)}</div>}

      {/* Input / Footer */}
      <form
        onSubmit={onSubmit}
        className="h-[5vh] flex border-t bg-white p-1 rounded-b"
      >
        <input
          name="input"
          type="text"
          placeholder="Ask about the PDF..."
          className="flex-1 border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}