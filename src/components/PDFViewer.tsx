'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfUrl, setPdfUrl] = useState('');
  const [highlightBoxes, setHighlightBoxes] = useState<HighlightBox[]>([]);
  const [pageTexts, setPageTexts] = useState<string[]>([]); // Cache page text
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<any>(null);
  const lastHighlightRef = useRef<string | null>(null); // Prevent duplicate processing
  const DEBUG = process.env.NODE_ENV === 'development';

  // Fetch PDF URL
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`/api/pdf/${pdfId}`);
        if (response.ok) {
          const json = await response.json();
          setPdfUrl(json.filePath);
        } else {
          console.error('Failed to fetch PDF:', response.status);
        }
      } catch (err) {
        console.error('Error fetching PDF:', err);
      }
    };
    if (pdfId) fetchPdf();
  }, [pdfId]);

  // Normalize text: remove spaces, punctuation, and convert to lowercase
  const simplify = (s: string) =>
    (s || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '') // Remove punctuation, whitespace
      .trim();

  // Split long text into chunks
  const splitIntoChunks = (text: string, maxLength: number = 100): string[] => {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    let currentChunk = '';
    for (const word of words) {
      if ((currentChunk + ' ' + word).length > maxLength) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = word;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + word;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  // Extract text from all pages
  useEffect(() => {
    if (pdfRef.current && numPages > 0) {
      (async () => {
        try {
          const texts = new Array(numPages + 1).fill('');
          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdfRef.current.getPage(pageNum);
            const textContent = await page.getTextContent();
            texts[pageNum] = textContent.items.map((item: any) => item.str).join(' ');
          }
          setPageTexts(texts);
          if (DEBUG) console.log('Extracted page texts:', texts.map((t, i) => ({ page: i, length: t.length })));
        } catch (err) {
          console.error('Error extracting page texts:', err);
        }
      })();
    }
  }, [numPages, DEBUG]);

  // Find the rendered page DOM element
  const findPageEl = useCallback(() => {
    return containerRef.current?.querySelector('.react-pdf__Page') as HTMLElement | null;
  }, []);

  // Compute highlights using DOM text layer
  const computeHighlightsFromDOM = useCallback(
    (highlightTexts: string[], targetPage: number) => {
      const pageEl = findPageEl();
      if (!pageEl) {
        if (DEBUG) console.warn('No rendered page DOM found.');
        setHighlightBoxes([]);
        return;
      }

      const containerRect = pageEl.getBoundingClientRect();
      const spans = Array.from(pageEl.querySelectorAll<HTMLElement>('span[role="presentation"]'))
        .map((el) => {
          const text = (el.textContent || '').replace(/\u00A0/g, ' ').trim();
          return text ? { el, text, simple: simplify(text), rect: el.getBoundingClientRect() } : null;
        })
        .filter((s): s is NonNullable<typeof s> => !!s);

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

        // Try exact match first
        let pos = concatenated.indexOf(normalized);
        let matchedSpans: typeof spans = [];

        // If no exact match, try chunked matching
        if (pos === -1) {
          const chunks = splitIntoChunks(rawText);
          let currentPos = 0;
          matchedSpans = [];
          for (const chunk of chunks) {
            const chunkNormalized = simplify(chunk);
            const chunkPos = concatenated.indexOf(chunkNormalized, currentPos);
            if (chunkPos === -1) {
              matchedSpans = [];
              break;
            }
            let startIdx = 0;
            while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= chunkPos) {
              startIdx++;
            }
            let endIdx = startIdx;
            const endPos = chunkPos + chunkNormalized.length - 1;
            while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) {
              endIdx++;
            }
            matchedSpans.push(...spans.slice(startIdx, endIdx + 1));
            currentPos = chunkPos + chunkNormalized.length;
          }
        } else {
          let startIdx = 0;
          while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= pos) {
            startIdx++;
          }
          let endIdx = startIdx;
          const endPos = pos + normalized.length - 1;
          while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) {
            endIdx++;
          }
          matchedSpans = spans.slice(startIdx, endIdx + 1);
        }

        if (matchedSpans.length === 0) {
          if (DEBUG) console.warn('No match for:', { rawText, page: targetPage });
          return;
        }

        if (matchedSpans.length === 1) {
          const s = matchedSpans[0];
          const left = s.rect.left - containerRect.left + pageEl.scrollLeft;
          const top = s.rect.top - containerRect.top + pageEl.scrollTop;
          found.push({
            id: `${rawText}-${targetPage}`,
            page: targetPage,
            left,
            top,
            width: s.rect.width,
            height: s.rect.height,
            color: 'rgba(255,255,0,0.35)',
          });
          if (DEBUG) console.debug('Matched single span:', { rawText, matchedText: s.text, page: targetPage });
        } else {
          const left = Math.min(...matchedSpans.map((m) => m.rect.left));
          const top = Math.min(...matchedSpans.map((m) => m.rect.top));
          const right = Math.max(...matchedSpans.map((m) => m.rect.right));
          const bottom = Math.max(...matchedSpans.map((m) => m.rect.bottom));
          found.push({
            id: `${rawText}-${targetPage}`,
            page: targetPage,
            left: left - containerRect.left + pageEl.scrollLeft,
            top: top - containerRect.top + pageEl.scrollTop,
            width: right - left,
            height: bottom - top,
            color: 'rgba(255,255,0,0.35)',
          });
          if (DEBUG) console.debug('Matched multi-span:', { rawText, matchedSpans: matchedSpans.map((s) => s.text), page: targetPage });
        }
      });

      setHighlightBoxes(found);
    },
    [findPageEl, DEBUG]
  );

  // Search for highlights across all pages
  const findHighlightPage = useCallback(
    (highlightTexts: string[]) => {
      if (!pageTexts.length || !highlightTexts.length) return;
      if (highlightTexts.join('|') === lastHighlightRef.current) return; // Skip duplicate highlights
      lastHighlightRef.current = highlightTexts.join('|');

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const pageText = pageTexts[pageNum];
        if (!pageText) continue;
        const normalizedPageText = simplify(pageText);
        const match = highlightTexts.some((text) => normalizedPageText.includes(simplify(text)));
        if (match) {
          if (pageNum !== currentPage) {
            if (DEBUG) console.log(`Highlight found on page ${pageNum}, navigating...`);
            setCurrentPage(pageNum);
          }
          setTimeout(() => computeHighlightsFromDOM(highlightTexts, pageNum), 1000); // Increased delay
          return;
        }
      }

      if (DEBUG) console.warn('No page found for highlights:', highlightTexts);
      setHighlightBoxes([]);
    },
    [pageTexts, numPages, currentPage, computeHighlightsFromDOM, DEBUG]
  );

  // Watch for highlight changes
  useEffect(() => {
    if (!highlights?.length) {
      setHighlightBoxes([]);
      lastHighlightRef.current = null;
      return;
    }
    findHighlightPage(highlights);
  }, [highlights, findHighlightPage]);

  // Handle document load
  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
    pdfRef.current = pdf;
  };

  // Handle page render
  const onPageRenderSuccess = () => {
    if (highlights?.length) {
      setTimeout(() => computeHighlightsFromDOM(highlights, currentPage), 1000); // Increased delay
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">

      {/* Header with back button */}
      <div className="h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t">
        <h2 className="text-md font-semibold text-gray-800">PDF Viewer</h2>
        <button
          onClick={() => router.push('/')}
          className="bg-gray-200 px-2 py-0.5 text-sm rounded hover:bg-gray-300 transition"
        >
          Back to PDFs
        </button>
      </div>

      <div ref={containerRef} className="flex-1 flex justify-center items-center overflow-auto p-2">
        {pdfUrl && (
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="w-auto">
            <div style={{ position: 'relative' }}>
              <Page
                pageNumber={currentPage}
                height={containerRef.current ? containerRef.current.clientHeight * 0.97 : undefined}
                onRenderSuccess={onPageRenderSuccess}
                renderTextLayer={true}
                renderAnnotationLayer={false} // Optimize for large PDFs
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