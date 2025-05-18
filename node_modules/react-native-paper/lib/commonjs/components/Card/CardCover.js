"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardCover = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _splitStyles = require("../../utils/splitStyles");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show a cover image inside a Card.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Card } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends Image props https://reactnative.dev/docs/image#props
 */
const CardCover = ({
  index,
  total,
  style,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const flattenedStyles = _reactNative.StyleSheet.flatten(style) || {};
  const [, borderRadiusStyles] = (0, _splitStyles.splitStyles)(flattenedStyles, style => style.startsWith('border') && style.endsWith('Radius'));
  const coverStyle = (0, _utils.getCardCoverStyle)({
    theme,
    index,
    total,
    borderRadiusStyles
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, coverStyle, style]
  }, /*#__PURE__*/React.createElement(_reactNative.Image, _extends({}, rest, {
    style: [styles.image, coverStyle],
    accessibilityIgnoresInvertColors: true
  })));
};
exports.CardCover = CardCover;
CardCover.displayName = 'Card.Cover';
const styles = _reactNative.StyleSheet.create({
  container: {
    height: 195,
    backgroundColor: _colors.grey200,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    justifyContent: 'flex-end'
  }
});
var _default = exports.default = CardCover; // @component-docs ignore-next-line
//# sourceMappingURL=CardCover.js.map