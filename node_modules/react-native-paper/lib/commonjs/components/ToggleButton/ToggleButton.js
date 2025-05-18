"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ToggleButton = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _ToggleButtonGroup = require("./ToggleButtonGroup");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _forwardRef = require("../../utils/forwardRef");
var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toggle buttons can be used to group related options. To emphasize groups of related toggle buttons,
 * a group should share a common container.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ToggleButton } from 'react-native-paper';
 *
 * const ToggleButtonExample = () => {
 *   const [status, setStatus] = React.useState('checked');
 *
 *   const onButtonToggle = value => {
 *     setStatus(status === 'checked' ? 'unchecked' : 'checked');
 *   };
 *
 *   return (
 *     <ToggleButton
 *       icon="bluetooth"
 *       value="bluetooth"
 *       status={status}
 *       onPress={onButtonToggle}
 *     />
 *   );
 * };
 *
 * export default ToggleButtonExample;
 *
 * ```
 */
const ToggleButton = exports.ToggleButton = (0, _forwardRef.forwardRef)(({
  icon,
  size,
  theme: themeOverrides,
  accessibilityLabel,
  disabled,
  style,
  value,
  status,
  onPress,
  rippleColor,
  ...rest
}, ref) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const borderRadius = theme.roundness;
  return /*#__PURE__*/React.createElement(_ToggleButtonGroup.ToggleButtonGroupContext.Consumer, null, context => {
    const checked = context && context.value === value || status === 'checked';
    const backgroundColor = (0, _utils.getToggleButtonColor)({
      theme,
      checked
    });
    const borderColor = theme.isV3 ? theme.colors.outline : (0, _color.default)(theme.dark ? _colors.white : _colors.black).alpha(0.29).rgb().string();
    return /*#__PURE__*/React.createElement(_IconButton.default, _extends({
      borderless: false,
      icon: icon,
      onPress: e => {
        if (onPress) {
          onPress(e);
        }
        if (context) {
          context.onValueChange(!checked ? value : null);
        }
      },
      size: size,
      accessibilityLabel: accessibilityLabel,
      accessibilityState: {
        disabled,
        selected: checked
      },
      disabled: disabled,
      style: [styles.content, {
        backgroundColor,
        borderRadius,
        borderColor
      }, style],
      ref: ref,
      theme: theme,
      rippleColor: rippleColor
    }, rest));
  });
});
const styles = _reactNative.StyleSheet.create({
  content: {
    width: 42,
    height: 42,
    margin: 0
  }
});
var _default = exports.default = ToggleButton; // @component-docs ignore-next-line
//# sourceMappingURL=ToggleButton.js.map