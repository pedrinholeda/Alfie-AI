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
var _Icon = _interopRequireDefault(require("../Icon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _AnimatedText = _interopRequireDefault(require("../Typography/AnimatedText"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = 56;
const SCALE = 0.9;

/**
 * An animated, extending horizontally floating action button represents the primary action in an application.
 *
 * ## Usage
 * ```js
 * import React from 'react';
 * import {
 *   StyleProp,
 *   ViewStyle,
 *   Animated,
 *   StyleSheet,
 *   Platform,
 *   ScrollView,
 *   Text,
 *   SafeAreaView,
 *   I18nManager,
 * } from 'react-native';
 * import { AnimatedFAB } from 'react-native-paper';
 *
 * const MyComponent = ({
 *   animatedValue,
 *   visible,
 *   extended,
 *   label,
 *   animateFrom,
 *   style,
 *   iconMode,
 * }) => {
 *   const [isExtended, setIsExtended] = React.useState(true);
 *
 *   const isIOS = Platform.OS === 'ios';
 *
 *   const onScroll = ({ nativeEvent }) => {
 *     const currentScrollPosition =
 *       Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
 *
 *     setIsExtended(currentScrollPosition <= 0);
 *   };
 *
 *   const fabStyle = { [animateFrom]: 16 };
 *
 *   return (
 *     <SafeAreaView style={styles.container}>
 *       <ScrollView onScroll={onScroll}>
 *         {[...new Array(100).keys()].map((_, i) => (
 *           <Text>{i}</Text>
 *         ))}
 *       </ScrollView>
 *       <AnimatedFAB
 *         icon={'plus'}
 *         label={'Label'}
 *         extended={isExtended}
 *         onPress={() => console.log('Pressed')}
 *         visible={visible}
 *         animateFrom={'right'}
 *         iconMode={'static'}
 *         style={[styles.fabStyle, style, fabStyle]}
 *       />
 *     </SafeAreaView>
 *   );
 * };
 *
 * export default MyComponent;
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flexGrow: 1,
 *   },
 *   fabStyle: {
 *     bottom: 16,
 *     right: 16,
 *     position: 'absolute',
 *   },
 * });
 * ```
 */
const AnimatedFAB = ({
  icon,
  label,
  background,
  accessibilityLabel = label,
  accessibilityState,
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
  testID = 'animated-fab',
  animateFrom = 'right',
  extended = false,
  iconMode = 'dynamic',
  variant = 'primary',
  labelMaxFontSizeMultiplier,
  hitSlop,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const uppercase = uppercaseProp ?? !theme.isV3;
  const isIOS = _reactNative.Platform.OS === 'ios';
  const isWeb = _reactNative.Platform.OS === 'web';
  const isAnimatedFromRight = animateFrom === 'right';
  const isIconStatic = iconMode === 'static';
  const {
    isRTL
  } = _reactNative.I18nManager;
  const labelRef = React.useRef(null);
  const {
    current: visibility
  } = React.useRef(new _reactNative.Animated.Value(visible ? 1 : 0));
  const {
    current: animFAB
  } = React.useRef(new _reactNative.Animated.Value(0));
  const {
    isV3,
    animation
  } = theme;
  const {
    scale
  } = animation;
  const labelSize = isWeb ? (0, _utils.getLabelSizeWeb)(labelRef) : null;
  const [textWidth, setTextWidth] = React.useState((labelSize === null || labelSize === void 0 ? void 0 : labelSize.width) ?? 0);
  const [textHeight, setTextHeight] = React.useState((labelSize === null || labelSize === void 0 ? void 0 : labelSize.height) ?? 0);
  const borderRadius = SIZE / (isV3 ? 3.5 : 2);
  React.useEffect(() => {
    if (!isWeb) {
      return;
    }
    const updateTextSize = () => {
      if (labelRef.current) {
        const labelSize = (0, _utils.getLabelSizeWeb)(labelRef);
        if (labelSize) {
          setTextHeight(labelSize.height ?? 0);
          setTextWidth(labelSize.width ?? 0);
        }
      }
    };
    updateTextSize();
    window.addEventListener('resize', updateTextSize);
    return () => {
      if (!isWeb) {
        return;
      }
      window.removeEventListener('resize', updateTextSize);
    };
  }, [isWeb]);
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
  const {
    backgroundColor: customBackgroundColor,
    ...restStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const {
    backgroundColor,
    foregroundColor
  } = (0, _utils.getFABColors)({
    theme,
    variant,
    disabled,
    customColor,
    customBackgroundColor
  });
  const rippleColor = customRippleColor || (0, _color.default)(foregroundColor).alpha(0.12).rgb().string();
  const extendedWidth = textWidth + SIZE + borderRadius;
  const distance = isAnimatedFromRight ? -textWidth - borderRadius : textWidth + borderRadius;
  React.useEffect(() => {
    _reactNative.Animated.timing(animFAB, {
      toValue: !extended ? 0 : distance,
      duration: 150 * scale,
      useNativeDriver: true,
      easing: _reactNative.Easing.linear
    }).start();
  }, [animFAB, scale, distance, extended]);
  const onTextLayout = ({
    nativeEvent
  }) => {
    var _nativeEvent$lines$, _nativeEvent$lines$2;
    const currentWidth = Math.ceil(((_nativeEvent$lines$ = nativeEvent.lines[0]) === null || _nativeEvent$lines$ === void 0 ? void 0 : _nativeEvent$lines$.width) ?? 0);
    const currentHeight = Math.ceil(((_nativeEvent$lines$2 = nativeEvent.lines[0]) === null || _nativeEvent$lines$2 === void 0 ? void 0 : _nativeEvent$lines$2.height) ?? 0);
    if (currentWidth !== textWidth || currentHeight !== textHeight) {
      setTextHeight(currentHeight);
      if (isIOS) {
        return setTextWidth(currentWidth - 12);
      }
      setTextWidth(currentWidth);
    }
  };
  const propForDirection = right => {
    if (isAnimatedFromRight) {
      return right;
    }
    return right.reverse();
  };
  const combinedStyles = (0, _utils.getCombinedStyles)({
    isAnimatedFromRight,
    isIconStatic,
    distance,
    animFAB
  });
  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;
  const textStyle = {
    color: foregroundColor,
    ...font
  };
  const md2Elevation = disabled || !isIOS ? 0 : 6;
  const md3Elevation = disabled || !isIOS ? 0 : 3;
  const shadowStyle = isV3 ? styles.v3Shadow : styles.shadow;
  const baseStyle = [_reactNative.StyleSheet.absoluteFill, disabled ? styles.disabled : shadowStyle];
  const newAccessibilityState = {
    ...accessibilityState,
    disabled
  };
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({}, rest, {
    testID: `${testID}-container`,
    style: [{
      opacity: visibility,
      transform: [{
        scale: visibility
      }],
      borderRadius
    }, !isV3 && {
      elevation: md2Elevation
    }, styles.container, restStyle]
  }, isV3 && {
    elevation: md3Elevation
  }, {
    theme: theme,
    container: true
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [!isV3 && {
      transform: [{
        scaleY: animFAB.interpolate({
          inputRange: propForDirection([distance, 0]),
          outputRange: propForDirection([SCALE, 1])
        })
      }]
    }, styles.standard, {
      borderRadius
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.shadowWrapper]
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: [baseStyle, {
      width: extendedWidth,
      opacity: animFAB.interpolate({
        inputRange: propForDirection([distance, 0.9 * distance, 0]),
        outputRange: propForDirection([1, 0.15, 0])
      }),
      borderRadius
    }],
    testID: `${testID}-extended-shadow`
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: [baseStyle, {
      opacity: animFAB.interpolate({
        inputRange: propForDirection([distance, 0.9 * distance, 0]),
        outputRange: propForDirection([0, 0.85, 1])
      }),
      width: SIZE,
      borderRadius: animFAB.interpolate({
        inputRange: propForDirection([distance, 0]),
        outputRange: propForDirection([SIZE / (extendedWidth / SIZE), borderRadius])
      })
    }, combinedStyles.absoluteFill],
    testID: `${testID}-shadow`
  })), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "box-none",
    style: [styles.innerWrapper, {
      borderRadius
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.standard, {
      width: extendedWidth,
      backgroundColor,
      borderRadius
    }, combinedStyles.innerWrapper]
  }, /*#__PURE__*/React.createElement(_TouchableRipple.default, {
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
    },
    theme: theme,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.standard, {
      width: extendedWidth,
      borderRadius
    }]
  }))))), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.iconWrapper, combinedStyles.iconWrapper],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: 24,
    color: foregroundColor,
    theme: theme
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(_AnimatedText.default, {
    ref: isWeb ? labelRef : null,
    variant: "labelLarge",
    numberOfLines: 1,
    onTextLayout: isIOS ? onTextLayout : undefined,
    ellipsizeMode: 'tail',
    style: [{
      [isAnimatedFromRight || isRTL ? 'right' : 'left']: isIconStatic ? textWidth - SIZE + borderRadius / (isV3 ? 1 : 2) : borderRadius
    }, {
      minWidth: textWidth,
      top: -SIZE / 2 - textHeight / 2,
      opacity: animFAB.interpolate({
        inputRange: propForDirection([distance, 0.7 * distance, 0]),
        outputRange: propForDirection([1, 0, 0])
      }),
      // TODO: check
      transform: [{
        translateX: animFAB.interpolate({
          inputRange: propForDirection([distance, 0]),
          outputRange: propForDirection([0, SIZE])
        })
      }]
    }, styles.label, uppercase && styles.uppercaseLabel, textStyle],
    theme: theme,
    testID: `${testID}-text`,
    maxFontSizeMultiplier: labelMaxFontSizeMultiplier
  }, label)), !isIOS &&
  /*#__PURE__*/
  // Method `onTextLayout` on Android returns sizes of text visible on the screen,
  // however during render the text in `FAB` isn't fully visible. In order to get
  // proper text measurements there is a need to additionaly render that text, but
  // wrapped in absolutely positioned `ScrollView` which height is 0.
  React.createElement(_reactNative.ScrollView, {
    style: styles.textPlaceholderContainer
  }, /*#__PURE__*/React.createElement(_AnimatedText.default, {
    variant: "labelLarge",
    numberOfLines: 1,
    onTextLayout: onTextLayout,
    ellipsizeMode: 'tail',
    style: [styles.label, uppercase && styles.uppercaseLabel, textStyle],
    theme: theme
  }, label)));
};
const styles = _reactNative.StyleSheet.create({
  standard: {
    height: SIZE
  },
  disabled: {
    elevation: 0
  },
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  innerWrapper: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  shadowWrapper: {
    elevation: 0
  },
  shadow: {
    elevation: 6
  },
  v3Shadow: {
    elevation: 3
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: SIZE,
    width: SIZE
  },
  label: {
    position: 'absolute'
  },
  uppercaseLabel: {
    textTransform: 'uppercase'
  },
  textPlaceholderContainer: {
    height: 0,
    position: 'absolute'
  }
});
var _default = exports.default = AnimatedFAB;
//# sourceMappingURL=AnimatedFAB.js.map