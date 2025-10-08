(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFViewer",
    ()=>PDFViewer,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "tsx\n'use client';\nimport { useState, useEffect, useRef, useCallback } from 'react';\nimport { Document, Page, pdfjs } from 'react-pdf';\n\n// PDF.js worker\npdfjs.GlobalWorkerOptions.workerSrc = "
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
var _s = __turbopack_context__.k.signature();
""(_templateObject()); //unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
function PDFViewer(param) {
    let { pdfId, highlights = [] } = param;
    _s();
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfUrl, setPdfUrl] = useState('');
    const [highlightBoxes, setHighlightBoxes] = useState([]);
    const containerRef = useRef(null);
    const pdfRef = useRef(null);
    // Fetch PDF URL
    useEffect({
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
            fetchPdf();
        }
    }["PDFViewer.useEffect"], [
        pdfId
    ]);
    // Normalize text: remove spaces, punctuation, and convert to lowercase
    const normalizeText = (text)=>{
        return text.toLowerCase().replace(/[\n\r\s:;,.\/•–—]+/g, '') // Remove spaces and punctuation
        .trim();
    };
    // Get scale factor from CSS variable
    const getScaleFactor = (element)=>{
        const style = window.getComputedStyle(element);
        const scaleFactor = style.getPropertyValue('--total-scale-factor').trim();
        return parseFloat(scaleFactor) || 1;
    };
    // Find the rendered page DOM element
    const findRenderedPageElement = useCallback({
        "PDFViewer.useCallback[findRenderedPageElement]": ()=>{
            if (!containerRef.current) return null;
            return containerRef.current.querySelector('.react-pdf__Page');
        }
    }["PDFViewer.useCallback[findRenderedPageElement]"], []);
    // Compute highlights using DOM text layer
    const computeHighlightsFromDOM = useCallback({
        "PDFViewer.useCallback[computeHighlightsFromDOM]": (highlightTexts)=>{
            const pageEl = findRenderedPageElement();
            if (!pageEl) {
                console.warn('No rendered page DOM found when computing highlights.');
                setHighlightBoxes([]);
                return;
            }
            const containerRect = pageEl.getBoundingClientRect();
            const scaleFactor = getScaleFactor(pageEl);
            console.log('Scale factor:', scaleFactor);
            const foundBoxes = [];
            // Get all <span> elements in the text layer
            const textLayer = pageEl.querySelector('.react-pdf__Page__textContent');
            const textElements = Array.from(textLayer ? textLayer.querySelectorAll('span') : []).filter({
                "PDFViewer.useCallback[computeHighlightsFromDOM].textElements": (el)=>{
                    const style = window.getComputedStyle(el);
                    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM].textElements"]);
            // Log text content for debugging
            const allText = textElements.map({
                "PDFViewer.useCallback[computeHighlightsFromDOM].allText": (el)=>el.textContent || ''
            }["PDFViewer.useCallback[computeHighlightsFromDOM].allText"]).join(' ');
            console.log('DOM Page text:', {
                page: currentPage,
                text: allText,
                elementCount: textElements.length,
                rawElements: textElements.map({
                    "PDFViewer.useCallback[computeHighlightsFromDOM]": (el)=>({
                            text: el.textContent,
                            style: {
                                left: el.style.left,
                                top: el.style.top,
                                transform: el.style.transform
                            }
                        })
                }["PDFViewer.useCallback[computeHighlightsFromDOM]"])
            });
            highlightTexts.forEach({
                "PDFViewer.useCallback[computeHighlightsFromDOM]": (rawText)=>{
                    const normalizedTarget = normalizeText(rawText);
                    if (!normalizedTarget) {
                        console.warn('Empty normalized target text, skipping:', rawText);
                        return;
                    }
                    // First, try single <span> matching
                    let matchedElements = [];
                    let matchedText = '';
                    const matchedEl = textElements.find({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].matchedEl": (el)=>{
                            const text = normalizeText(el.textContent || '');
                            return text.includes(normalizedTarget);
                        }
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].matchedEl"]);
                    if (matchedEl) {
                        matchedElements = [
                            matchedEl
                        ];
                        matchedText = normalizeText(matchedEl.textContent || '');
                    }
                    // Fallback to sliding window if no single match
                    if (matchedElements.length === 0) {
                        for(let i = 0; i < textElements.length; i++){
                            let currentText = '';
                            let currentElements = [];
                            for(let j = i; j < Math.min(i + 3, textElements.length); j++){
                                const el = textElements[j];
                                currentElements.push(el);
                                currentText = normalizeText(currentElements.map({
                                    "PDFViewer.useCallback[computeHighlightsFromDOM]": (e)=>e.textContent || ''
                                }["PDFViewer.useCallback[computeHighlightsFromDOM]"]).join(''));
                                if (currentText.includes(normalizedTarget)) {
                                    matchedElements = [
                                        ...currentElements
                                    ];
                                    matchedText = currentText;
                                    break;
                                }
                            }
                            if (matchedElements.length) break;
                        }
                    }
                    if (matchedElements.length === 0) {
                        console.warn('No DOM match for "'.concat(rawText, '" on page ').concat(currentPage), {
                            normalizedTarget,
                            availableText: textElements.map({
                                "PDFViewer.useCallback[computeHighlightsFromDOM]": (el)=>normalizeText(el.textContent || '')
                            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]).join(' | ')
                        });
                        // Fallback to PDF.js
                        if (pdfRef.current) {
                            ({
                                "PDFViewer.useCallback[computeHighlightsFromDOM]": async ()=>{
                                    for(let pageNum = 1; pageNum <= numPages; pageNum++){
                                        try {
                                            const page = await pdfRef.current.getPage(pageNum);
                                            const textContent = await page.getTextContent();
                                            const rawText = textContent.items.map({
                                                "PDFViewer.useCallback[computeHighlightsFromDOM].rawText": (item)=>item.str
                                            }["PDFViewer.useCallback[computeHighlightsFromDOM].rawText"]).join(' ');
                                            const fullText = normalizeText(rawText);
                                            console.log('PDF.js extracted text for page', pageNum, {
                                                rawText,
                                                normalized: fullText
                                            });
                                            if (fullText.includes(normalizedTarget)) {
                                                console.log('Text "'.concat(rawText, '" found on page ').concat(pageNum, " via PDF.js, navigating..."));
                                                setCurrentPage(pageNum);
                                                setTimeout({
                                                    "PDFViewer.useCallback[computeHighlightsFromDOM]": ()=>computeHighlightsFromDOM(highlightTexts)
                                                }["PDFViewer.useCallback[computeHighlightsFromDOM]"], 1000);
                                                return;
                                            }
                                        } catch (err) {
                                            console.error("Error processing page ".concat(pageNum, ":"), err);
                                        }
                                    }
                                }
                            })["PDFViewer.useCallback[computeHighlightsFromDOM]"]();
                        }
                        return;
                    }
                    // Compute bounding box
                    const rects = matchedElements.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].rects": (el)=>{
                            const rect = el.getBoundingClientRect();
                            const style = window.getComputedStyle(el);
                            const transform = style.transform || style.webkitTransform;
                            let x = rect.left;
                            let y = rect.top;
                            // Adjust for CSS transform
                            if (transform && transform !== 'none') {
                                var _transform_match;
                                const matrix = (_transform_match = transform.match(/matrix\((.+)\)/)) === null || _transform_match === void 0 ? void 0 : _transform_match[1].split(',').map(Number);
                                if (matrix && matrix.length >= 6) {
                                    x += matrix[4];
                                    y += matrix[5];
                                    const scaleX = matrix[0] || 1;
                                    const scaleY = matrix[3] || 1;
                                    x /= scaleX;
                                    y /= scaleY;
                                }
                            }
                            // Adjust for CSS left/top with var(--total-scale-factor)
                            const leftMatch = el.style.left.match(/calc\(var\(--total-scale-factor\) \*\s*([\d.]+)px\)/);
                            const topMatch = el.style.top.match(/calc\(var\(--total-scale-factor\) \*\s*([\d.]+)px\)/);
                            if (leftMatch && topMatch) {
                                x = parseFloat(leftMatch[1]) * scaleFactor;
                                y = parseFloat(topMatch[1]) * scaleFactor;
                            }
                            return {
                                ...rect,
                                left: x,
                                top: y
                            };
                        }
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].rects"]);
                    const left = Math.min(...rects.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].left": (r)=>r.left
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].left"]));
                    const top = Math.min(...rects.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].top": (r)=>r.top
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].top"]));
                    const right = Math.max(...rects.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].right": (r)=>r.right
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].right"]));
                    const bottom = Math.max(...rects.map({
                        "PDFViewer.useCallback[computeHighlightsFromDOM].bottom": (r)=>r.bottom
                    }["PDFViewer.useCallback[computeHighlightsFromDOM].bottom"]));
                    const relativeLeft = (left - containerRect.left + pageEl.scrollLeft) / scaleFactor;
                    const relativeTop = (top - containerRect.top + pageEl.scrollTop) / scaleFactor;
                    foundBoxes.push({
                        id: "".concat(rawText, "-").concat(currentPage, "-").concat(foundBoxes.length),
                        page: currentPage,
                        left: Math.max(0, relativeLeft),
                        top: Math.max(0, relativeTop),
                        width: Math.max(2, (right - left) / scaleFactor),
                        height: Math.max(2, (bottom - top) / scaleFactor),
                        color: 'rgba(255, 255, 0, 0.5)'
                    });
                    console.log('Highlight matched:', {
                        rawText,
                        matchedText,
                        elements: matchedElements.length,
                        box: {
                            left: relativeLeft,
                            top: relativeTop,
                            width: (right - left) / scaleFactor,
                            height: (bottom - top) / scaleFactor
                        },
                        rects,
                        containerRect,
                        scaleFactor
                    });
                }
            }["PDFViewer.useCallback[computeHighlightsFromDOM]"]);
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
        numPages,
        findRenderedPageElement
    ]);
    // Watch for highlight text changes
    useEffect({
        "PDFViewer.useEffect": ()=>{
            if (!highlights || highlights.length === 0) {
                setHighlightBoxes([]);
                return;
            }
            const timer = window.setTimeout({
                "PDFViewer.useEffect.timer": ()=>{
                    try {
                        computeHighlightsFromDOM(highlights);
                    } catch (err) {
                        console.error('Error computing highlights from DOM', err);
                    }
                }
            }["PDFViewer.useEffect.timer"], 180);
            return ({
                "PDFViewer.useEffect": ()=>clearTimeout(timer)
            })["PDFViewer.useEffect"];
        }
    }["PDFViewer.useEffect"], [
        highlights,
        currentPage,
        computeHighlightsFromDOM
    ]);
    // Handle document load
    const onDocumentLoadSuccess = (pdf)=>{
        setNumPages(pdf.numPages);
        pdfRef.current = pdf;
    };
    // Handle page render
    const onPageRenderSuccess = ()=>{
        if (highlights && highlights.length > 0) {
            setTimeout(()=>computeHighlightsFromDOM(highlights), 120);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full bg-gray-50 rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "flex-1 flex justify-center items-center overflow-auto p-2",
                children: pdfUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Document, {
                    file: pdfUrl,
                    onLoadSuccess: onDocumentLoadSuccess,
                    className: "w-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Page, {
                                pageNumber: currentPage,
                                height: containerRef.current ? containerRef.current.clientHeight * 0.97 : undefined,
                                onRenderSuccess: onPageRenderSuccess,
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 302,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none',
                                    zIndex: 1000
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
                                            boxShadow: '0 0 0 1px rgba(255,255,0,0.15) inset',
                                            border: '1px solid yellow'
                                        }
                                    }, h.id, false, {
                                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                        lineNumber: 322,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                                lineNumber: 308,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 301,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                    lineNumber: 296,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 291,
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
                        lineNumber: 344,
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
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage((prev)=>Math.min(numPages, prev + 1)),
                        disabled: currentPage === numPages,
                        className: "p-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300 transition",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx",
        lineNumber: 290,
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
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_tagged_template_literal
]);
function _tagged_template_literal(strings, raw) {
    if (!raw) raw = strings.slice(0);
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
;
}),
]);

//# sourceMappingURL=Projects_ai-tutor_93560edd._.js.map