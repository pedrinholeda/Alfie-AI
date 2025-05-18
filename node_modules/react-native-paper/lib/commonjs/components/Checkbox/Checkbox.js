"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Checkbox = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CheckboxAndroid = _interopRequireDefault(require("./CheckboxAndroid"));
var _CheckboxIOS = _interopRequireDefault(require("./CheckboxIOS"));
var _theming = require("../../core/theming");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkboxes allow the selection of multiple options from a set.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [checked, setChecked] = React.useState(false);
 *
 *   return (
 *     <Checkbox
 *       status={checked ? 'checked' : 'unchecked'}
 *       onPress={() => {
 *         setChecked(!checked);
 *       }}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const Checkbox = ({
  theme: themeOverrides,
  ...props
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  return _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(_CheckboxIOS.default, _extends({}, props, {
    theme: theme
  })) : /*#__PURE__*/React.createElement(_CheckboxAndroid.default, _extends({}, props, {
    theme: theme
  }));
};
var _default = exports.default = Checkbox; // @component-docs ignore-next-line
const CheckboxWithTheme = exports.Checkbox = Checkbox;
// @component-docs ignore-next-line
//# sourceMappingURL=Checkbox.js.map