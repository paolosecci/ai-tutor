(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/ai-tutor/src/components/ChatInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@ai-sdk/react/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ChatInterface(param) {
    let { pdfId, onHighlight } = param;
    _s();
    const { messages, sendMessage, status, error, setMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    // Initialize system prompt
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            setMessages({
                "ChatInterface.useEffect": (prev)=>{
                    if (prev.some({
                        "ChatInterface.useEffect": (m)=>m.role === 'system'
                    }["ChatInterface.useEffect"])) return prev;
                    return [
                        {
                            id: 'init',
                            role: 'system',
                            parts: [
                                {
                                    type: 'reasoning',
                                    text: "You are an AI tutor assisting with questions about a PDF (ID: ".concat(pdfId, '). \nAnswer clearly and concisely. Always return JSON in the following format:\n{ "highlight": "exact text to highlight (optional)", "response": "natural language response" }.\nIf there is no highlight, "highlight" can be an empty string.')
                                }
                            ]
                        },
                        ...prev
                    ];
                }
            }["ChatInterface.useEffect"]);
        }
    }["ChatInterface.useEffect"], [
        pdfId,
        setMessages
    ]);
    const isLoading = status === 'submitted' || status === 'streaming';
    // Handle message submit
    const onSubmit = (e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem('input');
        const value = input.value.trim();
        if (!value) return;
        sendMessage({
            id: "user-".concat(Date.now()),
            role: 'user',
            parts: [
                {
                    type: 'text',
                    text: value
                }
            ]
        }, {
            body: {
                pdfId
            }
        });
        input.value = '';
    };
    // --- Improved extractJson() ---
    const extractJson = (text)=>{
        if (!text) return null;
        try {
            // Remove markdown-style ```json fences
            const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            // Try direct JSON parse
            try {
                return JSON.parse(cleaned);
            } catch (e) {
                // Try to extract JSON substring
                const jsonMatch = cleaned.match(/{[\s\S]*}/);
                if (jsonMatch) {
                    try {
                        return JSON.parse(jsonMatch[0]);
                    } catch (innerErr) {
                        console.warn('⚠️ Loose JSON parse attempt:', innerErr);
                        const loose = jsonMatch[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                        return JSON.parse(loose);
                    }
                }
            }
            console.log('extractJson(): no JSON found in text.');
            return null;
        } catch (err) {
            console.error('extractJson() fatal error:', err);
            return null;
        }
    };
    // Get display text for messages
    const getDisplayText = (text, role)=>{
        if (role !== 'assistant') return text;
        const parsed = extractJson(text);
        return (parsed === null || parsed === void 0 ? void 0 : parsed.response) || text;
    };
    // Extract highlight string
    const extractHighlight = (text)=>{
        const parsed = extractJson(text);
        if ((parsed === null || parsed === void 0 ? void 0 : parsed.highlight) && typeof parsed.highlight === 'string' && parsed.highlight.trim()) {
            return parsed.highlight.trim();
        }
        return null;
    };
    // Handle new assistant messages for highlighting
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            if (messages.length === 0) return;
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.role !== 'assistant') return;
            lastMsg.parts.forEach({
                "ChatInterface.useEffect": (part)=>{
                    if (part.type === 'text') {
                        console.log('Processing new AI response:', part.text);
                        const highlight = extractHighlight(part.text);
                        if (highlight) {
                            console.log('✅ New highlight found:', highlight);
                            console.log('🔍 Calling onHighlight with:', [
                                highlight
                            ]);
                            onHighlight === null || onHighlight === void 0 ? void 0 : onHighlight([
                                highlight
                            ]);
                        } else {
                            console.log('ℹ️ No highlight in new response');
                        }
                    }
                }
            }["ChatInterface.useEffect"]);
        }
    }["ChatInterface.useEffect"], [
        messages,
        onHighlight
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-gray-50 rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[4vh] px-4 flex items-center border-b bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold text-gray-800",
                    children: "Chat"
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50",
                children: messages.map((msg)=>msg.parts.map((part, idx)=>{
                        if (part.type === 'text') {
                            const displayText = getDisplayText(part.text, msg.role);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex ".concat(msg.role === 'user' ? 'justify-end' : 'justify-start'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-[75%] break-words p-4 m-1 rounded-2xl shadow ".concat(msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'),
                                    children: displayText
                                }, void 0, false, {
                                    fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                                    lineNumber: 151,
                                    columnNumber: 19
                                }, this)
                            }, "".concat(msg.id, "-").concat(idx), false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                                lineNumber: 145,
                                columnNumber: 17
                            }, this);
                        }
                        return null;
                    }))
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500 p-2",
                children: String(error)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 169,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "h-[5vh] flex border-t bg-white p-1 rounded-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "input",
                        type: "text",
                        placeholder: "Ask about the PDF...",
                        className: "flex-1 border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300",
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition",
                        disabled: isLoading,
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(ChatInterface, "wvRlASCQ3TnDY7vReJvm/SsMUsQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = ChatInterface;
var _c;
__turbopack_context__.k.register(_c, "ChatInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TutorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/src/components/ChatInterface.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const PDFViewer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>({
            default: mod.PDFViewer
        })), {
    loadableGenerated: {
        modules: [
            "[project]/Projects/ai-tutor/src/components/PDFViewer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = PDFViewer;
function TutorPage(props) {
    _s();
    const { pdfId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(props.params);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [highlights, setHighlights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-screen bg-green-50 overflow-hidden gap-2 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col bg-white rounded shadow flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-md font-semibold text-gray-800",
                                children: "PDF Viewer"
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/'),
                                className: "bg-gray-200 px-2 py-0.5 text-sm rounded hover:bg-gray-300 transition",
                                children: "Upload New PDF"
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFViewer, {
                        pdfId: pdfId,
                        highlights: highlights
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col bg-green-100 p-2 rounded shadow flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    pdfId: pdfId,
                    onHighlight: setHighlights
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(TutorPage, "xFPfL4XWLI+VfMDzJJp5ybTUN7c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = TutorPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PDFViewer");
__turbopack_context__.k.register(_c1, "TutorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Projects_ai-tutor_src_ebbe20de._.js.map