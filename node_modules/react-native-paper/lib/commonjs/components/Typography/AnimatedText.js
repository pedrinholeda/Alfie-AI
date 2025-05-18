"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.customAnimatedText = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Animated text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
const AnimatedText = (0, _forwardRef.forwardRef)(function AnimatedText({
  style,
  theme: themeOverrides,
  variant,
  ...rest
}, ref) {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const writingDirection = _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr';
  if (theme.isV3 && variant) {
    const font = theme.fonts[variant];
    if (typeof font !== 'object') {
      throw new Error(`Variant ${variant} was not provided properly. Valid variants are ${Object.keys(theme.fonts).join(', ')}.`);
    }
    return /*#__PURE__*/React.createElement(_reactNative.Animated.Text, _extends({
      ref: ref
    }, rest, {
      style: [font, styles.text, {
        writingDirection,
        color: theme.colors.onSurface
      }, style]
    }));
  } else {
    const font = !theme.isV3 ? theme.fonts.regular : theme.fonts.bodyMedium;
    const textStyle = {
      ...font,
      color: theme.isV3 ? theme.colors.onSurface : theme.colors.text
    };
    return /*#__PURE__*/React.createElement(_reactNative.Animated.Text, _extends({
      ref: ref
    }, rest, {
      style: [styles.text, textStyle, {
        writingDirection
      }, style]
    }));
  }
});
const styles = _reactNative.StyleSheet.create({
  text: {
    textAlign: 'left'
  }
});
const customAnimatedText = () => AnimatedText;
exports.customAnimatedText = customAnimatedText;
var _default = exports.default = AnimatedText;
//# sourceMappingURL=AnimatedText.js.map