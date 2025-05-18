"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadioButtonItem = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _RadioButton = _interopRequireDefault(require("./RadioButton"));
var _RadioButtonAndroid = _interopRequireDefault(require("./RadioButtonAndroid"));
var _RadioButtonGroup = require("./RadioButtonGroup");
var _RadioButtonIOS = _interopRequireDefault(require("./RadioButtonIOS"));
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * RadioButton.Item allows you to press the whole row (item) instead of only the RadioButton.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { RadioButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = React.useState('first');
 *
 *   return (
 *     <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
 *       <RadioButton.Item label="First item" value="first" />
 *       <RadioButton.Item label="Second item" value="second" />
 *     </RadioButton.Group>
 *   );
 * };
 *
 * export default MyComponent;
 *```
 */
const RadioButtonItem = ({
  value,
  label,
  style,
  labelStyle,
  onPress,
  onLongPress,
  disabled,
  color,
  uncheckedColor,
  rippleColor,
  status,
  theme: themeOverrides,
  background,
  accessibilityLabel = label,
  testID,
  mode,
  position = 'trailing',
  labelVariant = 'bodyLarge',
  labelMaxFontSizeMultiplier,
  hitSlop
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const radioButtonProps = {
    value,
    disabled,
    status,
    color,
    theme,
    uncheckedColor
  };
  const isLeading = position === 'leading';
  let radioButton;
  if (mode === 'android') {
    radioButton = /*#__PURE__*/React.createElement(_RadioButtonAndroid.default, radioButtonProps);
  } else if (mode === 'ios') {
    radioButton = /*#__PURE__*/React.createElement(_RadioButtonIOS.default, radioButtonProps);
  } else {
    radioButton = /*#__PURE__*/React.createElement(_RadioButton.default, radioButtonProps);
  }
  const textColor = theme.isV3 ? theme.colors.onSurface : theme.colors.text;
  const disabledTextColor = theme.isV3 ? theme.colors.onSurfaceDisabled : theme.colors.disabled;
  const textAlign = isLeading ? 'right' : 'left';
  const computedStyle = {
    color: disabled ? disabledTextColor : textColor,
    textAlign
  };
  return /*#__PURE__*/React.createElement(_RadioButtonGroup.RadioButtonContext.Consumer, null, context => {
    const checked = (0, _utils.isChecked)({
      contextValue: context === null || context === void 0 ? void 0 : context.value,
      status,
      value
    }) === 'checked';
    return /*#__PURE__*/React.createElement(_TouchableRipple.default, {
      onPress: event => (0, _utils.handlePress)({
        onPress: onPress,
        onValueChange: context === null || context === void 0 ? void 0 : context.onValueChange,
        value,
        event
      }),
      onLongPress: onLongPress,
      accessibilityLabel: accessibilityLabel,
      accessibilityRole: "radio",
      accessibilityState: {
        checked,
        disabled
      },
      testID: testID,
      disabled: disabled,
      background: background,
      theme: theme,
      rippleColor: rippleColor,
      hitSlop: hitSlop
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [styles.container, style],
      pointerEvents: "none"
    }, isLeading && radioButton, /*#__PURE__*/React.createElement(_Text.default, {
      variant: labelVariant,
      style: [styles.label, !theme.isV3 && styles.font, computedStyle, labelStyle],
      maxFontSizeMultiplier: labelMaxFontSizeMultiplier
    }, label), !isLeading && radioButton));
  });
};
exports.RadioButtonItem = RadioButtonItem;
RadioButtonItem.displayName = 'RadioButton.Item';
var _default = exports.default = RadioButtonItem; // @component-docs ignore-next-line
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
//# sourceMappingURL=RadioButtonItem.js.map