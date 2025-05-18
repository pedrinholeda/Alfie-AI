"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CheckboxItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Checkbox = _interopRequireDefault(require("./Checkbox"));
var _CheckboxAndroid = _interopRequireDefault(require("./CheckboxAndroid"));
var _CheckboxIOS = _interopRequireDefault(require("./CheckboxIOS"));
var _theming = require("../../core/theming");
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Checkbox.Item label="Item" status="checked" />
 *   </View>
 * );
 *
 * export default MyComponent;
 *```
 */

const CheckboxItem = ({
  style,
  status,
  label,
  onPress,
  onLongPress,
  labelStyle,
  theme: themeOverrides,
  testID,
  mode,
  position = 'trailing',
  accessibilityLabel = label,
  disabled,
  labelVariant = 'bodyLarge',
  labelMaxFontSizeMultiplier = 1.5,
  rippleColor,
  background,
  hitSlop,
  ...props
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const checkboxProps = {
    ...props,
    status,
    theme,
    disabled
  };
  const isLeading = position === 'leading';
  let checkbox;
  if (mode === 'android') {
    checkbox = /*#__PURE__*/React.createElement(_CheckboxAndroid.default, checkboxProps);
  } else if (mode === 'ios') {
    checkbox = /*#__PURE__*/React.createElement(_CheckboxIOS.default, checkboxProps);
  } else {
    checkbox = /*#__PURE__*/React.createElement(_Checkbox.default, checkboxProps);
  }
  const textColor = theme.isV3 ? theme.colors.onSurface : theme.colors.text;
  const disabledTextColor = theme.isV3 ? theme.colors.onSurfaceDisabled : theme.colors.disabled;
  const textAlign = isLeading ? 'right' : 'left';
  const computedStyle = {
    color: disabled ? disabledTextColor : textColor,
    textAlign
  };
  return /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "checkbox",
    accessibilityState: {
      checked: status === 'checked',
      disabled
    },
    onPress: onPress,
    onLongPress: onLongPress,
    testID: testID,
    disabled: disabled,
    rippleColor: rippleColor,
    theme: theme,
    background: background,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, style],
    pointerEvents: "none",
    importantForAccessibility: "no-hide-descendants"
  }, isLeading && checkbox, /*#__PURE__*/React.createElement(_Text.default, {
    variant: labelVariant,
    testID: `${testID}-text`,
    maxFontSizeMultiplier: labelMaxFontSizeMultiplier,
    style: [styles.label, !theme.isV3 && styles.font, computedStyle, labelStyle]
  }, label), !isLeading && checkbox));
};
exports.CheckboxItem = CheckboxItem;
CheckboxItem.displayName = 'Checkbox.Item';
var _default = exports.default = CheckboxItem; // @component-docs ignore-next-line
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  label: {
    flexShrink: 1,
    flexGrow: 1
  },
  font: {
    fontSize: 16
  }
});
//# sourceMappingURL=CheckboxItem.js.map