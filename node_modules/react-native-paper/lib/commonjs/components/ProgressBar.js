"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../core/theming");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INDETERMINATE_DURATION = 2000;
const INDETERMINATE_MAX_WIDTH = 0.6;
const {
  isRTL
} = _reactNative.I18nManager;

/**
 * Progress bar is an indicator used to present progress of some activity in the app.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ProgressBar, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ProgressBar progress={0.5} color={MD3Colors.error50} />
 * );
 *
 * export default MyComponent;
 * ```
 */
const ProgressBar = ({
  color,
  indeterminate,
  progress = 0,
  visible = true,
  theme: themeOverrides,
  animatedValue,
  style,
  fillStyle,
  testID = 'progress-bar',
  ...rest
}) => {
  var _theme$colors;
  const isWeb = _reactNative.Platform.OS === 'web';
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    current: timer
  } = React.useRef(new _reactNative.Animated.Value(0));
  const {
    current: fade
  } = React.useRef(new _reactNative.Animated.Value(0));
  const passedAnimatedValue = React.useRef(animatedValue);
  const [width, setWidth] = React.useState(0);
  const [prevWidth, setPrevWidth] = React.useState(0);
  const indeterminateAnimation = React.useRef(null);
  const {
    scale
  } = theme.animation;
  React.useEffect(() => {
    passedAnimatedValue.current = animatedValue;
  });
  const startAnimation = React.useCallback(() => {
    // Show progress bar
    _reactNative.Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 1,
      useNativeDriver: true,
      isInteraction: false
    }).start();

    /**
     * We shouldn't add @param animatedValue to the
     * deps array, to avoid the unnecessary loop.
     * We can only check if the prop is passed initially,
     * and we do early return.
     */
    const externalAnimation = typeof passedAnimatedValue.current !== 'undefined' && passedAnimatedValue.current >= 0;
    if (externalAnimation) {
      return;
    }

    // Animate progress bar
    if (indeterminate) {
      if (!indeterminateAnimation.current) {
        indeterminateAnimation.current = _reactNative.Animated.timing(timer, {
          duration: INDETERMINATE_DURATION,
          toValue: 1,
          // Animated.loop does not work if useNativeDriver is true on web
          useNativeDriver: !isWeb,
          isInteraction: false
        });
      }

      // Reset timer to the beginning
      timer.setValue(0);
      _reactNative.Animated.loop(indeterminateAnimation.current).start();
    } else {
      _reactNative.Animated.timing(timer, {
        duration: 200 * scale,
        toValue: progress ? progress : 0,
        useNativeDriver: true,
        isInteraction: false
      }).start();
    }
  }, [fade, scale, indeterminate, timer, progress, isWeb]);
  const stopAnimation = React.useCallback(() => {
    // Stop indeterminate animation
    if (indeterminateAnimation.current) {
      indeterminateAnimation.current.stop();
    }
    _reactNative.Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false
    }).start();
  }, [fade, scale]);
  React.useEffect(() => {
    if (visible) startAnimation();else stopAnimation();
  }, [visible, startAnimation, stopAnimation]);
  React.useEffect(() => {
    if (animatedValue && animatedValue >= 0) {
      timer.setValue(animatedValue);
    }
  }, [animatedValue, timer]);
  React.useEffect(() => {
    // Start animation the very first time when previously the width was unclear
    if (visible && prevWidth === 0) {
      startAnimation();
    }
  }, [prevWidth, startAnimation, visible]);
  const onLayout = event => {
    setPrevWidth(width);
    setWidth(event.nativeEvent.layout.width);
  };
  const tintColor = color || ((_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.primary);
  const trackTintColor = theme.isV3 ? theme.colors.surfaceVariant : (0, _color.default)(tintColor).alpha(0.38).rgb().string();
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    onLayout: onLayout
  }, rest, {
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityState: {
      busy: visible
    },
    accessibilityValue: indeterminate ? {} : {
      min: 0,
      max: 100,
      now: Math.round(progress * 100)
    },
    style: isWeb && styles.webContainer,
    testID: testID
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.container, {
      backgroundColor: trackTintColor,
      opacity: fade
    }, style]
  }, width ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    testID: `${testID}-fill`,
    style: [styles.progressBar, {
      width,
      backgroundColor: tintColor,
      transform: [{
        translateX: timer.interpolate(indeterminate ? {
          inputRange: [0, 0.5, 1],
          outputRange: [(isRTL ? 1 : -1) * 0.5 * width, (isRTL ? 1 : -1) * 0.5 * INDETERMINATE_MAX_WIDTH * width, (isRTL ? -1 : 1) * 0.7 * width]
        } : {
          inputRange: [0, 1],
          outputRange: [(isRTL ? 1 : -1) * 0.5 * width, 0]
        })
      }, {
        // Workaround for workaround for https://github.com/facebook/react-native/issues/6278
        scaleX: timer.interpolate(indeterminate ? {
          inputRange: [0, 0.5, 1],
          outputRange: [0.0001, INDETERMINATE_MAX_WIDTH, 0.0001]
        } : {
          inputRange: [0, 1],
          outputRange: [0.0001, 1]
        })
      }]
    }, fillStyle]
  }) : null));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    height: 4,
    overflow: 'hidden'
  },
  webContainer: {
    width: '100%',
    height: '100%'
  },
  progressBar: {
    flex: 1
  }
});
var _default = exports.default = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map