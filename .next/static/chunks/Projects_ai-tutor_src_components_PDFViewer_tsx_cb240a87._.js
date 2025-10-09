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
    const [pageTexts, setPageTexts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [multiPageHighlight, setMultiPageHighlight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pdfRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastHighlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const DEBUG = ("TURBOPACK compile-time value", "development") === 'development';
    // Fetch PDF URL
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (!pdfId) return;
            ({
                "PDFViewer.useEffect": async ()=>{
                    try {
                        const res = await fetch("/api/pdf/".concat(pdfId));
                        if (res.ok) {
                            const json = await res.json();
                            setPdfUrl(json.filePath);
                        } else {
                            console.error('Failed to fetch PDF:', res.status);
                        }
                    } catch (err) {
                        console.error('Error fetching PDF:', err);
                    }
                }
            })["PDFViewer.useEffect"]();
        }
    }["PDFViewer.useEffect"], [
        pdfId
    ]);
    // Normalize text
    const simplify = (s)=>(s || '').toLowerCase().replace(/[^a-z0-9]+/gi, '').replace(/\u2013|\u2014/g, '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').trim();
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
    // Fuzzy match
    const fuzzyMatch = function(source, target) {
        let threshold = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.8;
        const src = simplify(source);
        const tgt = simplify(target);
        if (src.includes(tgt)) return true;
        let matches = 0;
        let j = 0;
        for(let i = 0; i < src.length && j < tgt.length; i++){
            if (src[i] === tgt[j]) {
                matches++;
                j++;
            }
        }
        return matches / tgt.length >= threshold;
    };
    // Extract text from pages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (!pdfRef.current || numPages === 0) return;
            ({
                "PDFViewer.useEffect": async ()=>{
                    try {
                        const texts = [];
                        for(let i = 1; i <= numPages; i++){
                            const page = await pdfRef.current.getPage(i);
                            const content = await page.getTextContent();
                            texts[i] = content.items.map({
                                "PDFViewer.useEffect": (item)=>item.str
                            }["PDFViewer.useEffect"]).join(' ').replace(/\s+/g, ' ');
                        }
                        setPageTexts(texts);
                        if ("TURBOPACK compile-time truthy", 1) console.log('Page texts extracted:', texts.map({
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
    }["PDFViewer.useEffect"], [
        numPages,
        DEBUG
    ]);
    const findPageEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[findPageEl]": ()=>{
            var _containerRef_current;
            return (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.querySelector('.react-pdf__Page');
        }
    }["PDFViewer.useCallback[findPageEl]"], []);
    // Compute highlights
    const computeHighlightsFromDOM = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[computeHighlightsFromDOM]": (highlightTexts, targetPage, keyPhrase)=>{
            const pageEl = findPageEl();
            if (!pageEl) return setHighlightBoxes([]);
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
                    let matchedSpans = [];
                    let pos = concatenated.indexOf(normalized);
                    // Exact match
                    if (pos !== -1) {
                        let startIdx = 0;
                        while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= pos)startIdx++;
                        let endIdx = startIdx;
                        const endPos = pos + normalized.length - 1;
                        while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos)endIdx++;
                        matchedSpans = spans.slice(startIdx, endIdx + 1);
                        if ("TURBOPACK compile-time truthy", 1) console.log('Exact match:', {
                            rawText,
                            page: targetPage
                        });
                    }
                    // Chunked match
                    if (!matchedSpans.length) {
                        const chunks = splitIntoChunks(rawText);
                        let currentPos = 0;
                        matchedSpans = [];
                        for (const chunk of chunks){
                            const chunkNorm = simplify(chunk);
                            const chunkPos = concatenated.indexOf(chunkNorm, currentPos);
                            if (chunkPos === -1) {
                                matchedSpans = [];
                                break;
                            }
                            let startIdx = 0;
                            while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= chunkPos)startIdx++;
                            let endIdx = startIdx;
                            const endPos = chunkPos + chunkNorm.length - 1;
                            while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos)endIdx++;
                            matchedSpans.push(...spans.slice(startIdx, endIdx + 1));
                            currentPos = chunkPos + chunkNorm.length;
                        }
                        if (matchedSpans.length && DEBUG) console.log('Chunked match:', {
                            rawText,
                            page: targetPage
                        });
                    }
                    // Fuzzy match
                    if (!matchedSpans.length && fuzzyMatch(spans.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM]": (s)=>s.text
                    }["PDFViewer.useCallback[computeHighlightsFromDOM]"]).join(' '), rawText)) {
                        matchedSpans = spans.filter({
                            "PDFViewer.useCallback[computeHighlightsFromDOM]": (s)=>fuzzyMatch(s.text, rawText)
                        }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
                        if ("TURBOPACK compile-time truthy", 1) console.log('Fuzzy match:', {
                            rawText,
                            page: targetPage
                        });
                    }
                    // KeyPhrase fallback
                    if (!matchedSpans.length && keyPhrase) {
                        const posKP = concatenated.indexOf(simplify(keyPhrase));
                        if (posKP !== -1) {
                            let startIdx = 0;
                            while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= posKP)startIdx++;
                            let endIdx = startIdx;
                            const endPos = posKP + simplify(keyPhrase).length - 1;
                            while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos)endIdx++;
                            matchedSpans = spans.slice(startIdx, endIdx + 1);
                            console.log('Fallback to key phrase for "'.concat(rawText, '" using "').concat(keyPhrase, '" on page ').concat(targetPage));
                        }
                    }
                    // Significant word fallback
                    if (!matchedSpans.length && keyPhrase) {
                        const commonWords = [
                            'the',
                            'and',
                            'of',
                            'to',
                            'in',
                            'a',
                            'is',
                            'that'
                        ];
                        const fallbackWord = keyPhrase.split(/\s+/).find({
                            "PDFViewer.useCallback[computeHighlightsFromDOM].fallbackWord": (w)=>w.length > 4 && !commonWords.includes(w.toLowerCase())
                        }["PDFViewer.useCallback[computeHighlightsFromDOM].fallbackWord"]);
                        if (fallbackWord) {
                            const posWord = concatenated.indexOf(simplify(fallbackWord));
                            if (posWord !== -1) {
                                let startIdx = 0;
                                while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= posWord)startIdx++;
                                let endIdx = startIdx;
                                const endPos = posWord + simplify(fallbackWord).length - 1;
                                while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos)endIdx++;
                                matchedSpans = spans.slice(startIdx, endIdx + 1);
                                console.log('Fallback to significant word for "'.concat(rawText, '" using "').concat(fallbackWord, '" on page ').concat(targetPage));
                            }
                        }
                    }
                    if (!matchedSpans.length) return;
                    // Compute highlight box
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
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
            setHighlightBoxes(found);
        }
    }["PDFViewer.useCallback[computeHighlightsFromDOM]"], [
        findPageEl,
        DEBUG
    ]);
    // Highlight search across pages
    const findHighlightPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[findHighlightPage]": (highlightTexts)=>{
            if (!pageTexts.length || !highlightTexts.length) return;
            if (highlightTexts.join('|') === lastHighlightRef.current) return;
            lastHighlightRef.current = highlightTexts.join('|');
            const getConcatenatedText = {
                "PDFViewer.useCallback[findHighlightPage].getConcatenatedText": (start, end)=>pageTexts.slice(start, end + 1).join(' ')
            }["PDFViewer.useCallback[findHighlightPage].getConcatenatedText"];
            highlightTexts.forEach({
                "PDFViewer.useCallback[findHighlightPage]": (rawText)=>{
                    if (!(rawText === null || rawText === void 0 ? void 0 : rawText.trim())) return;
                    const normalized = simplify(rawText);
                    // Candidate pages containing first word
                    const firstWord = rawText.split(/\s+/)[0] || '';
                    const normalizedFirstWord = simplify(firstWord);
                    const candidatePages = [];
                    for(let p = 1; p <= numPages; p++){
                        if (simplify(pageTexts[p] || '').includes(normalizedFirstWord)) candidatePages.push(p);
                    }
                    // Full-text match
                    for (const p of candidatePages){
                        if (simplify(pageTexts[p]).includes(normalized)) {
                            if (p !== currentPage) setCurrentPage(p);
                            computeHighlightsFromDOM([
                                rawText
                            ], p, rawText.split(/\s+/).slice(0, 7).join(' '));
                            return;
                        }
                    }
                // Keyphrase / significant word fallback is handled inside computeHighlightsFromDOM
                }
            }["PDFViewer.useCallback[findHighlightPage]"]);
        }
    }["PDFViewer.useCallback[findHighlightPage]"], [
        pageTexts,
        numPages,
        currentPage,
        computeHighlightsFromDOM
    ]);
    // Watch for highlights
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (!highlights.length) {
                setHighlightBoxes([]);
                lastHighlightRef.current = null;
                setMultiPageHighlight(null);
                return;
            }
            findHighlightPage(highlights);
        }
    }["PDFViewer.useEffect"], [
        highlights,
        findHighlightPage
    ]);
    const onDocumentLoadSuccess = (pdf)=>{
        setNumPages(pdf.numPages);
        pdfRef.current = pdf;
    };
    const onPageRenderSuccess = ()=>{
        if (highlights.length) {
            const keyPhrase = highlights[0].split(/\s+/).slice(0, 7).join(' ');
            setTimeout(()=>computeHighlightsFromDOM(highlights, currentPage, keyPhrase), 500);
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
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        className: "bg-gray-200 px-2 py-0.5 text-sm rounded hover:bg-gray-300 transition",
                        children: "Back to PDFs"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 306,
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
                                lineNumber: 320,
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
                                        lineNumber: 329,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 327,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 319,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                    lineNumber: 318,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 316,
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
                        lineNumber: 349,
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
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((p)=>Math.min(numPages, p + 1)),
                        disabled: currentPage === numPages,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    multiPageHighlight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage(multiPageHighlight.nextPage),
                        className: "p-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                        children: "View Next Page"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 367,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
        lineNumber: 305,
        columnNumber: 5
    }, this);
}
_s(PDFViewer, "p95+bJg48XR/faCcHDV9bDEVE9w=", false, function() {
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