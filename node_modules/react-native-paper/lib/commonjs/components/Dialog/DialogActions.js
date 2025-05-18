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
 * A component to show a list of actions in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button, Dialog, Portal } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Actions>
 *           <Button onPress={() => console.log('Cancel')}>Cancel</Button>
 *           <Button onPress={() => console.log('Ok')}>Ok</Button>
 *         </Dialog.Actions>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogActions = props => {
  const {
    isV3
  } = (0, _theming.useInternalTheme)(props.theme);
  const actionsLength = React.Children.toArray(props.children).length;
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, props, {
    style: [isV3 ? styles.v3Container : styles.container, props.style]
  }), React.Children.map(props.children, (child, i) => /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, {
    compact: true,
    uppercase: !isV3,
    style: [isV3 && {
      marginRight: i + 1 === actionsLength ? 0 : 8
    }, child.props.style]
  }) : child));
};
DialogActions.displayName = 'Dialog.Actions';
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 8
  },
  v3Container: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
    paddingHorizontal: 24
  }
});
var _default = exports.default = DialogActions;
//# sourceMappingURL=DialogActions.js.map