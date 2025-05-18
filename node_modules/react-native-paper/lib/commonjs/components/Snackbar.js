"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _useLatestCallback = _interopRequireDefault(require("use-latest-callback"));
var _Button = _interopRequireDefault(require("./Button/Button"));
var _IconButton = _interopRequireDefault(require("./IconButton/IconButton"));
var _MaterialCommunityIcon = _interopRequireDefault(require("./MaterialCommunityIcon"));
var _Surface = _interopRequireDefault(require("./Surface"));
var _Text = _interopRequireDefault(require("./Typography/Text"));
var _theming = require("../core/theming");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DURATION_SHORT = 4000;
const DURATION_MEDIUM = 7000;
const DURATION_LONG = 10000;

/**
 * Snackbars provide brief feedback about an operation through a message rendered at the bottom of the container in which it's wrapped.
 *
 * Note: To display it as a popup, regardless of the parent's position, wrap it with a `Portal` component – refer to the example in the "More Examples` section.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { Button, Snackbar } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const onToggleSnackBar = () => setVisible(!visible);
 *
 *   const onDismissSnackBar = () => setVisible(false);
 *
 *   return (
 *     <View style={styles.container}>
 *       <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
 *       <Snackbar
 *         visible={visible}
 *         onDismiss={onDismissSnackBar}
 *         action={{
 *           label: 'Undo',
 *           onPress: () => {
 *             // Do something
 *           },
 *         }}>
 *         Hey there! I'm a Snackbar.
 *       </Snackbar>
 *     </View>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'space-between',
 *   },
 * });
 *
 * export default MyComponent;
 * ```
 */
const Snackbar = ({
  visible,
  action,
  icon,
  onIconPress,
  iconAccessibilityLabel = 'Close icon',
  duration = DURATION_MEDIUM,
  onDismiss,
  children,
  elevation = 2,
  style,
  wrapperStyle,
  contentStyle,
  theme: themeOverrides,
  maxFontSizeMultiplier,
  rippleColor,
  testID,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    bottom,
    right,
    left
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    current: opacity
  } = React.useRef(new _reactNative.Animated.Value(0.0));
  const hideTimeout = React.useRef(undefined);
  const [hidden, setHidden] = React.useState(!visible);
  const {
    scale
  } = theme.animation;
  const animateShow = (0, _useLatestCallback.default)(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    _reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 200 * scale,
      easing: _reactNative.Easing.out(_reactNative.Easing.ease),
      useNativeDriver: true
    }).start(({
      finished
    }) => {
      if (finished) {
        const isInfinity = duration === Number.POSITIVE_INFINITY || duration === Number.NEGATIVE_INFINITY;
        if (!isInfinity) {
          hideTimeout.current = setTimeout(onDismiss, duration);
        }
      }
    });
  });
  const handleOnVisible = (0, _useLatestCallback.default)(() => {
    // show
    setHidden(false);
  });
  const handleOnHidden = (0, _useLatestCallback.default)(() => {
    // hide
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    _reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 100 * scale,
      useNativeDriver: true
    }).start(({
      finished
    }) => {
      if (finished) {
        setHidden(true);
      }
    });
  });
  React.useEffect(() => {
    if (!hidden) {
      animateShow();
    }
  }, [animateShow, hidden]);
  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);
  React.useLayoutEffect(() => {
    if (visible) {
      handleOnVisible();
    } else {
      handleOnHidden();
    }
  }, [visible, handleOnVisible, handleOnHidden]);
  const {
    colors,
    roundness,
    isV3
  } = theme;
  if (hidden) {
    return null;
  }
  const {
    style: actionStyle,
    label: actionLabel,
    onPress: onPressAction,
    rippleColor: actionRippleColor,
    ...actionProps
  } = action || {};
  const buttonTextColor = isV3 ? colors.inversePrimary : colors.accent;
  const textColor = isV3 ? colors.inverseOnSurface : colors === null || colors === void 0 ? void 0 : colors.surface;
  const backgroundColor = isV3 ? colors.inverseSurface : colors === null || colors === void 0 ? void 0 : colors.onSurface;
  const isIconButton = isV3 && onIconPress;
  const marginLeft = action ? -12 : -16;
  const wrapperPaddings = {
    paddingBottom: bottom,
    paddingHorizontal: Math.max(left, right)
  };
  const renderChildrenWithWrapper = () => {
    if (typeof children === 'string') {
      return /*#__PURE__*/React.createElement(_Text.default, {
        variant: "bodyMedium",
        style: [styles.content, {
          color: textColor
        }],
        maxFontSizeMultiplier: maxFontSizeMultiplier
      }, children);
    }
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [styles.content, contentStyle]
    }, /*#__PURE__*/React.createElement(_reactNative.View, null, children));
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    pointerEvents: "box-none",
    style: [styles.wrapper, wrapperPaddings, wrapperStyle]
  }, /*#__PURE__*/React.createElement(_Surface.default, _extends({
    pointerEvents: "box-none",
    accessibilityLiveRegion: "polite",
    theme: theme,
    style: [!isV3 && styles.elevation, styles.container, {
      backgroundColor,
      borderRadius: roundness,
      opacity: opacity,
      transform: [{
        scale: visible ? opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1]
        }) : 1
      }]
    }, style],
    testID: testID,
    container: true
  }, isV3 && {
    elevation
  }, rest), renderChildrenWithWrapper(), (action || isIconButton) && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.actionsContainer, {
      marginLeft
    }]
  }, action ? /*#__PURE__*/React.createElement(_Button.default, _extends({
    onPress: event => {
      onPressAction === null || onPressAction === void 0 || onPressAction(event);
      onDismiss();
    },
    style: [styles.button, actionStyle],
    textColor: buttonTextColor,
    compact: !isV3,
    mode: "text",
    theme: theme,
    rippleColor: actionRippleColor
  }, actionProps), actionLabel) : null, isIconButton ? /*#__PURE__*/React.createElement(_IconButton.default, {
    accessibilityRole: "button",
    borderless: true,
    onPress: onIconPress,
    iconColor: theme.colors.inverseOnSurface,
    rippleColor: rippleColor,
    theme: theme,
    icon: icon || (({
      size,
      color
    }) => {
      return /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
        name: "close",
        color: color,
        size: size,
        direction: _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
      });
    }),
    accessibilityLabel: iconAccessibilityLabel,
    style: styles.icon,
    testID: `${testID}-icon`
  }) : null)));
};

/**
 * Show the Snackbar for a short duration.
 */
Snackbar.DURATION_SHORT = DURATION_SHORT;

/**
 * Show the Snackbar for a medium duration.
 */
Snackbar.DURATION_MEDIUM = DURATION_MEDIUM;

/**
 * Show the Snackbar for a long duration.
 */
Snackbar.DURATION_LONG = DURATION_LONG;
const styles = _reactNative.StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    borderRadius: 4,
    minHeight: 48
  },
  content: {
    marginHorizontal: 16,
    marginVertical: 14,
    flex: 1
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 48
  },
  button: {
    marginRight: 8,
    marginLeft: 4
  },
  elevation: {
    elevation: 6
  },
  icon: {
    width: 40,
    height: 40,
    margin: 0
  }
});
var _default = exports.default = Snackbar;
//# sourceMappingURL=Snackbar.js.map