"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const version = _reactNative.NativeModules.PlatformConstants ? _reactNative.NativeModules.PlatformConstants.reactNativeVersion : undefined;
/**
 * Switch is a visual toggle between two mutually exclusive states — on and off.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Switch } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [isSwitchOn, setIsSwitchOn] = React.useState(false);
 *
 *   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
 *
 *   return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
 * };
 *
 * export default MyComponent;
 * ```
 */
const Switch = ({
  value,
  disabled,
  onValueChange,
  color,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    checkedColor,
    onTintColor,
    thumbTintColor
  } = (0, _utils.getSwitchColor)({
    theme,
    disabled,
    value,
    color
  });
  const props = version && version.major === 0 && version.minor <= 56 ? {
    onTintColor,
    thumbTintColor
  } : _reactNative.Platform.OS === 'web' ? {
    activeTrackColor: onTintColor,
    thumbColor: thumbTintColor,
    activeThumbColor: checkedColor
  } : {
    thumbColor: thumbTintColor,
    trackColor: {
      true: onTintColor,
      false: onTintColor
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.Switch, _extends({
    value: value,
    disabled: disabled,
    onValueChange: disabled ? undefined : onValueChange
  }, props, rest));
};
var _default = exports.default = Switch;
//# sourceMappingURL=Switch.js.map