"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FAB = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
var _ActivityIndicator = _interopRequireDefault(require("../ActivityIndicator"));
var _CrossFadeIcon = _interopRequireDefault(require("../CrossFadeIcon"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A floating action button represents the primary action on a screen. It appears in front of all screen content.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { FAB } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <FAB
 *     icon="plus"
 *     style={styles.fab}
 *     onPress={() => console.log('Pressed')}
 *   />
 * );
 *
 * const styles = StyleSheet.create({
 *   fab: {
 *     position: 'absolute',
 *     margin: 16,
 *     right: 0,
 *     bottom: 0,
 *   },
 * })
 *
 * export default MyComponent;
 * ```
 */
const FAB = exports.FAB = (0, _forwardRef.forwardRef)(({
  icon,
  label,
  background,
  accessibilityLabel = label,
  accessibilityState,
  animated = true,
  color: customColor,
  rippleColor: customRippleColor,
  disabled,
  onPress,
  onLongPress,
  delayLongPress,
  theme: themeOverrides,
  style,
  visible = true,
  uppercase: uppercaseProp,
  loading,
  testID = 'fab',
  size = 'medium',
  customSize,
  mode = 'elevated',
  variant = 'primary',
  labelMaxFontSizeMultiplier,
  ...rest
}, ref) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const uppercase = uppercaseProp ?? !theme.isV3;
  const {
    current: visibility
  } = React.useRef(new _reactNative.Animated.Value(visible ? 1 : 0));
  const {
    isV3,
    animation
  } = theme;
  const {
    scale
  } = animation;
  React.useEffect(() => {
    if (visible) {
      _reactNative.Animated.timing(visibility, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true
      }).start();
    } else {
      _reactNative.Animated.timing(visibility, {
        toValue: 0,
        duration: 150 * scale,
        useNativeDriver: true
      }).start();
    }
  }, [visible, scale, visibility]);
  const IconComponent = animated ? _CrossFadeIcon.default : _Icon.default;
  const fabStyle = (0, _utils.getFabStyle)({
    customSize,
    size,
    theme
  });
  const {
    borderRadius = fabStyle.borderRadius,
    backgroundColor: customBackgroundColor
  } = _reactNative.StyleSheet.flatten(style) || {};
  const {
    backgroundColor,
    foregroundColor,
    rippleColor
  } = (0, _utils.getFABColors)({
    theme,
    variant,
    disabled,
    customColor,
    customBackgroundColor,
    customRippleColor
  });
  const isLargeSize = size === 'large';
  const isFlatMode = mode === 'flat';
  const iconSize = isLargeSize ? 36 : 24;
  const loadingIndicatorSize = isLargeSize ? 24 : 18;
  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;
  const extendedStyle = (0, _utils.getExtendedFabStyle)({
    customSize,
    theme
  });
  const textStyle = {
    color: foregroundColor,
    ...font
  };
  const md3Elevation = isFlatMode || disabled ? 0 : 3;
  const newAccessibilityState = {
    ...accessibilityState,
    disabled
  };
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({
    ref: ref
  }, rest, {
    style: [{
      borderRadius,
      backgroundColor,
      opacity: visibility,
      transform: [{
        scale: visibility
      }]
    }, !isV3 && styles.elevated, !isV3 && disabled && styles.disabled, style],
    pointerEvents: visible ? 'auto' : 'none',
    testID: `${testID}-container`
  }, isV3 && {
    elevation: md3Elevation
  }, {
    container: true
  }), /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({
    borderless: true,
    background: background,
    onPress: onPress,
    onLongPress: onLongPress,
    delayLongPress: delayLongPress,
    rippleColor: rippleColor,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: newAccessibilityState,
    testID: testID,
    style: {
      borderRadius
    }
  }, rest), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.content, label ? extendedStyle : fabStyle],
    testID: `${testID}-content`,
    pointerEvents: "none"
  }, icon && loading !== true ? /*#__PURE__*/React.createElement(IconComponent, {
    source: icon,
    size: customSize ? customSize / 2 : iconSize,
    color: foregroundColor
  }) : null, loading ? /*#__PURE__*/React.createElement(_ActivityIndicator.default, {
    size: customSize ? customSize / 2 : loadingIndicatorSize,
    color: foregroundColor
  }) : null, label ? /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelLarge",
    selectable: false,
    testID: `${testID}-text`,
    style: [styles.label, uppercase && styles.uppercaseLabel, textStyle],
    maxFontSizeMultiplier: labelMaxFontSizeMultiplier
  }, label) : null)));
});
const styles = _reactNative.StyleSheet.create({
  elevated: {
    elevation: 6
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginHorizontal: 8
  },
  uppercaseLabel: {
    textTransform: 'uppercase'
  },
  disabled: {
    elevation: 0
  }
});
var _default = exports.default = FAB; // @component-docs ignore-next-line
//# sourceMappingURL=FAB.js.map