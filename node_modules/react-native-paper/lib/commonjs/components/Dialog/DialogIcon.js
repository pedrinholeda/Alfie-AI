"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DialogIcon = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _Icon = _interopRequireDefault(require("../Icon"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * @supported Available in v5.x with theme version 3
 * A component to show an icon in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { StyleSheet } from 'react-native';
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
 *         <Dialog.Icon icon="alert" />
 *         <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Text variant="bodyMedium">This is simple dialog</Text>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   title: {
 *     textAlign: 'center',
 *   },
 * })
 *
 * export default MyComponent;
 * ```
 */
const DialogIcon = ({
  size = 24,
  color,
  icon,
  theme: themeOverrides
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  if (!theme.isV3) {
    return null;
  }

  //@ts-ignore
  const iconColor = color || theme.colors.secondary;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.wrapper
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    color: iconColor,
    size: size
  }));
};
exports.DialogIcon = DialogIcon;
DialogIcon.displayName = 'Dialog.Icon';
const styles = _reactNative.StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24
  }
});
var _default = exports.default = DialogIcon; // @component-docs ignore-next-line
//# sourceMappingURL=DialogIcon.js.map