"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _getContrastingColor = _interopRequireDefault(require("../../utils/getContrastingColor"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultSize = 64;
/**
 * Avatars can be used to represent people in a graphical way.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
const AvatarText = ({
  label,
  size = defaultSize,
  style,
  labelStyle,
  color: customColor,
  theme: themeOverrides,
  maxFontSizeMultiplier,
  ...rest
}) => {
  var _theme$colors;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    backgroundColor = (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.primary,
    ...restStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const textColor = customColor ?? (0, _getContrastingColor.default)(backgroundColor, _colors.white, 'rgba(0, 0, 0, .54)');
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor
    }, styles.container, restStyle]
  }, rest), /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.text, {
      color: textColor,
      fontSize: size / 2,
      lineHeight: size / fontScale
    }, labelStyle],
    numberOfLines: 1,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, label));
};
AvatarText.displayName = 'Avatar.Text';
const styles = _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
var _default = exports.default = AvatarText;
//# sourceMappingURL=AvatarText.js.map