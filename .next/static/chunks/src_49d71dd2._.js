(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechRecognition",
    ()=>useSpeechRecognition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useSpeechRecognition() {
    _s();
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
"[project]/src/hooks/useSpeechSynthesis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechSynthesis",
    ()=>useSpeechSynthesis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const useSpeechSynthesis = function() {
    let { lang = 'en-US', rate = 1, pitch = 1, volume = 1 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const synthRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(("TURBOPACK compile-time truthy", 1) ? window.speechSynthesis : "TURBOPACK unreachable");
    const utteranceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechSynthesis.useCallback[speak]": (text)=>{
            if (!synthRef.current || !text) return;
            // Cancel any ongoing speech
            if (synthRef.current.speaking) {
                synthRef.current.cancel();
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.volume = volume;
            utterance.onstart = ({
                "useSpeechSynthesis.useCallback[speak]": ()=>setIsSpeaking(true)
            })["useSpeechSynthesis.useCallback[speak]"];
            utterance.onend = ({
                "useSpeechSynthesis.useCallback[speak]": ()=>setIsSpeaking(false)
            })["useSpeechSynthesis.useCallback[speak]"];
            utterance.onerror = ({
                "useSpeechSynthesis.useCallback[speak]": ()=>setIsSpeaking(false)
            })["useSpeechSynthesis.useCallback[speak]"];
            utteranceRef.current = utterance;
            synthRef.current.speak(utterance);
        }
    }["useSpeechSynthesis.useCallback[speak]"], [
        lang,
        rate,
        pitch,
        volume
    ]);
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechSynthesis.useCallback[cancel]": ()=>{
            var _synthRef_current;
            if ((_synthRef_current = synthRef.current) === null || _synthRef_current === void 0 ? void 0 : _synthRef_current.speaking) {
                synthRef.current.cancel();
                setIsSpeaking(false);
            }
        }
    }["useSpeechSynthesis.useCallback[cancel]"], []);
    return {
        speak,
        cancel,
        isSpeaking
    };
};
_s(useSpeechSynthesis, "lwiLBBA+V0O3bJ0HaEHOdVyjQHQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ChatInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/react/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSpeechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSpeechSynthesis.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ChatInterface(param) {
    let { pdfId, chatId, onHighlight } = param;
    _s();
    const { messages, sendMessage, status, error, setMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const { transcript, isListening, startListening, stopListening, setTranscript } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"])();
    const { speak } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSpeechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechSynthesis"])({
        lang: 'en-US',
        rate: 1
    });
    const [isSpeakingEnabled, setIsSpeakingEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasInitialized, setHasInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastHighlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastMessageIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // === LOAD SAVED MESSAGES ONCE ===
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            fetch("/api/messages?chatId=".concat(chatId)).then({
                "ChatInterface.useEffect": (r)=>r.json()
            }["ChatInterface.useEffect"]).then({
                "ChatInterface.useEffect": (saved)=>{
                    if (Array.isArray(saved) && saved.length > 0) {
                        setMessages(saved.map({
                            "ChatInterface.useEffect": (m)=>({
                                    id: m.id,
                                    role: m.role,
                                    parts: [
                                        {
                                            type: 'text',
                                            text: m.content
                                        }
                                    ]
                                })
                        }["ChatInterface.useEffect"]));
                    }
                    setHasInitialized(true);
                }
            }["ChatInterface.useEffect"]).catch({
                "ChatInterface.useEffect": ()=>setHasInitialized(true)
            }["ChatInterface.useEffect"]);
        }
    }["ChatInterface.useEffect"], [
        chatId,
        setMessages
    ]);
    // === ADD SYSTEM PROMPT ONLY ONCE, AFTER MESSAGES LOADED ===
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            if (!hasInitialized) return;
            if (messages.length === 0) {
                setMessages([
                    {
                        id: 'system-init',
                        role: 'system',
                        parts: [
                            {
                                type: 'reasoning',
                                text: "You are an AI tutor assisting with questions about a PDF (ID: ".concat(pdfId, '). Answer clearly and concisely. Always return JSON in the following format: { "highlight": "exact text from the PDF to highlight", "response": "natural language response" }. For every query, include the most relevant passage from the PDF in the "highlight" field. If no relevant passage exists, set "highlight" to "".')
                            }
                        ]
                    }
                ]);
            }
        }
    }["ChatInterface.useEffect"], [
        hasInitialized,
        messages.length,
        pdfId,
        setMessages
    ]);
    // === AUTO-SCROLL TO BOTTOM ===
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            const container = messagesContainerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }["ChatInterface.useEffect"], [
        messages
    ]);
    const isLoading = status === 'submitted' || status === 'streaming';
    // === Handle submit ===
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
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatId,
                role: 'user',
                content: value
            })
        }).catch(()=>{});
        setTranscript('');
        stopListening();
    };
    // Auto-send after voice
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
                fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chatId,
                        role: 'user',
                        content: value
                    })
                }).catch({
                    "ChatInterface.useEffect": ()=>{}
                }["ChatInterface.useEffect"]);
                setTranscript('');
            }
        }
    }["ChatInterface.useEffect"], [
        isListening
    ]);
    // === Process assistant response (highlight + TTS + save ONCE) ===
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            if (messages.length === 0 || status === 'streaming') return;
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.role !== 'assistant' || lastMsg.id === lastMessageIdRef.current) return;
            lastMessageIdRef.current = lastMsg.id;
            lastMsg.parts.forEach({
                "ChatInterface.useEffect": (part)=>{
                    if (part.type === 'text') {
                        const text = part.text.trim();
                        if (!text) return;
                        // YOUR PREFERRED CHECK — only last message
                        const alreadySaved = messages.length > 0 && messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].parts[0].type === 'text' && messages[messages.length - 1].parts[0].text.trim() === text;
                        if (!alreadySaved) {
                            fetch('/api/messages', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    chatId,
                                    role: 'assistant',
                                    content: text
                                })
                            }).catch({
                                "ChatInterface.useEffect": ()=>{}
                            }["ChatInterface.useEffect"]);
                        }
                        // Highlight + TTS
                        try {
                            const jsonMatch = text.match(/\{[\s\S]*\}/);
                            if (jsonMatch) {
                                var _parsed_highlight;
                                const parsed = JSON.parse(jsonMatch[0]);
                                if (((_parsed_highlight = parsed.highlight) === null || _parsed_highlight === void 0 ? void 0 : _parsed_highlight.trim()) && parsed.highlight.trim() !== lastHighlightRef.current) {
                                    lastHighlightRef.current = parsed.highlight.trim();
                                    onHighlight === null || onHighlight === void 0 ? void 0 : onHighlight([
                                        parsed.highlight.trim()
                                    ]);
                                }
                                if (parsed.response && isSpeakingEnabled) {
                                    speak(parsed.response);
                                }
                            }
                        } catch (e) {}
                    }
                }
            }["ChatInterface.useEffect"]);
        }
    }["ChatInterface.useEffect"], [
        messages,
        status,
        onHighlight,
        isSpeakingEnabled,
        chatId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full bg-gray-50 rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[5vh] p-2 border-b flex items-center justify-between bg-white rounded-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-gray-800",
                        children: "Chat"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "px-3 py-1 rounded text-sm ".concat(isSpeakingEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'),
                        onClick: ()=>setIsSpeakingEnabled((v)=>!v),
                        children: isSpeakingEnabled ? 'Voice On' : 'Voice Off'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: messagesContainerRef,
                className: "flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50",
                children: messages.map((msg)=>msg.parts.map((part, idx)=>{
                        var _JSON_parse, _part_text_match;
                        if (part.type !== 'text') return null;
                        const displayText = msg.role === 'assistant' ? ((_JSON_parse = JSON.parse(((_part_text_match = part.text.match(/\{[\s\S]*\}/)) === null || _part_text_match === void 0 ? void 0 : _part_text_match[0]) || '{}')) === null || _JSON_parse === void 0 ? void 0 : _JSON_parse.response) || part.text : part.text;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex ".concat(msg.role === 'user' ? 'justify-end' : 'justify-start'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[75%] break-words p-4 rounded-2xl shadow ".concat(msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'),
                                children: displayText
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatInterface.tsx",
                                lineNumber: 176,
                                columnNumber: 17
                            }, this)
                        }, "".concat(msg.id, "-").concat(idx), false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 175,
                            columnNumber: 15
                        }, this);
                    }))
            }, void 0, false, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500 p-2 text-center",
                children: String(error)
            }, void 0, false, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 187,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "flex p-2 border-t bg-white rounded-b gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: isListening ? 'Listening...' : 'Ask about the PDF...',
                        className: "flex-1 px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                        value: transcript,
                        onChange: (e)=>setTranscript(e.target.value),
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: isListening ? stopListening : startListening,
                        className: "p-3 rounded ".concat(isListening ? 'bg-red-500 text-gray-300' : 'bg-gray-200 hover:bg-gray-500'),
                        children: isListening ? '...' : '🎤'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50",
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatInterface.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(ChatInterface, "Qec1wXfIiJYeGGLQUcEX+pQ1be8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSpeechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechSynthesis"]
    ];
});
_c = ChatInterface;
var _c;
__turbopack_context__.k.register(_c, "ChatInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/tutor/[chatId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TutorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChatInterface.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const PDFViewer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/PDFViewer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>({
            default: mod.PDFViewer
        })), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/PDFViewer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = PDFViewer;
