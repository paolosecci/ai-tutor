'use client';
import { use } from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';

const PDFViewer = dynamic(
  () => import('@/components/PDFViewer').then((mod) => ({ default: mod.PDFViewer })),
  { ssr: false }
);

interface TutorPageProps {
  params: Promise<{ pdfId: string }>;
}

export default function TutorPage(props: TutorPageProps) {
  const { pdfId } = use(props.params);
  const [highlights, setHighlights] = useState<string[]>([]);

  return (
    <div className="flex h-screen w-screen bg-blue-100 overflow-hidden gap-2 p-2">

      {/* Left panel: PDF Viewer */}
      <div className="flex flex-col rounded shadow flex-1">
        <PDFViewer pdfId={pdfId} highlights={highlights} />
      </div>

      {/* Right panel: Chat */}
      <div className="flex flex-col rounded shadow flex-1">
        <ChatInterface pdfId={pdfId} onHighlight={setHighlights} />
      </div>
    </div>
  );
}