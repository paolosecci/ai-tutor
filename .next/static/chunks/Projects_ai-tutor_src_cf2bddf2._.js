(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/ai-tutor/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechRecognition",
    ()=>useSpeechRecognition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useSpeechRecognition() {
    _s();
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSpeechRecognition.useEffect": ()=>{
            const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognitionConstructor) {
                console.warn('SpeechRecognition API not supported in this browser.');
                return;
            }
            const recognition = new SpeechRecognitionConstructor();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.onresult = ({
                "useSpeechRecognition.useEffect": (event)=>{
                    const text = Array.from(event.results).map({
                        "useSpeechRecognition.useEffect.text": (r)=>r[0].transcript
                    }["useSpeechRecognition.useEffect.text"]).join('');
                    setTranscript(text);
                }
            })["useSpeechRecognition.useEffect"];
            recognition.onend = ({
                "useSpeechRecognition.useEffect": ()=>setIsListening(false)
            })["useSpeechRecognition.useEffect"];
            recognitionRef.current = recognition;
        }
    }["useSpeechRecognition.useEffect"], []);
    const startListening = ()=>{
        if (!recognitionRef.current) return;
        recognitionRef.current.start();
        setTranscript('');
        setIsListening(true);
    };
    const stopListening = ()=>{
        var _recognitionRef_current;
        (_recognitionRef_current = recognitionRef.current) === null || _recognitionRef_current === void 0 ? void 0 : _recognitionRef_current.stop();
        setIsListening(false);
    };
    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        setTranscript
    };
}
_s(useSpeechRecognition, "hhCea46Np9/fZztetuVwORHwmE0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Projects/ai-tutor/src/components/ChatInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@ai-sdk/react/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ChatInterface(param) {
    let { pdfId, onHighlight } = param;
    _s();
    const { messages, sendMessage, status, error, setMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const { transcript, isListening, startListening, stopListening, setTranscript } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"])();
    const lastHighlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastMessageIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const DEBUG = ("TURBOPACK compile-time value", "development") === 'development';
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
                                    text: "You are an AI tutor assisting with questions about a PDF (ID: ".concat(pdfId, '). \nAnswer clearly and concisely. Always return JSON in the following format:\n{ "highlight": "exact text from the PDF to highlight", "response": "natural language response" }.\nFor every query, include the most relevant passage from the PDF in the "highlight" field to provide context for your answer, even if the query does not explicitly mention "highlight". If no relevant passage exists or the query cannot be answered logically, set "highlight" to an empty string ("").')
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
    // Autoscroll to bottom when new messages are added or user submits
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            const container = messagesContainerRef.current;
            if (!container) return;
            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
            if (isNearBottom) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
    }["ChatInterface.useEffect"], [
        messages
    ]);
    const isLoading = status === 'submitted' || status === 'streaming';
    // Handle message submit
    const onSubmit = (e)=>{
        e.preventDefault();
        const value = transcript.trim();
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
        setTranscript('');
        // Force scroll to bottom after user submits
        setTimeout(()=>{
            const container = messagesContainerRef.current;
            if (container) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 0);
    };
    // Auto-send after speaking (optional)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            if (!isListening && transcript.trim()) {
                const value = transcript.trim();
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
                setTranscript('');
            }
        }
    }["ChatInterface.useEffect"], [
        isListening
    ]);
    // Extract JSON from response
    const extractJson = (text)=>{
        if (!text) return null;
        try {
            const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            try {
                return JSON.parse(cleaned);
            } catch (e) {
                const jsonMatch = cleaned.match(/{[\s\S]*}/);
                if (jsonMatch) {
                    try {
                        return JSON.parse(jsonMatch[0]);
                    } catch (innerErr) {
                        if ("TURBOPACK compile-time truthy", 1) console.warn('⚠️ Loose JSON parse attempt failed:', innerErr);
                        const loose = jsonMatch[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                        return JSON.parse(loose);
                    }
                }
            }
            return null;
        } catch (err) {
            if ("TURBOPACK compile-time truthy", 1) console.debug('extractJson(): no JSON found');
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
            if (messages.length === 0 || status === 'streaming') return;
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.role !== 'assistant' || lastMsg.id === lastMessageIdRef.current) return;
            lastMessageIdRef.current = lastMsg.id;
            lastMsg.parts.forEach({
                "ChatInterface.useEffect": (part)=>{
                    if (part.type === 'text') {
                        if ("TURBOPACK compile-time truthy", 1) console.debug('🧩 Processing final AI response:', part.text);
                        const highlight = extractHighlight(part.text);
                        if (highlight && highlight !== lastHighlightRef.current) {
                            if ("TURBOPACK compile-time truthy", 1) {
                                console.debug('✅ New highlight found:', highlight);
                                console.debug('🔍 Calling onHighlight with:', [
                                    highlight
                                ]);
                            }
                            lastHighlightRef.current = highlight;
                            onHighlight === null || onHighlight === void 0 ? void 0 : onHighlight([
                                highlight
                            ]);
                        } else if ("TURBOPACK compile-time truthy", 1) {
                            console.debug('ℹ️ No new highlight in response');
                        }
                    }
                }
            }["ChatInterface.useEffect"]);
        }
    }["ChatInterface.useEffect"], [
        messages,
        status,
        onHighlight,
        DEBUG
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full bg-gray-50 rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold text-gray-800",
                    children: "Chat"
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                    lineNumber: 184,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: messagesContainerRef,
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
                                    lineNumber: 203,
                                    columnNumber: 19
                                }, this)
                            }, "".concat(msg.id, "-").concat(idx), false, {
                                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                                lineNumber: 197,
                                columnNumber: 17
                            }, this);
                        }
                        return null;
                    }))
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500 p-2",
                children: String(error)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 221,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "flex justify-center mt-2 p-2 border-t bg-white rounded-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "input",
                        type: "text",
                        placeholder: isListening ? 'Listening...' : 'Ask about the PDF...',
                        className: "flex-1 p-2 rounded-l bg-gray-100 focus:outline-none",
                        disabled: isLoading,
                        value: transcript,
                        onChange: (e)=>setTranscript(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: isListening ? stopListening : startListening,
                        className: "p-2 px-3 transition ".concat(isListening ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
                        title: isListening ? 'Stop recording' : 'Start voice input',
                        children: "🎤"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "p-2 bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition",
                        disabled: isLoading,
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/components/ChatInterface.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s(ChatInterface, "lAQlhdxsWaqNaatBIz2kNJxOgx4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"]
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/src/components/ChatInterface.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    const [highlights, setHighlights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-screen bg-blue-100 overflow-hidden gap-2 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col rounded shadow flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFViewer, {
                    pdfId: pdfId,
                    highlights: highlights
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col rounded shadow flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    pdfId: pdfId,
                    onHighlight: setHighlights
                }, void 0, false, {
                    fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/ai-tutor/src/app/tutor/[pdfId]/page.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(TutorPage, "Hqr6MnbjdM1VD3ixtO8DtwyVGtA=");
_c1 = TutorPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PDFViewer");
__turbopack_context__.k.register(_c1, "TutorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Projects_ai-tutor_src_cf2bddf2._.js.map