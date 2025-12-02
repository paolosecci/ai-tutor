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
  const [pageTexts, setPageTexts] = useState<string[]>([]);
  const [multiPageHighlight, setMultiPageHighlight] = useState<{ nextPage: number; text: string } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<any>(null);
  const lastHighlightRef = useRef<string | null>(null);
  const DEBUG = process.env.NODE_ENV === 'development';

  // Fetch PDF URL
  useEffect(() => {
    if (!pdfId) return;
    (async () => {
      try {
        const res = await fetch(`/api/pdf/${pdfId}`);
        if (res.ok) {
          const json = await res.json();
          setPdfUrl(json.filePath);
        } else {
          console.error('Failed to fetch PDF:', res.status);
        }
      } catch (err) {
        console.error('Error fetching PDF:', err);
      }
    })();
  }, [pdfId]);

  // Normalize text
  const simplify = (s: string) =>
    (s || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '')
      .replace(/\u2013|\u2014/g, '')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .trim();

  // Split long text into chunks
  const splitIntoChunks = (text: string, maxLength = 100): string[] => {
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

  // Fuzzy match
  const fuzzyMatch = (source: string, target: string, threshold = 0.8) => {
    const src = simplify(source);
    const tgt = simplify(target);
    if (src.includes(tgt)) return true;
    let matches = 0;
    let j = 0;
    for (let i = 0; i < src.length && j < tgt.length; i++) {
      if (src[i] === tgt[j]) {
        matches++;
        j++;
      }
    }
    return matches / tgt.length >= threshold;
  };

  // Extract text from pages
  useEffect(() => {
    if (!pdfRef.current || numPages === 0) return;
    (async () => {
      try {
        const texts: string[] = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdfRef.current.getPage(i);
          const content = await page.getTextContent();
          texts[i] = content.items.map((item: any) => item.str).join(' ').replace(/\s+/g, ' ');
        }
        setPageTexts(texts);
        if (DEBUG) console.log('Page texts extracted:', texts.map((t, i) => ({ page: i, length: t.length })));
      } catch (err) {
        console.error('Error extracting page texts:', err);
      }
    })();
  }, [numPages, DEBUG]);

  const findPageEl = useCallback(() => containerRef.current?.querySelector('.react-pdf__Page') as HTMLElement | null, []);

  // Compute highlights
  const computeHighlightsFromDOM = useCallback(
    (highlightTexts: string[], targetPage: number, keyPhrase?: string) => {
      const pageEl = findPageEl();
      if (!pageEl) return setHighlightBoxes([]);

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

        let matchedSpans: typeof spans = [];
        let pos = concatenated.indexOf(normalized);

        // Exact match
        if (pos !== -1) {
          let startIdx = 0;
          while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= pos) startIdx++;
          let endIdx = startIdx;
          const endPos = pos + normalized.length - 1;
          while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) endIdx++;
          matchedSpans = spans.slice(startIdx, endIdx + 1);
          if (DEBUG) console.log('Exact match:', { rawText, page: targetPage });
        }

        // Chunked match
        if (!matchedSpans.length) {
          const chunks = splitIntoChunks(rawText);
          let currentPos = 0;
          matchedSpans = [];
          for (const chunk of chunks) {
            const chunkNorm = simplify(chunk);
            const chunkPos = concatenated.indexOf(chunkNorm, currentPos);
            if (chunkPos === -1) {
              matchedSpans = [];
              break;
            }
            let startIdx = 0;
            while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= chunkPos) startIdx++;
            let endIdx = startIdx;
            const endPos = chunkPos + chunkNorm.length - 1;
            while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) endIdx++;
            matchedSpans.push(...spans.slice(startIdx, endIdx + 1));
            currentPos = chunkPos + chunkNorm.length;
          }
          if (matchedSpans.length && DEBUG) console.log('Chunked match:', { rawText, page: targetPage });
        }

        // Fuzzy match
        if (!matchedSpans.length && fuzzyMatch(spans.map(s => s.text).join(' '), rawText)) {
          matchedSpans = spans.filter(s => fuzzyMatch(s.text, rawText));
          if (DEBUG) console.log('Fuzzy match:', { rawText, page: targetPage });
        }

        // KeyPhrase fallback
        if (!matchedSpans.length && keyPhrase) {
          const posKP = concatenated.indexOf(simplify(keyPhrase));
          if (posKP !== -1) {
            let startIdx = 0;
            while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= posKP) startIdx++;
            let endIdx = startIdx;
            const endPos = posKP + simplify(keyPhrase).length - 1;
            while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) endIdx++;
            matchedSpans = spans.slice(startIdx, endIdx + 1);
            console.log(`Fallback to key phrase for "${rawText}" using "${keyPhrase}" on page ${targetPage}`);
          }
        }

        // Significant word fallback
        if (!matchedSpans.length && keyPhrase) {
          const commonWords = ['the', 'and', 'of', 'to', 'in', 'a', 'is', 'that'];
          const fallbackWord = keyPhrase.split(/\s+/).find(w => w.length > 4 && !commonWords.includes(w.toLowerCase()));
          if (fallbackWord) {
            const posWord = concatenated.indexOf(simplify(fallbackWord));
            if (posWord !== -1) {
              let startIdx = 0;
              while (startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= posWord) startIdx++;
              let endIdx = startIdx;
              const endPos = posWord + simplify(fallbackWord).length - 1;
              while (endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos) endIdx++;
              matchedSpans = spans.slice(startIdx, endIdx + 1);
              console.log(`Fallback to significant word for "${rawText}" using "${fallbackWord}" on page ${targetPage}`);
            }
          }
        }

        if (!matchedSpans.length) return;

        // Compute highlight box
        const left = Math.min(...matchedSpans.map(m => m.rect.left));
        const top = Math.min(...matchedSpans.map(m => m.rect.top));
        const right = Math.max(...matchedSpans.map(m => m.rect.right));
        const bottom = Math.max(...matchedSpans.map(m => m.rect.bottom));
        found.push({
          id: `${rawText}-${targetPage}`,
          page: targetPage,
          left: left - containerRect.left + pageEl.scrollLeft,
          top: top - containerRect.top + pageEl.scrollTop,
          width: right - left,
          height: bottom - top,
          color: 'rgba(255,255,0,0.35)',
        });
      });

      setHighlightBoxes(found);
    },
    [findPageEl, DEBUG]
  );

  // Highlight search across pages
  const findHighlightPage = useCallback(
    (highlightTexts: string[]) => {
      if (!pageTexts.length || !highlightTexts.length) return;
      if (highlightTexts.join('|') === lastHighlightRef.current) return;
      lastHighlightRef.current = highlightTexts.join('|');

      const getConcatenatedText = (start: number, end: number) => pageTexts.slice(start, end + 1).join(' ');

      highlightTexts.forEach(rawText => {
        if (!rawText?.trim()) return;
        const normalized = simplify(rawText);

        // Candidate pages containing first word
        const firstWord = rawText.split(/\s+/)[0] || '';
        const normalizedFirstWord = simplify(firstWord);
        const candidatePages = [];
        for (let p = 1; p <= numPages; p++) {
          if (simplify(pageTexts[p] || '').includes(normalizedFirstWord)) candidatePages.push(p);
        }

        // Full-text match
        for (const p of candidatePages) {
          if (simplify(pageTexts[p]).includes(normalized)) {
            if (p !== currentPage) setCurrentPage(p);
            computeHighlightsFromDOM([rawText], p, rawText.split(/\s+/).slice(0, 7).join(' '));
            return;
          }
        }

        // Keyphrase / significant word fallback is handled inside computeHighlightsFromDOM
      });
    },
    [pageTexts, numPages, currentPage, computeHighlightsFromDOM]
  );

  // Watch for highlights
  useEffect(() => {
    if (!highlights.length) {
      setHighlightBoxes([]);
      lastHighlightRef.current = null;
      setMultiPageHighlight(null);
      return;
    }
    findHighlightPage(highlights);
  }, [highlights, findHighlightPage]);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
    pdfRef.current = pdf;
  };

  const onPageRenderSuccess = () => {
    if (highlights.length) {
      const keyPhrase = highlights[0].split(/\s+/).slice(0, 7).join(' ');
      setTimeout(() => computeHighlightsFromDOM(highlights, currentPage, keyPhrase), 500);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 rounded shadow">
      <div className="h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t">
        <h2 className="text-md font-semibold text-gray-800">PDF Viewer</h2>
        <button
          onClick={() => router.push('/')}
          className="bg-gray-200 px-2 py-0.5 text-sm rounded hover:bg-gray-300 transition"
        >
          Back to Home
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
                renderTextLayer
                renderAnnotationLayer={false}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {highlightBoxes.filter(h => h.page === currentPage).map(h => (
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
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
          disabled={currentPage === numPages}
          className="p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300"
        >
          Next
        </button>
        {multiPageHighlight && (
          <button
            onClick={() => setCurrentPage(multiPageHighlight.nextPage)}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Next Page
          </button>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
