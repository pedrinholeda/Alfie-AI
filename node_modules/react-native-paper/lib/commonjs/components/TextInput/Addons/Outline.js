"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Outline = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Outline = ({
  isV3,
  label,
  activeColor,
  backgroundColor,
  hasActiveOutline,
  focused,
  outlineColor,
  roundness,
  style
}) => /*#__PURE__*/React.createElement(_reactNative.View, {
  testID: "text-input-outline",
  pointerEvents: "none",
  style: [styles.outline, !label && styles.noLabelOutline,
  // eslint-disable-next-line react-native/no-inline-styles
  {
    backgroundColor,
    borderRadius: roundness,
    borderWidth: (isV3 ? hasActiveOutline : focused) ? 2 : 1,
    borderColor: hasActiveOutline ? activeColor : outlineColor
  }, style]
});
exports.Outline = Outline;
const styles = _reactNative.StyleSheet.create({
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0
  },
  noLabelOutline: {
    top: 0
  }
});
//# sourceMappingURL=Outline.js.map