"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _overlay = _interopRequireDefault(require("../../styles/overlay"));
var _colors = require("../../styles/themes/v2/colors");
var _useAnimatedValue = _interopRequireDefault(require("../../utils/useAnimatedValue"));
var _useAnimatedValueArray = _interopRequireDefault(require("../../utils/useAnimatedValueArray"));
var _useIsKeyboardShown = _interopRequireDefault(require("../../utils/useIsKeyboardShown"));
var _useLayout = _interopRequireDefault(require("../../utils/useLayout"));
var _Badge = _interopRequireDefault(require("../Badge"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MIN_RIPPLE_SCALE = 0.001; // Minimum scale is not 0 due to bug with animation
const MIN_TAB_WIDTH = 96;
const MAX_TAB_WIDTH = 168;
const BAR_HEIGHT = 56;
const OUTLINE_WIDTH = 64;
const Touchable = ({
  route: _0,
  style,
  children,
  borderless,
  centered,
  rippleColor,
  ...rest
}) => _TouchableRipple.default.supported ? /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
  disabled: rest.disabled || undefined,
  borderless: borderless,
  centered: centered,
  rippleColor: rippleColor,
  style: style
}), children) : /*#__PURE__*/React.createElement(_reactNative.Pressable, _extends({
  style: style
}, rest), children);

/**
 * A navigation bar which can easily be integrated with [React Navigation's Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/).
 *
 * ## Usage
 * ### without React Navigation
 * ```js
 * import React from 'react';
 * import { useState } from 'react';
 * import { View } from 'react-native';
 * import { BottomNavigation, Text, Provider } from 'react-native-paper';
 * import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 *
 * function HomeScreen() {
 *   return (
 *     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Home!</Text>
 *     </View>
 *   );
 * }
 *
 * function SettingsScreen() {
 *   return (
 *     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Settings!</Text>
 *   </View>
 *   );
 * }
 *
 * export default function MyComponent() {
 *   const [index, setIndex] = useState(0);
 *
 *   const routes = [
 *     { key: 'home', title: 'Home', icon: 'home' },
 *     { key: 'settings', title: 'Settings', icon: 'cog' },
 *   ];

 *   const renderScene = ({ route }) => {
 *     switch (route.key) {
 *       case 'home':
 *         return <HomeScreen />;
 *       case 'settings':
 *         return <SettingsScreen />;
 *       default:
 *         return null;
 *     }
 *   };
 *
 *   return (
 *     <Provider>
 *       {renderScene({ route: routes[index] })}
 *       <BottomNavigation.Bar
 *         navigationState={{ index, routes }}
 *         onTabPress={({ route }) => {
 *           const newIndex = routes.findIndex((r) => r.key === route.key);
 *           if (newIndex !== -1) {
 *             setIndex(newIndex);
 *           }
 *         }}
 *         renderIcon={({ route, color }) => (
 *           <Icon name={route.icon} size={24} color={color} />
 *         )}
 *         getLabelText={({ route }) => route.title}
 *       />
 *     </Provider>
 *   );
 * }
 * ```
 */
