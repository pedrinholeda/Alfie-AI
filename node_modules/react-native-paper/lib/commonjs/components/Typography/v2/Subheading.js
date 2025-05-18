"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _StyledText = _interopRequireDefault(require("./StyledText"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// @component-group Typography

/**
 * @deprecated Deprecated in v5.x - use `<Text variant="titleMedium" />` instead.
 * Typography component for showing a subheading.
 *
 * <div class="screenshots">
 *   <img src="screenshots/subheading.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Subheading } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Subheading>Subheading</Subheading>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Subheading = props => /*#__PURE__*/React.createElement(_StyledText.default, _extends({}, props, {
  alpha: 0.87,
  family: "regular",
  style: [styles.text, props.style]
}));
var _default = exports.default = Subheading;
const styles = _reactNative.StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 2,
    letterSpacing: 0.5
  }
});
//# sourceMappingURL=Subheading.js.map