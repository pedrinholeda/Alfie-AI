"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forwardRef = void 0;
var React = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * TypeScript generated a large union of props from `ViewProps` in
 * `d.ts` files when using `React.forwardRef`. To prevent this
 * `ForwardRefComponent` was created and exported. Use this
 * `forwardRef` instead of `React.forwardRef` so you don't have to
 * import `ForwardRefComponent`.
 * More info: https://github.com/callstack/react-native-paper/pull/3603
 */
const forwardRef = exports.forwardRef = React.forwardRef;
//# sourceMappingURL=forwardRef.js.map