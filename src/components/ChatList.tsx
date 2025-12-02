'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ChatList() {
  const { data: session, status } = useSession();
  const [chats, setChats] = useState<Array<{ id: string; title: string; date: string }>>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/chats')
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) setChats(data);
        });
    }
  }, [status]);

  if (status === 'loading') return <p className="text-gray-500">Loading...</p>;
  if (!session) return null;
  if (chats.length === 0) return <p className="text-gray-500">No chats yet.</p>;

  return (
    <div>
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <h2 className="text-xl font-semibold">Your Chat History</h2>
      </div>
      <ul className="space-y-2 bg-gray-50">
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link
              href={`/tutor/${chat.id}`}
              className="flex justify-between items-center p-2 rounded hover:bg-blue-200 transition"
            >
              <span className="truncate pr-4">{chat.title}</span>
              <span className="text-xs text-gray-500">{chat.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}