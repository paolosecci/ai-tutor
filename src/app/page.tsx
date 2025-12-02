// app/page.tsx (or wherever your Home lives)
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ChatList from '@/components/ChatList';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [pdfs, setPdfs] = useState<{ id: string; fileName: string }[]>([]);

  useEffect(() => {
    async function fetchPdfs() {
      if (session?.user?.email) {
        const user = await fetch('/api/user', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json());
        if (user.id) {
          const pdfList = await fetch(`/api/pdf?userId=${user.id}`).then((res) => res.json());
          setPdfs(pdfList);
        }
      }
    }
    fetchPdfs();
  }, [session]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('pdf', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/tutor/${id}`);
    }
  };

  // THIS IS THE NEW MAGIC
  const handleOpenPdf = async (pdfId: string) => {
    const res = await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdfId }),
    });

    if (res.ok) {
      const { id: chatId } = await res.json();
      router.push(`/tutor/${chatId}`);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Left PDF List */}
      <div className="w-1/2 flex flex-col border-r bg-white">
        <div className="p-4 border-b flex items-center justify-between bg-white">
          <h2 className="text-xl font-semibold">Your PDFs</h2>
          {session && (
            <div className="flex items-center space-x-2 bg-white">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border p-2 rounded"
              />
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Upload
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-auto p-4 bg-white">
          {pdfs.length === 0 ? (
            <p className="text-gray-500">No PDFs uploaded yet.</p>
          ) : (
            <ul className="space-y-2 bg-gray-50">
              {pdfs.map((pdf) => (
                <li key={pdf.id}>
                  <button
                    onClick={() => handleOpenPdf(pdf.id)}
                    className="block w-full text-left p-2 rounded hover:bg-blue-100 transition text-blue-700 font-medium"
                  >
                    {pdf.fileName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Chat List */}
      <div className="w-1/2 flex flex-col p-4">
        {session ? (
          <ChatList />
        ) : (
          <div className="m-auto text-center">
            <h1 className="text-2xl mb-4 font-semibold">Welcome to AI Tutor</h1>
            <p className="text-gray-700">
              <a href="/signup" className="text-blue-500 hover:underline">Sign up</a> or{' '}
              <a href="/login" className="text-blue-500 hover:underline">Log in</a> to start.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}