function TutorPage(props) {
    _s();
    const { chatId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(props.params);
    const [pdfId, setPdfId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [highlights, setHighlights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorPage.useEffect": ()=>{
            fetch("/api/chat/".concat(chatId)).then({
                "TutorPage.useEffect": (res)=>res.json()
            }["TutorPage.useEffect"]).then({
                "TutorPage.useEffect": (data)=>setPdfId(data.pdfId)
            }["TutorPage.useEffect"]);
        }
    }["TutorPage.useEffect"], [
        chatId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-screen bg-blue-100 overflow-hidden gap-2 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col rounded shadow flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFViewer, {
                    pdfId: pdfId,
                    highlights: highlights
                }, void 0, false, {
                    fileName: "[project]/src/app/tutor/[chatId]/page.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tutor/[chatId]/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col rounded shadow flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    chatId: chatId,
                    pdfId: pdfId,
                    onHighlight: setHighlights
                }, void 0, false, {
                    fileName: "[project]/src/app/tutor/[chatId]/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tutor/[chatId]/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/tutor/[chatId]/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(TutorPage, "/S/w6sZq7VR8GxaB3EHBp+Mkyzg=");
_c1 = TutorPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PDFViewer");
__turbopack_context__.k.register(_c1, "TutorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_49d71dd2._.js.map