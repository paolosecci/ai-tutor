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
    // Extract JSON from assistant messages
    const extractJson = (text)=>{
        try {
            return JSON.parse(text.trim());
        } catch (e) {
            console.log('Direct JSON parse failed, trying to extract JSON...');
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('No JSON found');
        }
    };
    // Get display text for messages
    const getDisplayText = (text, role)=>{
        if (role !== 'assistant') return text; // Display user/system messages as-is
        try {
            const parsed = extractJson(text);
            return (parsed === null || parsed === void 0 ? void 0 : parsed.response) || text;
        } catch (err) {
            console.error('Display parse error:', err, 'on text:', text);
            return text; // Fallback to raw text if parsing fails
        }
    };
    // Extract highlight from assistant messages
    const extractHighlight = (text)=>{
        try {
            const parsed = extractJson(text);
            if ((parsed === null || parsed === void 0 ? void 0 : parsed.highlight) && typeof parsed.highlight === 'string' && parsed.highlight.trim()) {
                return parsed.highlight.trim();
            }
            return null;
        } catch (e) {
            return null;
        }
    };
    // Handle new AI responses for highlights
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
                            console.log('New highlight found:', highlight);
                            console.log('Calling onHighlight with:', [
                                highlight
                            ]);
                            onHighlight === null || onHighlight === void 0 ? void 0 : onHighlight([
                                highlight
                            ]);
                        } else {
                            console.log('No highlight in new response');
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
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 118,
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
                                    lineNumber: 135,
                                    columnNumber: 19
                                }, this)
                            }, "".concat(msg.id, "-").concat(idx), false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                                lineNumber: 129,
                                columnNumber: 17
                            }, this);
                        }
                        return null;
                    }))
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500 p-2",
                children: String(error)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 153,
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
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition",
                        disabled: isLoading,
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
        lineNumber: 116,
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
"[project]/Projects/ai-tutor/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/src/components/ChatInterface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pdfs, setPdfs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            async function fetchPdfs() {
                var _session_user;
                if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.email) {
                    const user = await fetch('/api/user', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then({
                        "Home.useEffect.fetchPdfs": (res)=>res.json()
                    }["Home.useEffect.fetchPdfs"]);
                    if (user.id) {
                        const pdfList = await fetch("/api/pdf?userId=".concat(user.id)).then({
                            "Home.useEffect.fetchPdfs": (res)=>res.json()
                        }["Home.useEffect.fetchPdfs"]);
                        setPdfs(pdfList);
                    }
                }
            }
            fetchPdfs();
        }
    }["Home.useEffect"], [
        session
    ]);
    const handleUpload = async ()=>{
        if (!file) return;
        const formData = new FormData();
        formData.append('pdf', file);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const { id } = await res.json();
            router.push("/tutor/".concat(id));
        }
    };
    if (status === 'loading') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Loading..."
    }, void 0, false, {
        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
        lineNumber: 41,
        columnNumber: 36
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-green-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-2/3 flex flex-col border-r bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Your PDFs"
                            }, void 0, false, {
                                fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            session && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: ".pdf",
                                        onChange: (e)=>{
                                            var _e_target_files;
                                            return setFile(((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) || null);
                                        },
                                        className: "border p-2 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleUpload,
                                        className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition",
                                        children: "Upload"
                                    }, void 0, false, {
                                        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-auto p-4",
                        children: pdfs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500",
                            children: "No PDFs uploaded yet."
                        }, void 0, false, {
                            fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2",
                            children: pdfs.map((pdf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/tutor/".concat(pdf.id),
                                        className: "block p-2 rounded hover:bg-blue-100 transition",
                                        children: pdf.fileName
                                    }, void 0, false, {
                                        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 19
                                    }, this)
                                }, pdf.id, false, {
                                    fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/3 flex flex-col p-4",
                children: session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    pdfId: "default"
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "m-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl mb-4 font-semibold",
                            children: "Welcome to AI Tutor"
                        }, void 0, false, {
                            fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/signup",
                                    className: "text-blue-500 hover:underline",
                                    children: "Sign up"
                                }, void 0, false, {
                                    fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                ' ',
                                "or",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "text-blue-500 hover:underline",
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                ' ',
                                "to start chatting and uploading PDFs."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                    lineNumber: 91,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/app/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Home, "K2lneWNZy6H65yJfA8oLGmFziOQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Projects_ai-tutor_src_5e009b98._.js.map