"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAnimatedValueArray;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function useAnimatedValueArray(initialValues) {
  const refs = React.useRef([]);
  refs.current.length = initialValues.length;
  initialValues.forEach((initialValue, i) => {
    refs.current[i] = refs.current[i] ?? new _reactNative.Animated.Value(initialValue);
  });
  return refs.current;
}
//# sourceMappingURL=useAnimatedValueArray.js.map