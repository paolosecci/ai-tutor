(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFViewer",
    ()=>PDFViewer,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = "//unpkg.com/pdfjs-dist@".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version, "/build/pdf.worker.min.mjs");
function PDFViewer(param) {
    let { pdfId, highlights = [] } = param;
    _s();
    const [numPages, setNumPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pdfUrl, setPdfUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [highlightBoxes, setHighlightBoxes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            const fetchPdf = {
                "PDFViewer.useEffect.fetchPdf": async ()=>{
                    const response = await fetch("/api/pdf/".concat(pdfId));
                    if (response.ok) {
                        const json = await response.json();
                        setPdfUrl(json.filePath);
                    }
                }
            }["PDFViewer.useEffect.fetchPdf"];
            if (pdfId) fetchPdf();
        }
    }["PDFViewer.useEffect"], [
        pdfId
    ]);
    const simplify = (s)=>(s || '').toLowerCase().replace(/[^a-z0-9]+/gi, '') // remove punctuation, whitespace
        .trim();
    const findPageEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[findPageEl]": ()=>{
            var _containerRef_current;
            return (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.querySelector('.react-pdf__Page');
        }
    }["PDFViewer.useCallback[findPageEl]"], []);
    const computeHighlightsFromDOM = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[computeHighlightsFromDOM]": (highlightTexts)=>{
            const pageEl = findPageEl();
            if (!pageEl) return;
            const containerRect = pageEl.getBoundingClientRect();
            const spans = Array.from(pageEl.querySelectorAll('span[role="presentation"]')).map({
                "PDFViewer.useCallback[computeHighlightsFromDOM].spans": (el)=>{
                    const text = (el.textContent || '').replace(/\u00A0/g, ' ').trim();
                    return {
                        el,
                        text,
                        simple: simplify(text),
                        rect: el.getBoundingClientRect()
                    };
                }
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
                    const pos = concatenated.indexOf(normalized);
                    if (pos === -1) {
                        console.warn('No match for', rawText);
                        return;
                    }
                    // find exact start and end spans
                    let startIdx = 0;
                    while(startIdx < prefixLens.length && prefixLens[startIdx] + spans[startIdx].simple.length <= pos){
                        startIdx++;
                    }
                    let endIdx = startIdx;
                    const endPos = pos + normalized.length - 1;
                    while(endIdx < spans.length && prefixLens[endIdx] + spans[endIdx].simple.length <= endPos){
                        endIdx++;
                    }
                    const matchedSpans = spans.slice(startIdx, endIdx + 1);
                    if (matchedSpans.length === 1) {
                        const s = matchedSpans[0];
                        const left = s.rect.left - containerRect.left + pageEl.scrollLeft;
                        const top = s.rect.top - containerRect.top + pageEl.scrollTop;
                        found.push({
                            id: "".concat(rawText, "-").concat(currentPage),
                            page: currentPage,
                            left,
                            top,
                            width: s.rect.width,
                            height: s.rect.height,
                            color: 'rgba(255,255,0,0.35)'
                        });
                        console.debug('Matched single span', rawText, s.text);
                    } else {
                        // Multi-span match (rare)
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
                            id: "".concat(rawText, "-").concat(currentPage),
                            page: currentPage,
                            left: left - containerRect.left + pageEl.scrollLeft,
                            top: top - containerRect.top + pageEl.scrollTop,
                            width: right - left,
                            height: bottom - top,
                            color: 'rgba(255,255,0,0.35)'
                        });
                        console.debug('Matched multi-span', rawText);
                    }
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
            setHighlightBoxes(found);
        }
    }["PDFViewer.useCallback[computeHighlightsFromDOM]"], [
        currentPage,
        findPageEl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (!(highlights === null || highlights === void 0 ? void 0 : highlights.length)) {
                setHighlightBoxes([]);
                return;
            }
            const timer = setTimeout({
                "PDFViewer.useEffect.timer": ()=>computeHighlightsFromDOM(highlights)
            }["PDFViewer.useEffect.timer"], 150);
            return ({
                "PDFViewer.useEffect": ()=>clearTimeout(timer)
            })["PDFViewer.useEffect"];
        }
    }["PDFViewer.useEffect"], [
        highlights,
        currentPage,
        computeHighlightsFromDOM
    ]);
    const onDocumentLoadSuccess = (pdf)=>{
        setNumPages(pdf.numPages);
    };
    const onPageRenderSuccess = ()=>{
        setTimeout(()=>computeHighlightsFromDOM(highlights), 120);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full bg-gray-50 rounded shadow",
        children: [
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
                                onRenderSuccess: onPageRenderSuccess
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 162,
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
                                        lineNumber: 180,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 161,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 158,
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
                        lineNumber: 200,
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
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((p)=>Math.min(numPages, p + 1)),
                        disabled: currentPage === numPages,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_s(PDFViewer, "vgFfcIfVNhBb7O9m2GD6ImGkHmw=");
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