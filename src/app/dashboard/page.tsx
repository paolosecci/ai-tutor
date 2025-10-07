'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    router.push('/login');
    return null;
  }

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('pdf', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/tutor/${id}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Upload PDF</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 w-full">Upload</button>
    </div>
  );
}