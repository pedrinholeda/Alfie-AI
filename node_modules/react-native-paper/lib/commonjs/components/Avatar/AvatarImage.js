"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
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
 *   <Avatar.Image size={24} source={require('../assets/avatar.png')} />
 * );
 * export default MyComponent
 * ```
 */
const AvatarImage = ({
  size = defaultSize,
  source,
  style,
  onError,
  onLayout,
  onLoad,
  onLoadEnd,
  onLoadStart,
  onProgress,
  theme: themeOverrides,
  testID,
  ...rest
}) => {
  const {
    colors
  } = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    backgroundColor = colors === null || colors === void 0 ? void 0 : colors.primary
  } = _reactNative.StyleSheet.flatten(style) || {};
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor
    }, style]
  }, rest), typeof source === 'function' && source({
    size
  }), typeof source !== 'function' && /*#__PURE__*/React.createElement(_reactNative.Image, {
    testID: testID,
    source: source,
    style: {
      width: size,
      height: size,
      borderRadius: size / 2
    },
    onError: onError,
    onLayout: onLayout,
    onLoad: onLoad,
    onLoadEnd: onLoadEnd,
    onLoadStart: onLoadStart,
    onProgress: onProgress,
    accessibilityIgnoresInvertColors: true
  }));
};
AvatarImage.displayName = 'Avatar.Image';
var _default = exports.default = AvatarImage;
//# sourceMappingURL=AvatarImage.js.map