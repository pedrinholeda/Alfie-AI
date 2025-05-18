"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppbarAction = void 0;
var React = _interopRequireWildcard(require("react"));
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _forwardRef = require("../../utils/forwardRef");
var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component used to display an action item in the appbar.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 * import { Platform } from 'react-native';
 *
 * const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *        <Appbar.Content title="Title" subtitle={'Subtitle'} />
 *         <Appbar.Action icon="magnify" onPress={() => {}} />
 *         <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
const AppbarAction = exports.AppbarAction = (0, _forwardRef.forwardRef)(({
  size = 24,
  color: iconColor,
  icon,
  disabled,
  onPress,
  accessibilityLabel,
  isLeading,
  theme: themeOverrides,
  rippleColor,
  ...rest
}, ref) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const actionIconColor = iconColor ? iconColor : theme.isV3 ? isLeading ? theme.colors.onSurface : theme.colors.onSurfaceVariant : (0, _color.default)(_colors.black).alpha(0.54).rgb().string();
  return /*#__PURE__*/React.createElement(_IconButton.default, _extends({
    size: size,
    onPress: onPress,
    iconColor: actionIconColor,
    icon: icon,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    animated: true,
    ref: ref,
    rippleColor: rippleColor
  }, rest));
});
AppbarAction.displayName = 'Appbar.Action';
var _default = exports.default = AppbarAction; // @component-docs ignore-next-line
//# sourceMappingURL=AppbarAction.js.map