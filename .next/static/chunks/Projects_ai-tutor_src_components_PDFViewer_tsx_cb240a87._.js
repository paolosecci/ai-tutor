(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFViewer",
    ()=>PDFViewer,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = "//unpkg.com/pdfjs-dist@".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version, "/build/pdf.worker.min.mjs");
function PDFViewer(param) {
    let { pdfId, highlights = [] } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [numPages, setNumPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pdfUrl, setPdfUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [highlightBoxes, setHighlightBoxes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pageTexts, setPageTexts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // Cache page text
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pdfRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastHighlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Prevent duplicate processing
    const DEBUG = ("TURBOPACK compile-time value", "development") === 'development';
    // Fetch PDF URL
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            const fetchPdf = {
                "PDFViewer.useEffect.fetchPdf": async ()=>{
                    try {
                        const response = await fetch("/api/pdf/".concat(pdfId));
                        if (response.ok) {
                            const json = await response.json();
                            setPdfUrl(json.filePath);
                        } else {
                            console.error('Failed to fetch PDF:', response.status);
                        }
                    } catch (err) {
                        console.error('Error fetching PDF:', err);
                    }
                }
            }["PDFViewer.useEffect.fetchPdf"];
            if (pdfId) fetchPdf();
        }
    }["PDFViewer.useEffect"], [
        pdfId
    ]);
    // Normalize text: remove spaces, punctuation, and convert to lowercase
    const simplify = (s)=>(s || '').toLowerCase().replace(/[^a-z0-9]+/gi, '') // Remove punctuation, whitespace
        .trim();
    // Split long text into chunks
    const splitIntoChunks = function(text) {
        let maxLength = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
        const words = text.split(/\s+/);
        const chunks = [];
        let currentChunk = '';
        for (const word of words){
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (pdfRef.current && numPages > 0) {
                ({
                    "PDFViewer.useEffect": async ()=>{
                        try {
                            const texts = new Array(numPages + 1).fill('');
                            for(let pageNum = 1; pageNum <= numPages; pageNum++){
                                const page = await pdfRef.current.getPage(pageNum);
                                const textContent = await page.getTextContent();
                                texts[pageNum] = textContent.items.map({
                                    "PDFViewer.useEffect": (item)=>item.str
                                }["PDFViewer.useEffect"]).join(' ');
                            }
                            setPageTexts(texts);
                            if ("TURBOPACK compile-time truthy", 1) console.log('Extracted page texts:', texts.map({
                                "PDFViewer.useEffect": (t, i)=>({
                                        page: i,
                                        length: t.length
                                    })
                            }["PDFViewer.useEffect"]));
                        } catch (err) {
                            console.error('Error extracting page texts:', err);
                        }
                    }
                })["PDFViewer.useEffect"]();
            }
        }
    }["PDFViewer.useEffect"], [
        numPages,
        DEBUG
    ]);
    // Find the rendered page DOM element
    const findPageEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[findPageEl]": ()=>{
            var _containerRef_current;
            return (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.querySelector('.react-pdf__Page');
        }
    }["PDFViewer.useCallback[findPageEl]"], []);
    // Compute highlights using DOM text layer
    const computeHighlightsFromDOM = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[computeHighlightsFromDOM]": (highlightTexts, targetPage)=>{
            const pageEl = findPageEl();
            if (!pageEl) {
                if ("TURBOPACK compile-time truthy", 1) console.warn('No rendered page DOM found.');
                setHighlightBoxes([]);
                return;
            }
            const containerRect = pageEl.getBoundingClientRect();
            const spans = Array.from(pageEl.querySelectorAll('span[role="presentation"]')).map({
                "PDFViewer.useCallback[computeHighlightsFromDOM].spans": (el)=>{
                    const text = (el.textContent || '').replace(/\u00A0/g, ' ').trim();
                    return text ? {
                        el,
                        text,
                        simple: simplify(text),
                        rect: el.getBoundingClientRect()
                    } : null;
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM].spans"]).filter({
                "PDFViewer.useCallback[computeHighlightsFromDOM].spans": (s)=>!!s
            }["PDFViewer.useCallback[computeHighlightsFromDOM].spans"]);
            const prefixLens = [];
            let acc = 0;
            for (const s of spans){
                prefixLens.push(acc);
                acc += s.simple.length;
            }
            const concatenated = spans.map({
                "PDFViewer.useCallback[computeHighlightsFromDOM].concatenated": (s)=>s.simple
            }["PDFViewer.useCallback[computeHighlightsFromDOM].concatenated"]).join('');
            const found = [];
            highlightTexts.forEach({
                "PDFViewer.useCallback[computeHighlightsFromDOM]": (rawText)=>{
                    if (!(rawText === null || rawText === void 0 ? void 0 : rawText.trim())) return;
                    const normalized = simplify(rawText);
                    if (!normalized) return;
                    // Try exact match first
                    let pos = concatenated.indexOf(normalized);
                    let matchedSpans = [];
                    // If no exact match, try chunked matching
                    if (pos === -1) {
                        const chunks = splitIntoChunks(rawText);
                        let currentPos = 0;
                        matchedSpans = [];
                        for (const chunk of chunks){
                            const chunkNormalized = simplify(chunk);
                            const chunkPos = concatenated.indexOf(chunkNormalized, currentPos);
                            if (chunkPos === -1) {
                                matchedSpans = [];
                                break;
                            }
                            let startIdx = 0;
                            while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= chunkPos){
                                startIdx++;
                            }
                            let endIdx = startIdx;
                            const endPos = chunkPos + chunkNormalized.length - 1;
                            while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos){
                                endIdx++;
                            }
                            matchedSpans.push(...spans.slice(startIdx, endIdx + 1));
                            currentPos = chunkPos + chunkNormalized.length;
                        }
                    } else {
                        let startIdx = 0;
                        while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= pos){
                            startIdx++;
                        }
                        let endIdx = startIdx;
                        const endPos = pos + normalized.length - 1;
                        while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos){
                            endIdx++;
                        }
                        matchedSpans = spans.slice(startIdx, endIdx + 1);
                    }
                    if (matchedSpans.length === 0) {
                        if ("TURBOPACK compile-time truthy", 1) console.warn('No match for:', {
                            rawText,
                            page: targetPage
                        });
                        return;
                    }
                    if (matchedSpans.length === 1) {
                        const s = matchedSpans[0];
                        const left = s.rect.left - containerRect.left + pageEl.scrollLeft;
                        const top = s.rect.top - containerRect.top + pageEl.scrollTop;
                        found.push({
                            id: "".concat(rawText, "-").concat(targetPage),
                            page: targetPage,
                            left,
                            top,
                            width: s.rect.width,
                            height: s.rect.height,
                            color: 'rgba(255,255,0,0.35)'
                        });
                        if ("TURBOPACK compile-time truthy", 1) console.debug('Matched single span:', {
                            rawText,
                            matchedText: s.text,
                            page: targetPage
                        });
                    } else {
                        const left = Math.min(...matchedSpans.map({
                            "PDFViewer.useCallback[computeHighlightsFromDOM].left": (m)=>m.rect.left
                        }["PDFViewer.useCallback[computeHighlightsFromDOM].left"]));
                        const top = Math.min(...matchedSpans.map({
                            "PDFViewer.useCallback[computeHighlightsFromDOM].top": (m)=>m.rect.top
                        }["PDFViewer.useCallback[computeHighlightsFromDOM].top"]));
                        const right = Math.max(...matchedSpans.map({
                            "PDFViewer.useCallback[computeHighlightsFromDOM].right": (m)=>m.rect.right
                        }["PDFViewer.useCallback[computeHighlightsFromDOM].right"]));
                        const bottom = Math.max(...matchedSpans.map({
                            "PDFViewer.useCallback[computeHighlightsFromDOM].bottom": (m)=>m.rect.bottom
                        }["PDFViewer.useCallback[computeHighlightsFromDOM].bottom"]));
                        found.push({
                            id: "".concat(rawText, "-").concat(targetPage),
                            page: targetPage,
                            left: left - containerRect.left + pageEl.scrollLeft,
                            top: top - containerRect.top + pageEl.scrollTop,
                            width: right - left,
                            height: bottom - top,
                            color: 'rgba(255,255,0,0.35)'
                        });
                        if ("TURBOPACK compile-time truthy", 1) console.debug('Matched multi-span:', {
                            rawText,
                            matchedSpans: matchedSpans.map({
                                "PDFViewer.useCallback[computeHighlightsFromDOM]": (s)=>s.text
                            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]),
                            page: targetPage
                        });
                    }
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
            setHighlightBoxes(found);
        }
    }["PDFViewer.useCallback[computeHighlightsFromDOM]"], [
        findPageEl,
        DEBUG
    ]);
    // Search for highlights across all pages
    const findHighlightPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[findHighlightPage]": (highlightTexts)=>{
            if (!pageTexts.length || !highlightTexts.length) return;
            if (highlightTexts.join('|') === lastHighlightRef.current) return; // Skip duplicate highlights
            lastHighlightRef.current = highlightTexts.join('|');
            for(let pageNum = 1; pageNum <= numPages; pageNum++){
                const pageText = pageTexts[pageNum];
                if (!pageText) continue;
                const normalizedPageText = simplify(pageText);
                const match = highlightTexts.some({
                    "PDFViewer.useCallback[findHighlightPage].match": (text)=>normalizedPageText.includes(simplify(text))
                }["PDFViewer.useCallback[findHighlightPage].match"]);
                if (match) {
                    if (pageNum !== currentPage) {
                        if ("TURBOPACK compile-time truthy", 1) console.log("Highlight found on page ".concat(pageNum, ", navigating..."));
                        setCurrentPage(pageNum);
                    }
                    setTimeout({
                        "PDFViewer.useCallback[findHighlightPage]": ()=>computeHighlightsFromDOM(highlightTexts, pageNum)
                    }["PDFViewer.useCallback[findHighlightPage]"], 1000); // Increased delay
                    return;
                }
            }
            if ("TURBOPACK compile-time truthy", 1) console.warn('No page found for highlights:', highlightTexts);
            setHighlightBoxes([]);
        }
    }["PDFViewer.useCallback[findHighlightPage]"], [
        pageTexts,
        numPages,
        currentPage,
        computeHighlightsFromDOM,
        DEBUG
    ]);
    // Watch for highlight changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (!(highlights === null || highlights === void 0 ? void 0 : highlights.length)) {
                setHighlightBoxes([]);
                lastHighlightRef.current = null;
                return;
            }
            findHighlightPage(highlights);
        }
    }["PDFViewer.useEffect"], [
        highlights,
        findHighlightPage
    ]);
    // Handle document load
    const onDocumentLoadSuccess = (pdf)=>{
        setNumPages(pdf.numPages);
        pdfRef.current = pdf;
    };
    // Handle page render
    const onPageRenderSuccess = ()=>{
        if (highlights === null || highlights === void 0 ? void 0 : highlights.length) {
            setTimeout(()=>computeHighlightsFromDOM(highlights, currentPage), 1000); // Increased delay
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full bg-gray-50 rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-md font-semibold text-gray-800",
                        children: "PDF Viewer"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        className: "bg-gray-200 px-2 py-0.5 text-sm rounded hover:bg-gray-300 transition",
                        children: "Back to PDFs"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "flex-1 flex justify-center items-center overflow-auto p-2",
                children: pdfUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
                    file: pdfUrl,
                    onLoadSuccess: onDocumentLoadSuccess,
                    className: "w-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
                                pageNumber: currentPage,
                                height: containerRef.current ? containerRef.current.clientHeight * 0.97 : undefined,
                                onRenderSuccess: onPageRenderSuccess,
                                renderTextLayer: true,
                                renderAnnotationLayer: false
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 288,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none'
                                },
                                children: highlightBoxes.filter((h)=>h.page === currentPage).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            left: "".concat(h.left, "px"),
                                            top: "".concat(h.top, "px"),
                                            width: "".concat(h.width, "px"),
                                            height: "".concat(h.height, "px"),
                                            backgroundColor: h.color,
                                            borderRadius: 2
                                        }
                                    }, h.id, false, {
                                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                        lineNumber: 308,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 295,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 287,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center gap-4 mt-2 p-2 border-t bg-white rounded-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((p)=>Math.max(1, p - 1)),
                        disabled: currentPage === 1,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300",
                        children: "Prev"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Page ",
                            currentPage,
                            " of ",
                            numPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((p)=>Math.min(numPages, p + 1)),
                        disabled: currentPage === numPages,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s(PDFViewer, "8NAETqXLSI693Msjtsc4cgxzDvQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PDFViewer;
const __TURBOPACK__default__export__ = PDFViewer;
var _c;
__turbopack_context__.k.register(_c, "PDFViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Projects_ai-tutor_src_components_PDFViewer_tsx_cb240a87._.js.map