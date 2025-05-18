"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _tokens = require("../../styles/themes/v3/tokens");
var _Divider = _interopRequireDefault(require("../Divider"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to group content inside a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [active, setActive] = React.useState('');
 *
 *   return (
 *     <Drawer.Section title="Some title">
 *       <Drawer.Item
 *         label="First Item"
 *         active={active === 'first'}
 *         onPress={() => setActive('first')}
 *       />
 *       <Drawer.Item
 *         label="Second Item"
 *         active={active === 'second'}
 *         onPress={() => setActive('second')}
 *       />
 *     </Drawer.Section>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DrawerSection = ({
  children,
  title,
  theme: themeOverrides,
  style,
  showDivider = true,
  titleMaxFontSizeMultiplier,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    isV3
  } = theme;
  const titleColor = isV3 ? theme.colors.onSurfaceVariant : (0, _color.default)(theme.colors.text).alpha(0.54).rgb().string();
  const titleMargin = isV3 ? 28 : 16;
  const font = isV3 ? theme.fonts.titleSmall : theme.fonts.medium;
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    style: [styles.container, style]
  }, rest), title && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.titleContainer, isV3 && styles.v3TitleContainer]
  }, title && /*#__PURE__*/React.createElement(_Text.default, {
    variant: "titleSmall",
    numberOfLines: 1,
    style: [{
      color: titleColor,
      marginLeft: titleMargin,
      ...font
    }],
    maxFontSizeMultiplier: titleMaxFontSizeMultiplier
  }, title)), children, showDivider && /*#__PURE__*/React.createElement(_Divider.default, _extends({}, isV3 && {
    horizontalInset: true,
    bold: true
  }, {
    style: [styles.divider, isV3 && styles.v3Divider],
    theme: theme
  })));
};
DrawerSection.displayName = 'Drawer.Section';
const styles = _reactNative.StyleSheet.create({
  container: {
    marginBottom: 4
  },
  titleContainer: {
    height: 40,
    justifyContent: 'center'
  },
  v3TitleContainer: {
    height: 56
  },
  divider: {
    marginTop: 4
  },
  v3Divider: {
    backgroundColor: _tokens.MD3Colors.neutralVariant50
  }
});
var _default = exports.default = DrawerSection;
//# sourceMappingURL=DrawerSection.js.map