'use client';
import { use } from 'react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';

const PDFViewer = dynamic(
  () => import('@/components/PDFViewer').then((mod) => ({ default: mod.PDFViewer })),
  { ssr: false }
);

interface TutorPageProps {
  params: Promise<{ chatId: string }>;
}

export default function TutorPage(props: TutorPageProps) {
  const { chatId } = use(props.params);
  const [pdfId, setPdfId] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/chat/${chatId}`)
      .then(res => res.json())
      .then(data => setPdfId(data.pdfId));
  }, [chatId]);

  return (
    <div className="flex h-screen w-screen bg-blue-100 overflow-hidden gap-2 p-2">

      {/* Left panel: PDF Viewer */}
      <div className="flex flex-col rounded shadow flex-1">
        <PDFViewer pdfId={pdfId} highlights={highlights} />
      </div>

      {/* Right panel: Chat */}
      <div className="flex flex-col rounded shadow flex-1">
        <ChatInterface chatId={chatId} pdfId={pdfId} onHighlight={setHighlights} />
      </div>
    </div>
  );
}