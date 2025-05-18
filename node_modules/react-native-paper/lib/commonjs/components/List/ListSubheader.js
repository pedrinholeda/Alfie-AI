"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component used to display a header in lists.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List } from 'react-native-paper';
 *
 * const MyComponent = () => <List.Subheader>My List Title</List.Subheader>;
 *
 * export default MyComponent;
 * ```
 */
const ListSubheader = ({
  style,
  theme: overrideTheme,
  maxFontSizeMultiplier,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(overrideTheme);
  const textColor = theme.isV3 ? theme.colors.onSurfaceVariant : (0, _color.default)(theme.colors.text).alpha(0.54).rgb().string();
  const font = theme.isV3 ? theme.fonts.bodyMedium : theme.fonts.medium;
  return /*#__PURE__*/React.createElement(_Text.default, _extends({
    variant: "bodyMedium",
    numberOfLines: 1,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, rest, {
    style: [styles.container, {
      color: textColor,
      ...font
    }, style]
  }));
};
ListSubheader.displayName = 'List.Subheader';
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 13
  }
});
var _default = exports.default = ListSubheader;
//# sourceMappingURL=ListSubheader.js.map