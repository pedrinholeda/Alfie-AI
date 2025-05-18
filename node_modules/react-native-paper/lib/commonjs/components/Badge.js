"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../core/theming");
var _colors = require("../styles/themes/v2/colors");
var _getContrastingColor = _interopRequireDefault(require("../utils/getContrastingColor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultSize = 20;
/**
 * Badges are small status descriptors for UI elements.
 * A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Badge } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Badge>3</Badge>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Badge = ({
  children,
  size = defaultSize,
  style,
  theme: themeOverrides,
  visible = true,
  ...rest
}) => {
  var _theme$colors;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    current: opacity
  } = React.useRef(new _reactNative.Animated.Value(visible ? 1 : 0));
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const isFirstRendering = React.useRef(true);
  const {
    animation: {
      scale
    }
  } = theme;
  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    _reactNative.Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150 * scale,
      useNativeDriver: true
    }).start();
  }, [visible, opacity, scale]);
  const {
    backgroundColor = theme.isV3 ? theme.colors.error : (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.notification,
    ...restStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const textColor = theme.isV3 ? theme.colors.onError : (0, _getContrastingColor.default)(backgroundColor, _colors.white, _colors.black);
  const borderRadius = size / 2;
  const paddingHorizontal = theme.isV3 ? 3 : 4;
  return /*#__PURE__*/React.createElement(_reactNative.Animated.Text, _extends({
    numberOfLines: 1,
    style: [{
      opacity,
      backgroundColor,
      color: textColor,
      fontSize: size * 0.5,
      ...(!theme.isV3 && theme.fonts.regular),
      lineHeight: size / fontScale,
      height: size,
      minWidth: size,
      borderRadius,
      paddingHorizontal
    }, styles.container, restStyle]
  }, rest), children);
};
var _default = exports.default = Badge;
const styles = _reactNative.StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden'
  }
});
//# sourceMappingURL=Badge.js.map