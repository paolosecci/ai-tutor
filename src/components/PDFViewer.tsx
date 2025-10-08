'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface PDFViewerProps {
  pdfId: string;
  highlights?: string[];
}

interface HighlightBox {
  id: string;
  page: number;
  left: number;
  top: number;
  width: number;
  height: number;
  color?: string;
}

export function PDFViewer({ pdfId, highlights = [] }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfUrl, setPdfUrl] = useState('');
  const [highlightBoxes, setHighlightBoxes] = useState<HighlightBox[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch(`/api/pdf/${pdfId}`);
      if (response.ok) {
        const json = await response.json();
        setPdfUrl(json.filePath);
      }
    };
    if (pdfId) fetchPdf();
  }, [pdfId]);

  const simplify = (s: string) =>
    (s || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '') // remove punctuation, whitespace
      .trim();

  const findPageEl = useCallback(() => {
    return containerRef.current?.querySelector('.react-pdf__Page') as HTMLElement | null;
  }, []);

  const computeHighlightsFromDOM = useCallback(
    (highlightTexts: string[]) => {
      const pageEl = findPageEl();
      if (!pageEl) return;

      const containerRect = pageEl.getBoundingClientRect();
      const spans = Array.from(pageEl.querySelectorAll<HTMLElement>('span[role="presentation"]')).map((el) => {
        const text = (el.textContent || '').replace(/\u00A0/g, ' ').trim();
        return {
          el,
          text,
          simple: simplify(text),
          rect: el.getBoundingClientRect(),
        };
      });

      const prefixLens: number[] = [];
      let acc = 0;
      for (const s of spans) {
        prefixLens.push(acc);
        acc += s.simple.length;
      }

      const concatenated = spans.map((s) => s.simple).join('');
      const found: HighlightBox[] = [];

      highlightTexts.forEach((rawText) => {
        if (!rawText?.trim()) return;
        const normalized = simplify(rawText);
        if (!normalized) return;

        const pos = concatenated.indexOf(normalized);
        if (pos === -1) {
          console.warn('No match for', rawText);
          return;
        }

        // find exact start and end spans
        let startIdx = 0;
        while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= pos) {
          startIdx++;
        }

        let endIdx = startIdx;
        const endPos = pos + normalized.length - 1;
        while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) {
          endIdx++;
        }

        const matchedSpans = spans.slice(startIdx, endIdx + 1);

        if (matchedSpans.length === 1) {
          const s = matchedSpans[0];
          const left = s.rect.left - containerRect.left + pageEl.scrollLeft;
          const top = s.rect.top - containerRect.top + pageEl.scrollTop;
          found.push({
            id: `${rawText}-${currentPage}`,
            page: currentPage,
            left,
            top,
            width: s.rect.width,
            height: s.rect.height,
            color: 'rgba(255,255,0,0.35)',
          });
          console.debug('Matched single span', rawText, s.text);
        } else {
          // Multi-span match (rare)
          const left = Math.min(...matchedSpans.map((m) => m.rect.left));
          const top = Math.min(...matchedSpans.map((m) => m.rect.top));
          const right = Math.max(...matchedSpans.map((m) => m.rect.right));
          const bottom = Math.max(...matchedSpans.map((m) => m.rect.bottom));
          found.push({
            id: `${rawText}-${currentPage}`,
            page: currentPage,
            left: left - containerRect.left + pageEl.scrollLeft,
            top: top - containerRect.top + pageEl.scrollTop,
            width: right - left,
            height: bottom - top,
            color: 'rgba(255,255,0,0.35)',
          });
          console.debug('Matched multi-span', rawText);
        }
      });

      setHighlightBoxes(found);
    },
    [currentPage, findPageEl]
  );

  useEffect(() => {
    if (!highlights?.length) {
      setHighlightBoxes([]);
      return;
    }
    const timer = setTimeout(() => computeHighlightsFromDOM(highlights), 150);
    return () => clearTimeout(timer);
  }, [highlights, currentPage, computeHighlightsFromDOM]);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  const onPageRenderSuccess = () => {
    setTimeout(() => computeHighlightsFromDOM(highlights), 120);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">
      <div ref={containerRef} className="flex-1 flex justify-center items-center overflow-auto p-2">
        {pdfUrl && (
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="w-auto">
            <div style={{ position: 'relative' }}>
              <Page
                pageNumber={currentPage}
                height={containerRef.current ? containerRef.current.clientHeight * 0.97 : undefined}
                onRenderSuccess={onPageRenderSuccess}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                {highlightBoxes
                  .filter((h) => h.page === currentPage)
                  .map((h) => (
                    <div
                      key={h.id}
                      style={{
                        position: 'absolute',
                        left: `${h.left}px`,
                        top: `${h.top}px`,
                        width: `${h.width}px`,
                        height: `${h.height}px`,
                        backgroundColor: h.color,
                        borderRadius: 2,
                      }}
                    />
                  ))}
              </div>
            </div>
          </Document>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-2 p-2 border-t bg-white rounded-b">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
          disabled={currentPage === numPages}
          className="p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;