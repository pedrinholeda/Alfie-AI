"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppbarBackAction = void 0;
var React = _interopRequireWildcard(require("react"));
var _AppbarAction = _interopRequireDefault(require("./AppbarAction"));
var _AppbarBackIcon = _interopRequireDefault(require("./AppbarBackIcon"));
var _forwardRef = require("../../utils/forwardRef");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component used to display a back button in the appbar.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *       <Appbar.BackAction onPress={() => {}} />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
const AppbarBackAction = exports.AppbarBackAction = (0, _forwardRef.forwardRef)(({
  accessibilityLabel = 'Back',
  ...rest
}, ref) => /*#__PURE__*/React.createElement(_AppbarAction.default, _extends({
  accessibilityLabel: accessibilityLabel
}, rest, {
  icon: _AppbarBackIcon.default,
  isLeading: true,
  ref: ref
})));
AppbarBackAction.displayName = 'Appbar.BackAction';
var _default = exports.default = AppbarBackAction; // @component-docs ignore-next-line
//# sourceMappingURL=AppbarBackAction.js.map