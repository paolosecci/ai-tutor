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
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// PDF.js worker
__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = "//unpkg.com/pdfjs-dist@".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version, "/build/pdf.worker.min.mjs");
function PDFViewer(param) {
    let { pdfId, highlights = [] } = param;
    _s();
    const [numPages, setNumPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pdfUrl, setPdfUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [highlightBoxes, setHighlightBoxes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pdfRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // PDFDocumentProxy
    // Fetch PDF URL once
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
                            console.error('Failed to fetch PDF', response.status);
                        }
                    } catch (err) {
                        console.error('Error fetching PDF', err);
                    }
                }
            }["PDFViewer.useEffect.fetchPdf"];
            fetchPdf();
        }
    }["PDFViewer.useEffect"], [
        pdfId
    ]);
    // Helper: find the rendered page DOM element for the currently rendered page
    const findRenderedPageElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[findRenderedPageElement]": ()=>{
            if (!containerRef.current) return null;
            // react-pdf renders a wrapper with class 'react-pdf__Page' for each page
            const pageEl = containerRef.current.querySelector('.react-pdf__Page');
            // If you render multiple page elements in the future, you might need to filter by pageNumber attribute.
            return pageEl;
        }
    }["PDFViewer.useCallback[findRenderedPageElement]"], []);
    // Use the DOM text layer to compute highlight bounding boxes
    const computeHighlightsFromDOM = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PDFViewer.useCallback[computeHighlightsFromDOM]": (highlightTexts)=>{
            const pageEl = findRenderedPageElement();
            if (!pageEl) {
                console.warn('No rendered page DOM found when computing highlights.');
                setHighlightBoxes([]);
                return;
            }
            const containerRect = pageEl.getBoundingClientRect();
            const foundBoxes = [];
            highlightTexts.forEach({
                "PDFViewer.useCallback[computeHighlightsFromDOM]": (rawText)=>{
                    const normalized = rawText.trim().toLowerCase();
                    if (!normalized) return;
                    // Search for elements that contain the highlight text
                    // We look at all descendants of pageEl and match innerText to avoid working with pdf.js internals
                    const allDescendants = Array.from(pageEl.querySelectorAll('*'));
                    // Try to find the smallest element(s) whose innerText contains the normalized highlight
                    // Strategy: find candidate elements, then pick ones with the smallest bounding rect area (more precise)
                    const candidates = allDescendants.filter({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].candidates": (el)=>{
                            // ignore invisible elements
                            const style = window.getComputedStyle(el);
                            if (style && (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0')) return false;
                            const text = (el.innerText || '').toLowerCase();
                            return text.includes(normalized);
                        }
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].candidates"]).map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].candidates": (el)=>({
                                el,
                                rect: el.getBoundingClientRect(),
                                area: el.getBoundingClientRect().width * el.getBoundingClientRect().height
                            })
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].candidates"]);
                    if (candidates.length === 0) {
                        console.warn('No DOM candidate found containing "'.concat(rawText, '" on page ').concat(currentPage));
                        return;
                    }
                    // choose best candidate(s). Sort by area ascending (prefer small boxes)
                    candidates.sort({
                        "PDFViewer.useCallback[computeHighlightsFromDOM]": (a, b)=>a.area - b.area
                    }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
                    const best = candidates[0];
                    // For some matches, the element might contain extra text; to be a bit more precise,
                    // we can try to split text nodes and find child nodes that match smaller text. Here we keep it simple.
                    const relativeLeft = best.rect.left - containerRect.left + pageEl.scrollLeft;
                    const relativeTop = best.rect.top - containerRect.top + pageEl.scrollTop;
                    foundBoxes.push({
                        id: "".concat(rawText, "-").concat(currentPage, "-").concat(foundBoxes.length),
                        page: currentPage,
                        left: Math.max(0, relativeLeft),
                        top: Math.max(0, relativeTop),
                        width: Math.max(2, best.rect.width),
                        height: Math.max(2, best.rect.height),
                        color: 'rgba(255, 255, 0, 0.35)'
                    });
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
            // Update only if changed
            setHighlightBoxes({
                "PDFViewer.useCallback[computeHighlightsFromDOM]": (prev)=>{
                    const prevIds = prev.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].prevIds": (b)=>b.id
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].prevIds"]).join(',');
                    const newIds = foundBoxes.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].newIds": (b)=>b.id
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].newIds"]).join(',');
                    if (prevIds !== newIds || prev.length !== foundBoxes.length) {
                        return foundBoxes;
                    }
                    return prev;
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
        }
    }["PDFViewer.useCallback[computeHighlightsFromDOM]"], [
        currentPage,
        findRenderedPageElement
    ]);
    // Watch for highlight text changes and run after the page/text layer renders
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFViewer.useEffect": ()=>{
            if (!highlights || highlights.length === 0) {
                setHighlightBoxes([]);
                return;
            }
            // small delay to allow text layer to render (react-pdf renders text layer after canvas)
            let cancelled = false;
            const timer = window.setTimeout({
                "PDFViewer.useEffect.timer": ()=>{
                    if (cancelled) return;
                    try {
                        computeHighlightsFromDOM(highlights);
                    } catch (err) {
                        console.error('Error computing highlights from DOM', err);
                    }
                }
            }["PDFViewer.useEffect.timer"], 180); // 180ms - adjust if you find race conditions
            return ({
                "PDFViewer.useEffect": ()=>{
                    cancelled = true;
                    clearTimeout(timer);
                }
            })["PDFViewer.useEffect"];
        }
    }["PDFViewer.useEffect"], [
        highlights,
        currentPage,
        computeHighlightsFromDOM
    ]);
    // When PDF loads
    const onDocumentLoadSuccess = (pdf)=>{
        setNumPages(pdf.numPages);
        pdfRef.current = pdf;
    };
    // When page renders, we can optionally re-run highlight mapping (page change)
    const onPageRenderSuccess = ()=>{
        // Allow text layer to finish and then recompute highlights if any
        if (highlights && highlights.length > 0) {
            // small delay for text layer
            setTimeout(()=>computeHighlightsFromDOM(highlights), 120);
        }
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
                                // let react-pdf size the page by giving a height relative to container
                                height: containerRef.current ? containerRef.current.clientHeight * 0.97 : undefined,
                                onRenderSuccess: onPageRenderSuccess,
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 182,
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
                                            borderRadius: 2,
                                            boxShadow: '0 0 0 1px rgba(255,255,0,0.15) inset'
                                        }
                                    }, h.id, false, {
                                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                        lineNumber: 203,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center gap-4 mt-2 p-2 border-t bg-white rounded-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((prev)=>Math.max(1, prev - 1)),
                        disabled: currentPage === 1,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300 transition",
                        children: "Prev"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 225,
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
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((prev)=>Math.min(numPages, prev + 1)),
                        disabled: currentPage === numPages,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300 transition",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
_s(PDFViewer, "eKllm5w4N/aj9Yyjcko3wvHAh/I=");
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