"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
var _hasTouchHandler = _interopRequireDefault(require("../../utils/hasTouchHandler"));
var _splitStyles = require("../../utils/splitStyles");
var _ActivityIndicator = _interopRequireDefault(require("../ActivityIndicator"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A button is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Button = ({
  disabled,
  compact,
  mode = 'text',
  dark,
  loading,
  icon,
  buttonColor: customButtonColor,
  textColor: customTextColor,
  rippleColor: customRippleColor,
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  hitSlop,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  delayLongPress,
  style,
  theme: themeOverrides,
  uppercase: uppercaseProp,
  contentStyle,
  labelStyle,
  testID = 'button',
  accessible,
  background,
  maxFontSizeMultiplier,
  touchableRef,
  ...rest
}, ref) => {
  var _StyleSheet$flatten;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const isMode = React.useCallback(modeToCompare => {
    return mode === modeToCompare;
  }, [mode]);
  const {
    roundness,
    isV3,
    animation
  } = theme;
  const uppercase = uppercaseProp ?? !theme.isV3;
  const isWeb = _reactNative.Platform.OS === 'web';
  const hasPassedTouchHandler = (0, _hasTouchHandler.default)({
    onPress,
    onPressIn,
    onPressOut,
    onLongPress
  });
  const isElevationEntitled = !disabled && (isV3 ? isMode('elevated') : isMode('contained'));
  const initialElevation = isV3 ? 1 : 2;
  const activeElevation = isV3 ? 2 : 8;
  const {
    current: elevation
  } = React.useRef(new _reactNative.Animated.Value(isElevationEntitled ? initialElevation : 0));
  React.useEffect(() => {
    // Workaround not to call setValue on Animated.Value, because it breaks styles.
    // https://github.com/callstack/react-native-paper/issues/4559
    _reactNative.Animated.timing(elevation, {
      toValue: isElevationEntitled ? initialElevation : 0,
      duration: 0,
      useNativeDriver: true
    });
  }, [isElevationEntitled, elevation, initialElevation]);
  const handlePressIn = e => {
    onPressIn === null || onPressIn === void 0 || onPressIn(e);
    if (isV3 ? isMode('elevated') : isMode('contained')) {
      const {
        scale
      } = animation;
      _reactNative.Animated.timing(elevation, {
        toValue: activeElevation,
        duration: 200 * scale,
        useNativeDriver: isWeb || _reactNative.Platform.constants.reactNativeVersion.minor <= 72
      }).start();
    }
  };
  const handlePressOut = e => {
    onPressOut === null || onPressOut === void 0 || onPressOut(e);
    if (isV3 ? isMode('elevated') : isMode('contained')) {
      const {
        scale
      } = animation;
      _reactNative.Animated.timing(elevation, {
        toValue: initialElevation,
        duration: 150 * scale,
        useNativeDriver: isWeb || _reactNative.Platform.constants.reactNativeVersion.minor <= 72
      }).start();
    }
  };
  const flattenedStyles = _reactNative.StyleSheet.flatten(style) || {};
  const [, borderRadiusStyles] = (0, _splitStyles.splitStyles)(flattenedStyles, style => style.startsWith('border') && style.endsWith('Radius'));
  const borderRadius = (isV3 ? 5 : 1) * roundness;
  const iconSize = isV3 ? 18 : 16;
  const {
    backgroundColor,
    borderColor,
    textColor,
    borderWidth
  } = (0, _utils.getButtonColors)({
    customButtonColor,
    customTextColor,
    theme,
    mode,
    disabled,
    dark
  });
  const rippleColor = customRippleColor || (0, _color.default)(textColor).alpha(0.12).rgb().string();
  const touchableStyle = {
    ...borderRadiusStyles,
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius
  };
  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    ...touchableStyle
  };
  const {
    color: customLabelColor,
    fontSize: customLabelSize
  } = _reactNative.StyleSheet.flatten(labelStyle) || {};
  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;
  const textStyle = {
    color: textColor,
    ...font
  };
  const iconStyle = ((_StyleSheet$flatten = _reactNative.StyleSheet.flatten(contentStyle)) === null || _StyleSheet$flatten === void 0 ? void 0 : _StyleSheet$flatten.flexDirection) === 'row-reverse' ? [styles.iconReverse, isV3 && styles[`md3IconReverse${compact ? 'Compact' : ''}`], isV3 && isMode('text') && styles[`md3IconReverseTextMode${compact ? 'Compact' : ''}`]] : [styles.icon, isV3 && styles[`md3Icon${compact ? 'Compact' : ''}`], isV3 && isMode('text') && styles[`md3IconTextMode${compact ? 'Compact' : ''}`]];
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({}, rest, {
    ref: ref,
    testID: `${testID}-container`,
    style: [styles.button, compact && styles.compact, buttonStyle, style, !isV3 && !disabled && {
      elevation
    }]
  }, isV3 && {
    elevation: elevation
  }, {
    container: true
  }), /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    borderless: true,
    background: background,
    onPress: onPress,
    onLongPress: onLongPress,
    onPressIn: hasPassedTouchHandler ? handlePressIn : undefined,
    onPressOut: hasPassedTouchHandler ? handlePressOut : undefined,
    delayLongPress: delayLongPress,
    accessibilityLabel: accessibilityLabel,
    accessibilityHint: accessibilityHint,
    accessibilityRole: accessibilityRole,
    accessibilityState: {
      disabled
    },
    accessible: accessible,
    hitSlop: hitSlop,
    disabled: disabled,
    rippleColor: rippleColor,
    style: (0, _utils.getButtonTouchableRippleStyle)(touchableStyle, borderWidth),
    testID: testID,
    theme: theme,
    ref: touchableRef
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.content, contentStyle]
  }, icon && loading !== true ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: iconStyle,
    testID: `${testID}-icon-container`
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: customLabelSize ?? iconSize,
    color: typeof customLabelColor === 'string' ? customLabelColor : textColor
  })) : null, loading ? /*#__PURE__*/React.createElement(_ActivityIndicator.default, {
    size: customLabelSize ?? iconSize,
    color: typeof customLabelColor === 'string' ? customLabelColor : textColor,
    style: iconStyle
  }) : null, /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelLarge",
    selectable: false,
    numberOfLines: 1,
    testID: `${testID}-text`,
    style: [styles.label, !isV3 && styles.md2Label, isV3 && (isMode('text') ? icon || loading ? styles.md3LabelTextAddons : styles.md3LabelText : styles.md3Label), compact && styles.compactLabel, uppercase && styles.uppercaseLabel, textStyle, labelStyle],
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, children))));
};
const styles = _reactNative.StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid'
  },
  compact: {
    minWidth: 'auto'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginLeft: 12,
    marginRight: -4
  },
  iconReverse: {
    marginRight: 12,
    marginLeft: -4
  },
  /* eslint-disable react-native/no-unused-styles */
  md3Icon: {
    marginLeft: 16,
    marginRight: -16
  },
  md3IconCompact: {
    marginLeft: 8,
    marginRight: 0
  },
  md3IconReverse: {
    marginLeft: -16,
    marginRight: 16
  },
  md3IconReverseCompact: {
    marginLeft: 0,
    marginRight: 8
  },
  md3IconTextMode: {
    marginLeft: 12,
    marginRight: -8
  },
  md3IconTextModeCompact: {
    marginLeft: 6,
    marginRight: 0
  },
  md3IconReverseTextMode: {
    marginLeft: -8,
    marginRight: 12
  },
  md3IconReverseTextModeCompact: {
    marginLeft: 0,
    marginRight: 6
  },
  /* eslint-enable react-native/no-unused-styles */
  label: {
    textAlign: 'center',
    marginVertical: 9,
    marginHorizontal: 16
  },
  md2Label: {
    letterSpacing: 1
  },
  compactLabel: {
    marginHorizontal: 8
  },
  uppercaseLabel: {
    textTransform: 'uppercase'
  },
  md3Label: {
    marginVertical: 10,
    marginHorizontal: 24
  },
  md3LabelText: {
    marginHorizontal: 12
  },
  md3LabelTextAddons: {
    marginHorizontal: 16
  }
});
var _default = exports.default = (0, _forwardRef.forwardRef)(Button);
//# sourceMappingURL=Button.js.map