"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _Icon = _interopRequireDefault(require("../Icon"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *    <Drawer.Item
 *      style={{ backgroundColor: '#64ffda' }}
 *      icon="star"
 *      label="First Item"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
const DrawerItem = ({
  icon,
  label,
  active,
  disabled,
  theme: themeOverrides,
  rippleColor: customRippleColor,
  style,
  onPress,
  background,
  accessibilityLabel,
  right,
  labelMaxFontSizeMultiplier,
  hitSlop,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    roundness,
    isV3
  } = theme;
  const backgroundColor = active ? isV3 ? theme.colors.secondaryContainer : (0, _color.default)(theme.colors.primary).alpha(0.12).rgb().string() : undefined;
  const contentColor = active ? isV3 ? theme.colors.onSecondaryContainer : theme.colors.primary : isV3 ? theme.colors.onSurfaceVariant : (0, _color.default)(theme.colors.text).alpha(0.68).rgb().string();
  const labelMargin = icon ? isV3 ? 12 : 32 : 0;
  const borderRadius = (isV3 ? 7 : 1) * roundness;
  const rippleColor = isV3 ? (0, _color.default)(contentColor).alpha(0.12).rgb().string() : undefined;
  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;
  return /*#__PURE__*/React.createElement(_reactNative.View, rest, /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    borderless: true,
    disabled: disabled,
    background: background,
    onPress: onPress,
    style: [styles.container, {
      backgroundColor,
      borderRadius
    }, isV3 && styles.v3Container, style],
    accessibilityRole: "button",
    accessibilityState: {
      selected: active
    },
    accessibilityLabel: accessibilityLabel,
    rippleColor: customRippleColor || rippleColor,
    theme: theme,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.wrapper, isV3 && styles.v3Wrapper]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.content
  }, icon ? /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: 24,
    color: contentColor
  }) : null, /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelLarge",
    selectable: false,
    numberOfLines: 1,
    style: [styles.label, {
      color: contentColor,
      marginLeft: labelMargin,
      ...font
    }],
    maxFontSizeMultiplier: labelMaxFontSizeMultiplier
  }, label)), right === null || right === void 0 ? void 0 : right({
    color: contentColor
  }))));
};
DrawerItem.displayName = 'Drawer.Item';
const styles = _reactNative.StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4
  },
  v3Container: {
    justifyContent: 'center',
    height: 56,
    marginLeft: 12,
    marginRight: 12,
    marginVertical: 0
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  v3Wrapper: {
    marginLeft: 16,
    marginRight: 24,
    padding: 0
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginRight: 32
  }
});
var _default = exports.default = DrawerItem;
//# sourceMappingURL=DrawerItem.js.map