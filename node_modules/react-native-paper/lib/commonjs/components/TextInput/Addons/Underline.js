"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Underline = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../../core/theming");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Underline = ({
  parentState,
  error,
  colors,
  activeColor,
  underlineColorCustom,
  hasActiveOutline,
  style,
  theme: themeOverrides
}) => {
  const {
    isV3
  } = (0, _theming.useInternalTheme)(themeOverrides);
  let backgroundColor = parentState.focused ? activeColor : underlineColorCustom;
  if (error) backgroundColor = colors === null || colors === void 0 ? void 0 : colors.error;
  const activeScale = isV3 ? 2 : 1;
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    testID: "text-input-underline",
    style: [styles.underline, isV3 && styles.md3Underline, {
      backgroundColor,
      // Underlines is thinner when input is not focused
      transform: [{
        scaleY: (isV3 ? hasActiveOutline : parentState.focused) ? activeScale : 0.5
      }]
    }, style]
  });
};
exports.Underline = Underline;
const styles = _reactNative.StyleSheet.create({
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    zIndex: 1
  },
  md3Underline: {
    height: 1
  }
});
//# sourceMappingURL=Underline.js.map