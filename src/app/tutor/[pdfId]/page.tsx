'use client';
import { use } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [highlights, setHighlights] = useState<string[]>([]);

  return (
    <div className="flex h-screen w-screen bg-green-50 overflow-hidden gap-2 p-2">
      {/* Left panel: PDF Viewer */}
      <div className="flex flex-col bg-white rounded shadow flex-1">
        {/* Header with back button */}
        <div className="h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t">
          <h2 className="text-md font-semibold text-gray-800">PDF Viewer</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 px-2 py-0.5 text-sm rounded hover:bg-gray-300 transition"
          >
            Upload New PDF
          </button>
        </div>

        {/* PDF content */}
        <PDFViewer pdfId={pdfId} highlights={highlights} />
      </div>

      {/* Right panel: Chat */}
      <div className="flex flex-col bg-green-100 p-2 rounded shadow flex-1">
        <ChatInterface pdfId={pdfId} onHighlight={setHighlights} />
      </div>
    </div>
  );
}