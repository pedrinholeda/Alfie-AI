"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DialogTitle = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _Text = _interopRequireDefault(require("../Typography/Text"));
var _Title = _interopRequireDefault(require("../Typography/v2/Title"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show a title in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Dialog, Portal, Text } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Title>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Text variant="bodyMedium">This is simple dialog</Text>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogTitle = ({
  children,
  theme: themeOverrides,
  style,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    isV3,
    colors,
    fonts
  } = theme;
  const TextComponent = isV3 ? _Text.default : _Title.default;
  const headerTextStyle = {
    color: isV3 ? colors.onSurface : colors === null || colors === void 0 ? void 0 : colors.text,
    ...(isV3 ? fonts.headlineSmall : {})
  };
  return /*#__PURE__*/React.createElement(TextComponent, _extends({
    variant: "headlineSmall",
    accessibilityRole: "header",
    style: [styles.text, isV3 && styles.v3Text, headerTextStyle, style]
  }, rest), children);
};
exports.DialogTitle = DialogTitle;
DialogTitle.displayName = 'Dialog.Title';
const styles = _reactNative.StyleSheet.create({
  text: {
    marginTop: 22,
    marginBottom: 18,
    marginHorizontal: 24
  },
  v3Text: {
    marginTop: 16,
    marginBottom: 16
  }
});
var _default = exports.default = DialogTitle; // @component-docs ignore-next-line
//# sourceMappingURL=DialogTitle.js.map