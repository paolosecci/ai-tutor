(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/ai-tutor/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/Projects/ai-tutor/node_modules/dequal/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dequal",
    ()=>dequal
]);
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
    for (key of iter.keys()){
        if (dequal(key, tar)) return key;
    }
}
function dequal(foo, bar) {
    var ctor, len, tmp;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while(len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (ctor === Set) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len;
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!bar.has(tmp)) return false;
            }
            return true;
        }
        if (ctor === Map) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len[0];
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!dequal(len[1], bar.get(tmp))) {
                    return false;
                }
            }
            return true;
        }
        if (ctor === ArrayBuffer) {
            foo = new Uint8Array(foo);
            bar = new Uint8Array(bar);
        } else if (ctor === DataView) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo.getInt8(len) === bar.getInt8(len));
            }
            return len === -1;
        }
        if (ArrayBuffer.isView(foo)) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo[len] === bar[len]);
            }
            return len === -1;
        }
        if (!ctor || typeof foo === 'object') {
            len = 0;
            for(ctor in foo){
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}
}),
"[project]/Projects/ai-tutor/node_modules/make-cancellable-promise/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>makeCancellablePromise
]);
function makeCancellablePromise(promise) {
    let isCancelled = false;
    const wrappedPromise = new Promise((resolve, reject)=>{
        promise.then((value)=>!isCancelled && resolve(value)).catch((error)=>!isCancelled && reject(error));
    });
    return {
        promise: wrappedPromise,
        cancel () {
            isCancelled = true;
        }
    };
}
}),
"[project]/Projects/ai-tutor/node_modules/make-event-props/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// As defined on the list of supported events: https://reactjs.org/docs/events.html
__turbopack_context__.s([
    "allEvents",
    ()=>allEvents,
    "animationEvents",
    ()=>animationEvents,
    "changeEvents",
    ()=>changeEvents,
    "clipboardEvents",
    ()=>clipboardEvents,
    "compositionEvents",
    ()=>compositionEvents,
    "default",
    ()=>makeEventProps,
    "dragEvents",
    ()=>dragEvents,
    "focusEvents",
    ()=>focusEvents,
    "formEvents",
    ()=>formEvents,
    "imageEvents",
    ()=>imageEvents,
    "keyboardEvents",
    ()=>keyboardEvents,
    "mediaEvents",
    ()=>mediaEvents,
    "mouseEvents",
    ()=>mouseEvents,
    "otherEvents",
    ()=>otherEvents,
    "pointerEvents",
    ()=>pointerEvents,
    "selectionEvents",
    ()=>selectionEvents,
    "touchEvents",
    ()=>touchEvents,
    "transitionEvents",
    ()=>transitionEvents,
    "uiEvents",
    ()=>uiEvents,
    "wheelEvents",
    ()=>wheelEvents
]);
const clipboardEvents = [
    'onCopy',
    'onCut',
    'onPaste'
];
const compositionEvents = [
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate'
];
const focusEvents = [
    'onFocus',
    'onBlur'
];
const formEvents = [
    'onInput',
    'onInvalid',
    'onReset',
    'onSubmit'
];
const imageEvents = [
    'onLoad',
    'onError'
];
const keyboardEvents = [
    'onKeyDown',
    'onKeyPress',
    'onKeyUp'
];
const mediaEvents = [
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting'
];
const mouseEvents = [
    'onClick',
    'onContextMenu',
    'onDoubleClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp'
];
const dragEvents = [
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop'
];
const selectionEvents = [
    'onSelect'
];
const touchEvents = [
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart'
];
const pointerEvents = [
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut'
];
const uiEvents = [
    'onScroll'
];
const wheelEvents = [
    'onWheel'
];
const animationEvents = [
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration'
];
const transitionEvents = [
    'onTransitionEnd'
];
const otherEvents = [
    'onToggle'
];
const changeEvents = [
    'onChange'
];
const allEvents = [
    ...clipboardEvents,
    ...compositionEvents,
    ...focusEvents,
    ...formEvents,
    ...imageEvents,
    ...keyboardEvents,
    ...mediaEvents,
    ...mouseEvents,
    ...dragEvents,
    ...selectionEvents,
    ...touchEvents,
    ...pointerEvents,
    ...uiEvents,
    ...wheelEvents,
    ...animationEvents,
    ...transitionEvents,
    ...changeEvents,
    ...otherEvents
];
function makeEventProps(props, getArgs) {
    const eventProps = {};
    for (const eventName of allEvents){
        const eventHandler = props[eventName];
        if (!eventHandler) {
            continue;
        }
        if (getArgs) {
            eventProps[eventName] = (event)=>eventHandler(event, getArgs(eventName));
        } else {
            eventProps[eventName] = eventHandler;
        }
    }
    return eventProps;
}
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_apply_descriptor_get
]);
function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_extract_field_descriptor
]);
function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_field_get.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_field_get
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_get$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)");
;
;
function _class_private_field_get(receiver, privateMap) {
    var descriptor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, privateMap, "get");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_get$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_check_private_redeclaration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_check_private_redeclaration
]);
function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_field_init.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_field_init
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_check_private_redeclaration.js [app-client] (ecmascript)");
;
function _class_private_field_init(obj, privateMap, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(obj, privateMap);
    privateMap.set(obj, value);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_apply_descriptor_set
]);
function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            // This should only throw in strict mode, but class bodies are
            // always strict and private fields can only be used inside
            // class bodies.
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_field_set.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_field_set
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_set$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)");
;
;
function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, privateMap, "set");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_set$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor, value);
    return value;
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_update.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_apply_descriptor_update
]);
function _class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            // This should only throw in strict mode, but class bodies are
            // always strict and private fields can only be used inside
            // class bodies.
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_field_update.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_field_update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_update$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_update.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)");
;
;
function _class_private_field_update(receiver, privateMap) {
    var descriptor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, privateMap, "update");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_update$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_method_get.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_method_get
]);
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_method_init.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_method_init
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_check_private_redeclaration.js [app-client] (ecmascript)");
;
function _class_private_method_init(obj, privateSet) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(obj, privateSet);
    privateSet.add(obj);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_access.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_check_private_static_access
]);
function _class_check_private_static_access(receiver, classConstructor) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_field_descriptor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_check_private_static_field_descriptor
]);
function _class_check_private_static_field_descriptor(descriptor, action) {
    if (descriptor === undefined) {
        throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_static_private_field_spec_get.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_static_private_field_spec_get
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_get$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_access.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_field_descriptor.js [app-client] (ecmascript)");
;
;
;
function _class_static_private_field_spec_get(receiver, classConstructor, descriptor) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, classConstructor);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(descriptor, "get");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_get$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_static_private_field_spec_set.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_static_private_field_spec_set
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_set$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_access.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_field_descriptor.js [app-client] (ecmascript)");
;
;
;
function _class_static_private_field_spec_set(receiver, classConstructor, descriptor, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, classConstructor);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(descriptor, "set");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_set$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor, value);
    return value;
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_static_private_field_update.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_static_private_field_update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_update$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_update.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_access.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_field_descriptor.js [app-client] (ecmascript)");
;
;
;
function _class_static_private_field_update(receiver, classConstructor, descriptor) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, classConstructor);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(descriptor, "update");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_update$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_destructure.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_apply_descriptor_destructure
]);
function _class_apply_descriptor_destructure(receiver, descriptor) {
    if (descriptor.set) {
        if (!("__destrObj" in descriptor)) {
            descriptor.__destrObj = {
                set value (v){
                    descriptor.set.call(receiver, v);
                }
            };
        }
        return descriptor.__destrObj;
    } else {
        if (!descriptor.writable) {
            // This should only throw in strict mode, but class bodies are
            // always strict and private fields can only be used inside
            // class bodies.
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_private_field_destructure.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_private_field_destructure
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_destructure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_apply_descriptor_destructure.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)");
;
;
function _class_private_field_destructure(receiver, privateMap) {
    var descriptor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, privateMap, "set");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_destructure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_static_private_method_get.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_static_private_method_get
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/@swc/helpers/esm/_class_check_private_static_access.js [app-client] (ecmascript)");
;
function _class_static_private_method_get(receiver, classConstructor, method) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_check_private_static_access$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, classConstructor);
    return method;
}
;
}),
"[project]/Projects/ai-tutor/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>invariant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var isProduction = ("TURBOPACK compile-time value", "development") === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}
;
}),
"[project]/Projects/ai-tutor/node_modules/warning/warning.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$ai$2d$tutor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Projects/ai-tutor/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */ var __DEV__ = ("TURBOPACK compile-time value", "development") !== 'production';
var warning = function() {};
if ("TURBOPACK compile-time truthy", 1) {
    var printWarning = function printWarning(format, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for(var key = 1; key < len; key++){
            args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {}
    };
    warning = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for(var key = 2; key < len; key++){
            args[key - 2] = arguments[key];
        }
        if (format === undefined) {
            throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
            printWarning.apply(null, [
                format
            ].concat(args));
        }
    };
}
module.exports = warning;
}),
"[project]/Projects/ai-tutor/node_modules/merge-refs/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A function that merges React refs into one.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```tsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {(React.Ref<T> | undefined)[]} inputRefs Array of refs
 * @returns {React.Ref<T> | React.RefCallback<T>} Merged refs
 */ __turbopack_context__.s([
    "default",
    ()=>mergeRefs
]);
function mergeRefs() {
    var inputRefs = [];
    for(var _i = 0; _i < arguments.length; _i++){
        inputRefs[_i] = arguments[_i];
    }
    var filteredInputRefs = inputRefs.filter(Boolean);
    if (filteredInputRefs.length <= 1) {
        var firstRef = filteredInputRefs[0];
        return firstRef || null;
    }
    return function mergedRefs(ref) {
        for(var _i = 0, filteredInputRefs_1 = filteredInputRefs; _i < filteredInputRefs_1.length; _i++){
            var inputRef = filteredInputRefs_1[_i];
            if (typeof inputRef === 'function') {
                inputRef(ref);
            } else if (inputRef) {
                inputRef.current = ref;
            }
        }
    };
}
}),
]);

//# sourceMappingURL=18432_5335d36c._.js.map