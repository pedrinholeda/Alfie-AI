"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CheckboxAndroid = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// From https://material.io/design/motion/speed.html#duration
const ANIMATION_DURATION = 100;

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const CheckboxAndroid = ({
  status,
  theme: themeOverrides,
  disabled,
  onPress,
  testID,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    current: scaleAnim
  } = React.useRef(new _reactNative.Animated.Value(1));
  const isFirstRendering = React.useRef(true);
  const {
    animation: {
      scale
    }
  } = theme;
  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    const checked = status === 'checked';
    _reactNative.Animated.sequence([_reactNative.Animated.timing(scaleAnim, {
      toValue: 0.85,
      duration: checked ? ANIMATION_DURATION * scale : 0,
      useNativeDriver: false
    }), _reactNative.Animated.timing(scaleAnim, {
      toValue: 1,
      duration: checked ? ANIMATION_DURATION * scale : ANIMATION_DURATION * scale * 1.75,
      useNativeDriver: false
    })]).start();
  }, [status, scaleAnim, scale]);
  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';
  const {
    rippleColor,
    selectionControlColor
  } = (0, _utils.getAndroidSelectionControlColor)({
    theme,
    disabled,
    checked,
    customColor: rest.color,
    customUncheckedColor: rest.uncheckedColor
  });
  const borderWidth = scaleAnim.interpolate({
    inputRange: [0.8, 1],
    outputRange: [7, 0]
  });
  const icon = indeterminate ? 'minus-box' : checked ? 'checkbox-marked' : 'checkbox-blank-outline';
  return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
    borderless: true,
    rippleColor: rippleColor,
    onPress: onPress,
    disabled: disabled,
    accessibilityRole: "checkbox",
    accessibilityState: {
      disabled,
      checked
    },
    accessibilityLiveRegion: "polite",
    style: styles.container,
    testID: testID,
    theme: theme
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        scale: scaleAnim
      }]
    }
  }, /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    allowFontScaling: false,
    name: icon,
    size: 24,
    color: selectionControlColor,
    direction: "ltr"
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.fillContainer]
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.fill, {
      borderColor: selectionControlColor
    }, {
      borderWidth
    }]
  }))));
};
exports.CheckboxAndroid = CheckboxAndroid;
CheckboxAndroid.displayName = 'Checkbox.Android';
const styles = _reactNative.StyleSheet.create({
  container: {
    borderRadius: 18,
    width: 36,
    height: 36,
    padding: 6
  },
  fillContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fill: {
    height: 14,
    width: 14
  }
});
var _default = exports.default = CheckboxAndroid; // @component-docs ignore-next-line
//# sourceMappingURL=CheckboxAndroid.js.map