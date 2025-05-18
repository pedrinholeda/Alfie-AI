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
/**
 * A component to show a scrollable content in a Dialog. The component only provides appropriate styling.
 * For the scrollable content you can use `ScrollView`, `FlatList` etc. depending on your requirement.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ScrollView } from 'react-native';
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
 *         <Dialog.ScrollArea>
 *           <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
 *             <Text>This is a scrollable area</Text>
 *           </ScrollView>
 *         </Dialog.ScrollArea>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogScrollArea = props => {
  const theme = (0, _theming.useInternalTheme)(props.theme);
  const borderStyles = {
    borderColor: theme.isV3 ? theme.colors.surfaceVariant : 'rgba(0, 0, 0, .12)',
    borderTopWidth: theme.isV3 ? 1 : _reactNative.StyleSheet.hairlineWidth,
    borderBottomWidth: theme.isV3 ? 1 : _reactNative.StyleSheet.hairlineWidth
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, props, {
    style: [styles.container, borderStyles, theme.isV3 && styles.v3Container, props.style]
  }), props.children);
};
DialogScrollArea.displayName = 'Dialog.ScrollArea';
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1
  },
  v3Container: {
    marginBottom: 24
  }
});
var _default = exports.default = DialogScrollArea;
//# sourceMappingURL=DialogScrollArea.js.map