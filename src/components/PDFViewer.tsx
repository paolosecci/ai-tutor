'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface PDFViewerProps {
  pdfId: string;
  highlights?: string[]; // Array of strings to highlight
}

interface HighlightBox {
  id: string;
  page: number;
  left: number; // px relative to page container
  top: number; // px relative to page container
  width: number; // px
  height: number; // px
  color?: string;
}

export function PDFViewer({ pdfId, highlights = [] }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [highlightBoxes, setHighlightBoxes] = useState<HighlightBox[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<any>(null); // PDFDocumentProxy

  // Fetch PDF URL once
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`/api/pdf/${pdfId}`);
        if (response.ok) {
          const json = await response.json();
          setPdfUrl(json.filePath);
        } else {
          console.error('Failed to fetch PDF', response.status);
        }
      } catch (err) {
        console.error('Error fetching PDF', err);
      }
    };
    fetchPdf();
  }, [pdfId]);

  // Helper: find the rendered page DOM element for the currently rendered page
  const findRenderedPageElement = useCallback((): HTMLElement | null => {
    if (!containerRef.current) return null;
    // react-pdf renders a wrapper with class 'react-pdf__Page' for each page
    const pageEl = containerRef.current.querySelector('.react-pdf__Page');
    // If you render multiple page elements in the future, you might need to filter by pageNumber attribute.
    return pageEl as HTMLElement | null;
  }, []);

  // Use the DOM text layer to compute highlight bounding boxes
  const computeHighlightsFromDOM = useCallback(
    (highlightTexts: string[]) => {
      const pageEl = findRenderedPageElement();
      if (!pageEl) {
        console.warn('No rendered page DOM found when computing highlights.');
        setHighlightBoxes([]);
        return;
      }

      const containerRect = pageEl.getBoundingClientRect();
      const foundBoxes: HighlightBox[] = [];

      highlightTexts.forEach((rawText) => {
        const normalized = rawText.trim().toLowerCase();
        if (!normalized) return;

        // Search for elements that contain the highlight text
        // We look at all descendants of pageEl and match innerText to avoid working with pdf.js internals
        const allDescendants = Array.from(pageEl.querySelectorAll<HTMLElement>('*'));

        // Try to find the smallest element(s) whose innerText contains the normalized highlight
        // Strategy: find candidate elements, then pick ones with the smallest bounding rect area (more precise)
        const candidates = allDescendants
          .filter((el) => {
            // ignore invisible elements
            const style = window.getComputedStyle(el);
            if (style && (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0')) return false;
            const text = (el.innerText || '').toLowerCase();
            return text.includes(normalized);
          })
          .map((el) => ({ el, rect: el.getBoundingClientRect(), area: el.getBoundingClientRect().width * el.getBoundingClientRect().height }));

        if (candidates.length === 0) {
          console.warn(`No DOM candidate found containing "${rawText}" on page ${currentPage}`);
          return;
        }

        // choose best candidate(s). Sort by area ascending (prefer small boxes)
        candidates.sort((a, b) => a.area - b.area);
        const best = candidates[0];

        // For some matches, the element might contain extra text; to be a bit more precise,
        // we can try to split text nodes and find child nodes that match smaller text. Here we keep it simple.
        const relativeLeft = best.rect.left - containerRect.left + pageEl.scrollLeft;
        const relativeTop = best.rect.top - containerRect.top + pageEl.scrollTop;

        foundBoxes.push({
          id: `${rawText}-${currentPage}-${foundBoxes.length}`,
          page: currentPage,
          left: Math.max(0, relativeLeft),
          top: Math.max(0, relativeTop),
          width: Math.max(2, best.rect.width),
          height: Math.max(2, best.rect.height),
          color: 'rgba(255, 255, 0, 0.35)',
        });
      });

      // Update only if changed
      setHighlightBoxes((prev) => {
        const prevIds = prev.map((b) => b.id).join(',');
        const newIds = foundBoxes.map((b) => b.id).join(',');
        if (prevIds !== newIds || prev.length !== foundBoxes.length) {
          return foundBoxes;
        }
        return prev;
      });
    },
    [currentPage, findRenderedPageElement]
  );

  // Watch for highlight text changes and run after the page/text layer renders
  useEffect(() => {
    if (!highlights || highlights.length === 0) {
      setHighlightBoxes([]);
      return;
    }

    // small delay to allow text layer to render (react-pdf renders text layer after canvas)
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      try {
        computeHighlightsFromDOM(highlights);
      } catch (err) {
        console.error('Error computing highlights from DOM', err);
      }
    }, 180); // 180ms - adjust if you find race conditions

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [highlights, currentPage, computeHighlightsFromDOM]);

  // When PDF loads
  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
    pdfRef.current = pdf;
  };

  // When page renders, we can optionally re-run highlight mapping (page change)
  const onPageRenderSuccess = () => {
    // Allow text layer to finish and then recompute highlights if any
    if (highlights && highlights.length > 0) {
      // small delay for text layer
      setTimeout(() => computeHighlightsFromDOM(highlights), 120);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">
      {/* PDF container */}
      <div
        ref={containerRef}
        className="flex-1 flex justify-center items-center overflow-auto p-2"
      >
        {pdfUrl && (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-auto"
          >
            <div style={{ position: 'relative' }}>
              <Page
                pageNumber={currentPage}
                // let react-pdf size the page by giving a height relative to container
                height={containerRef.current ? containerRef.current.clientHeight * 0.97 : undefined}
                onRenderSuccess={onPageRenderSuccess}
                loading="lazy"
              />
              {/* Overlay for highlights */}
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
                        boxShadow: '0 0 0 1px rgba(255,255,0,0.15) inset',
                      }}
                    />
                  ))}
              </div>
            </div>
          </Document>
        )}
      </div>

      {/* Footer: page buttons */}
      <div className="flex justify-center items-center gap-4 mt-2 p-2 border-t bg-white rounded-b">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300 transition"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(numPages, prev + 1))}
          disabled={currentPage === numPages}
          className="p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;