const BottomNavigationBar = ({
  navigationState,
  renderIcon,
  renderLabel,
  renderTouchable = ({
    key,
    ...props
  }) => /*#__PURE__*/React.createElement(Touchable, _extends({
    key: key
  }, props)),
  getLabelText = ({
    route
  }) => route.title,
  getBadge = ({
    route
  }) => route.badge,
  getColor = ({
    route
  }) => route.color,
  getAccessibilityLabel = ({
    route
  }) => route.accessibilityLabel,
  getTestID = ({
    route
  }) => route.testID,
  activeColor,
  inactiveColor,
  keyboardHidesNavigationBar = _reactNative.Platform.OS === 'android',
  style,
  activeIndicatorStyle,
  labeled = true,
  animationEasing,
  onTabPress,
  onTabLongPress,
  shifting: shiftingProp,
  safeAreaInsets,
  labelMaxFontSizeMultiplier = 1,
  compact: compactProp,
  testID = 'bottom-navigation-bar',
  theme: themeOverrides
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    bottom,
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    scale
  } = theme.animation;
  const compact = compactProp ?? !theme.isV3;
  let shifting = shiftingProp ?? (theme.isV3 ? false : navigationState.routes.length > 3);
  if (shifting && navigationState.routes.length < 2) {
    shifting = false;
    console.warn('BottomNavigation.Bar needs at least 2 tabs to run shifting animation');
  }

  /**
   * Visibility of the navigation bar, visible state is 1 and invisible is 0.
   */
  const visibleAnim = (0, _useAnimatedValue.default)(1);

  /**
   * Active state of individual tab items, active state is 1 and inactive state is 0.
   */
  const tabsAnims = (0, _useAnimatedValueArray.default)(navigationState.routes.map(
  // focused === 1, unfocused === 0
  (_, i) => i === navigationState.index ? 1 : 0));

  /**
   * Index of the currently active tab. Used for setting the background color.
   * We don't use the color as an animated value directly, because `setValue` seems to be buggy with colors?.
   */
  const indexAnim = (0, _useAnimatedValue.default)(navigationState.index);

  /**
   * Animation for the background color ripple, used to determine it's scale and opacity.
   */
  const rippleAnim = (0, _useAnimatedValue.default)(MIN_RIPPLE_SCALE);

  /**
   * Layout of the navigation bar. The width is used to determine the size and position of the ripple.
   */
  const [layout, onLayout] = (0, _useLayout.default)();

  /**
   * Track whether the keyboard is visible to show and hide the navigation bar.
   */
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const handleKeyboardShow = React.useCallback(() => {
    setKeyboardVisible(true);
    _reactNative.Animated.timing(visibleAnim, {
      toValue: 0,
      duration: 150 * scale,
      useNativeDriver: true
    }).start();
  }, [scale, visibleAnim]);
  const handleKeyboardHide = React.useCallback(() => {
    _reactNative.Animated.timing(visibleAnim, {
      toValue: 1,
      duration: 100 * scale,
      useNativeDriver: true
    }).start(() => {
      setKeyboardVisible(false);
    });
  }, [scale, visibleAnim]);
  const animateToIndex = React.useCallback(index => {
    // Reset the ripple to avoid glitch if it's currently animating
    rippleAnim.setValue(MIN_RIPPLE_SCALE);
    _reactNative.Animated.parallel([_reactNative.Animated.timing(rippleAnim, {
      toValue: 1,
      duration: theme.isV3 || shifting ? 400 * scale : 0,
      useNativeDriver: true
    }), ...navigationState.routes.map((_, i) => _reactNative.Animated.timing(tabsAnims[i], {
      toValue: i === index ? 1 : 0,
      duration: theme.isV3 || shifting ? 150 * scale : 0,
      useNativeDriver: true,
      easing: animationEasing
    }))]).start(() => {
      // Workaround a bug in native animations where this is reset after first animation
      tabsAnims.map((tab, i) => tab.setValue(i === index ? 1 : 0));

      // Update the index to change bar's background color and then hide the ripple
      indexAnim.setValue(index);
      rippleAnim.setValue(MIN_RIPPLE_SCALE);
    });
  }, [rippleAnim, theme.isV3, shifting, scale, navigationState.routes, tabsAnims, animationEasing, indexAnim]);
  React.useEffect(() => {
    // Workaround for native animated bug in react-native@^0.57
    // Context: https://github.com/callstack/react-native-paper/pull/637
    animateToIndex(navigationState.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _useIsKeyboardShown.default)({
    onShow: handleKeyboardShow,
    onHide: handleKeyboardHide
  });
  React.useEffect(() => {
    animateToIndex(navigationState.index);
  }, [navigationState.index, animateToIndex]);
  const eventForIndex = index => {
    const event = {
      route: navigationState.routes[index],
      defaultPrevented: false,
      preventDefault: () => {
        event.defaultPrevented = true;
      }
    };
    return event;
  };
  const {
    routes
  } = navigationState;
  const {
    colors,
    dark: isDarkTheme,
    mode,
    isV3
  } = theme;
  const {
    backgroundColor: customBackground,
    elevation = 4
  } = _reactNative.StyleSheet.flatten(style) || {};
  const approxBackgroundColor = customBackground ? customBackground : isDarkTheme && mode === 'adaptive' ? (0, _overlay.default)(elevation, colors === null || colors === void 0 ? void 0 : colors.surface) : colors === null || colors === void 0 ? void 0 : colors.primary;
  const v2BackgroundColorInterpolation = shifting ? indexAnim.interpolate({
    inputRange: routes.map((_, i) => i),
    // FIXME: does outputRange support ColorValue or just strings?
    // @ts-expect-error
    outputRange: routes.map(route => getColor({
      route
    }) || approxBackgroundColor)
  }) : approxBackgroundColor;
  const backgroundColor = isV3 ? customBackground || theme.colors.elevation.level2 : shifting ? v2BackgroundColorInterpolation : approxBackgroundColor;
  const isDark = typeof approxBackgroundColor === 'string' ? !(0, _color.default)(approxBackgroundColor).isLight() : true;
  const textColor = isDark ? _colors.white : _colors.black;
  const activeTintColor = (0, _utils.getActiveTintColor)({
    activeColor,
    defaultColor: textColor,
    theme
  });
  const inactiveTintColor = (0, _utils.getInactiveTintColor)({
    inactiveColor,
    defaultColor: textColor,
    theme
  });
  const touchColor = (0, _color.default)(activeTintColor).alpha(0.12).rgb().string();
  const maxTabWidth = routes.length > 3 ? MIN_TAB_WIDTH : MAX_TAB_WIDTH;
  const maxTabBarWidth = maxTabWidth * routes.length;
  const rippleSize = layout.width / 4;
  const insets = {
    left: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.left) ?? left,
    right: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.right) ?? right,
    bottom: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.bottom) ?? bottom
  };
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({}, theme.isV3 && {
    elevation: 0
  }, {
    testID: testID,
    style: [!theme.isV3 && styles.elevation, styles.bar, keyboardHidesNavigationBar // eslint-disable-next-line react-native/no-inline-styles
    ? {
      // When the keyboard is shown, slide down the navigation bar
      transform: [{
        translateY: visibleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [layout.height, 0]
        })
      }],
      // Absolutely position the navigation bar so that the content is below it
      // This is needed to avoid gap at bottom when the navigation bar is hidden
      position: keyboardVisible ? 'absolute' : undefined
    } : null, style],
    pointerEvents: layout.measured ? keyboardHidesNavigationBar && keyboardVisible ? 'none' : 'auto' : 'none',
    onLayout: onLayout,
    container: true
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.barContent, {
      backgroundColor
    }],
    testID: `${testID}-content`
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.items, {
      marginBottom: insets.bottom,
      marginHorizontal: Math.max(insets.left, insets.right)
    }, compact && {
      maxWidth: maxTabBarWidth
    }],
    accessibilityRole: 'tablist',
    testID: `${testID}-content-wrapper`
  }, shifting && !isV3 ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: [styles.ripple, {
      // Since we have a single ripple, we have to reposition it so that it appears to expand from active tab.
      // We need to move it from the top to center of the navigation bar and from the left to the active tab.
      top: (BAR_HEIGHT - rippleSize) / 2,
      left: Math.min(layout.width, maxTabBarWidth) / routes.length * (navigationState.index + 0.5) - rippleSize / 2,
      height: rippleSize,
      width: rippleSize,
      borderRadius: rippleSize / 2,
      backgroundColor: getColor({
        route: routes[navigationState.index]
      }),
      transform: [{
        // Scale to twice the size  to ensure it covers the whole navigation bar
        scale: rippleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8]
        })
      }],
      opacity: rippleAnim.interpolate({
        inputRange: [0, MIN_RIPPLE_SCALE, 0.3, 1],
        outputRange: [0, 0, 1, 1]
      })
    }],
    testID: `${testID}-content-ripple`
  }) : null, routes.map((route, index) => {
    const focused = navigationState.index === index;
    const active = tabsAnims[index];

    // Scale the label up
    const scale = labeled && shifting ? active.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    }) : 1;

    // Move down the icon to account for no-label in shifting and smaller label in non-shifting.
    const translateY = labeled ? shifting ? active.interpolate({
      inputRange: [0, 1],
      outputRange: [7, 0]
    }) : 0 : 7;

    // We render the active icon and label on top of inactive ones and cross-fade them on change.
    // This trick gives the illusion that we are animating between active and inactive colors.
    // This is to ensure that we can use native driver, as colors cannot be animated with native driver.
    const activeOpacity = active;
    const inactiveOpacity = active.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const v3ActiveOpacity = focused ? 1 : 0;
    const v3InactiveOpacity = shifting ? inactiveOpacity : focused ? 0 : 1;

    // Scale horizontally the outline pill
    const outlineScale = focused ? active.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    }) : 0;
    const badge = getBadge({
      route
    });
    const activeLabelColor = (0, _utils.getLabelColor)({
      tintColor: activeTintColor,
      hasColor: Boolean(activeColor),
      focused,
      defaultColor: textColor,
      theme
    });
    const inactiveLabelColor = (0, _utils.getLabelColor)({
      tintColor: inactiveTintColor,
      hasColor: Boolean(inactiveColor),
      focused,
      defaultColor: textColor,
      theme
    });
    const badgeStyle = {
      top: !isV3 ? -2 : typeof badge === 'boolean' ? 4 : 2,
      right: (badge != null && typeof badge !== 'boolean' ? String(badge).length * -2 : 0) - (!isV3 ? 2 : 0)
    };
    const isLegacyOrV3Shifting = !isV3 || isV3 && shifting && labeled;
    const font = isV3 ? theme.fonts.labelMedium : {};
    return renderTouchable({
      key: route.key,
      route,
      borderless: true,
      centered: true,
      rippleColor: isV3 ? 'transparent' : touchColor,
      onPress: () => onTabPress(eventForIndex(index)),
      onLongPress: () => onTabLongPress === null || onTabLongPress === void 0 ? void 0 : onTabLongPress(eventForIndex(index)),
      testID: getTestID({
        route
      }),
      accessibilityLabel: getAccessibilityLabel({
        route
      }),
      accessibilityRole: _reactNative.Platform.OS === 'ios' ? 'button' : 'tab',
      accessibilityState: {
        selected: focused
      },
      style: [styles.item, isV3 && styles.v3Item],
      children: /*#__PURE__*/React.createElement(_reactNative.View, {
        pointerEvents: "none",
        style: isV3 && (labeled ? styles.v3TouchableContainer : styles.v3NoLabelContainer)
      }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.iconContainer, isV3 && styles.v3IconContainer, isLegacyOrV3Shifting && {
          transform: [{
            translateY
          }]
        }]
      }, isV3 && focused && /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.outline, {
          transform: [{
            scaleX: outlineScale
          }],
          backgroundColor: theme.colors.secondaryContainer
        }, activeIndicatorStyle]
      }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.iconWrapper, isV3 && styles.v3IconWrapper, {
          opacity: isLegacyOrV3Shifting ? activeOpacity : v3ActiveOpacity
        }]
      }, renderIcon ? renderIcon({
        route,
        focused: true,
        color: activeTintColor
      }) : /*#__PURE__*/React.createElement(_Icon.default, {
        source: route.focusedIcon,
        color: activeTintColor,
        size: 24
      })), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.iconWrapper, isV3 && styles.v3IconWrapper, {
          opacity: isLegacyOrV3Shifting ? inactiveOpacity : v3InactiveOpacity
        }]
      }, renderIcon ? renderIcon({
        route,
        focused: false,
        color: inactiveTintColor
      }) : /*#__PURE__*/React.createElement(_Icon.default, {
        source: theme.isV3 && route.unfocusedIcon !== undefined ? route.unfocusedIcon : route.focusedIcon,
        color: inactiveTintColor,
        size: 24
      })), /*#__PURE__*/React.createElement(_reactNative.View, {
        style: [styles.badgeContainer, badgeStyle]
      }, typeof badge === 'boolean' ? /*#__PURE__*/React.createElement(_Badge.default, {
        visible: badge,
        size: isV3 ? 6 : 8
      }) : /*#__PURE__*/React.createElement(_Badge.default, {
        visible: badge != null,
        size: 16
      }, badge))), labeled ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.labelContainer, !isV3 && {
          transform: [{
            scale
          }]
        }]
      }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.labelWrapper, {
          opacity: isLegacyOrV3Shifting ? activeOpacity : v3ActiveOpacity
        }]
      }, renderLabel ? renderLabel({
        route,
        focused: true,
        color: activeLabelColor
      }) : /*#__PURE__*/React.createElement(_Text.default, {
        maxFontSizeMultiplier: labelMaxFontSizeMultiplier,
        variant: "labelMedium",
        style: [styles.label, {
          color: activeLabelColor,
          ...font
        }]
      }, getLabelText({
        route
      }))), shifting ? null : /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        style: [styles.labelWrapper, {
          opacity: isLegacyOrV3Shifting ? inactiveOpacity : v3InactiveOpacity
        }]
      }, renderLabel ? renderLabel({
        route,
        focused: false,
        color: inactiveLabelColor
      }) : /*#__PURE__*/React.createElement(_Text.default, {
        maxFontSizeMultiplier: labelMaxFontSizeMultiplier,
        variant: "labelMedium",
        selectable: false,
        style: [styles.label, {
          color: inactiveLabelColor,
          ...font
        }]
      }, getLabelText({
        route
      })))) : !isV3 && /*#__PURE__*/React.createElement(_reactNative.View, {
        style: styles.labelContainer
      }))
    });
  }))));
};
BottomNavigationBar.displayName = 'BottomNavigation.Bar';
var _default = exports.default = BottomNavigationBar;
const styles = _reactNative.StyleSheet.create({
  bar: {
    left: 0,
    right: 0,
    bottom: 0
  },
  barContent: {
    alignItems: 'center',
    overflow: 'hidden'
  },
  items: {
    flexDirection: 'row',
    ...(_reactNative.Platform.OS === 'web' ? {
      width: '100%'
    } : null)
  },
  item: {
    flex: 1,
    // Top padding is 6 and bottom padding is 10
    // The extra 4dp bottom padding is offset by label's height
    paddingVertical: 6
  },
  v3Item: {
    paddingVertical: 0
  },
  ripple: {
    position: 'absolute'
  },
  iconContainer: {
    height: 24,
    width: 24,
    marginTop: 2,
    marginHorizontal: 12,
    alignSelf: 'center'
  },
  v3IconContainer: {
    height: 32,
    width: 32,
    marginBottom: 4,
    marginTop: 0,
    justifyContent: 'center'
  },
  iconWrapper: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    alignItems: 'center'
  },
  v3IconWrapper: {
    top: 4
  },
  labelContainer: {
    height: 16,
    paddingBottom: 2
  },
  labelWrapper: {
    ..._reactNative.StyleSheet.absoluteFillObject
  },
  // eslint-disable-next-line react-native/no-color-literals
  label: {
    fontSize: 12,
    height: BAR_HEIGHT,
    textAlign: 'center',
    backgroundColor: 'transparent',
    ...(_reactNative.Platform.OS === 'web' ? {
      whiteSpace: 'nowrap',
      alignSelf: 'center'
    } : null)
  },
  badgeContainer: {
    position: 'absolute',
    left: 0
  },
  v3TouchableContainer: {
    paddingTop: 12,
    paddingBottom: 16
  },
  v3NoLabelContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  outline: {
    width: OUTLINE_WIDTH,
    height: OUTLINE_WIDTH / 2,
    borderRadius: OUTLINE_WIDTH / 4,
    alignSelf: 'center'
  },
  elevation: {
    elevation: 4
  }
});
//# sourceMappingURL=BottomNavigationBar.js.map