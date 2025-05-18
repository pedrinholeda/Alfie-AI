"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadioButtonAndroid = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _RadioButtonGroup = require("./RadioButtonGroup");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _utils2 = require("../Checkbox/utils");
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BORDER_WIDTH = 2;

/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const RadioButtonAndroid = ({
  disabled,
  onPress,
  theme: themeOverrides,
  value,
  status,
  testID,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    current: borderAnim
  } = React.useRef(new _reactNative.Animated.Value(BORDER_WIDTH));
  const {
    current: radioAnim
  } = React.useRef(new _reactNative.Animated.Value(1));
  const isFirstRendering = React.useRef(true);
  const {
    scale
  } = theme.animation;
  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    if (status === 'checked') {
      radioAnim.setValue(1.2);
      _reactNative.Animated.timing(radioAnim, {
        toValue: 1,
        duration: 150 * scale,
        useNativeDriver: true
      }).start();
    } else {
      borderAnim.setValue(10);
      _reactNative.Animated.timing(borderAnim, {
        toValue: BORDER_WIDTH,
        duration: 150 * scale,
        useNativeDriver: false
      }).start();
    }
  }, [status, borderAnim, radioAnim, scale]);
  return /*#__PURE__*/React.createElement(_RadioButtonGroup.RadioButtonContext.Consumer, null, context => {
    const checked = (0, _utils.isChecked)({
      contextValue: context === null || context === void 0 ? void 0 : context.value,
      status,
      value
    }) === 'checked';
    const {
      rippleColor,
      selectionControlColor
    } = (0, _utils2.getAndroidSelectionControlColor)({
      theme,
      disabled,
      checked,
      customColor: rest.color,
      customUncheckedColor: rest.uncheckedColor
    });
    return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
      borderless: true,
      rippleColor: rippleColor,
      onPress: disabled ? undefined : event => {
        (0, _utils.handlePress)({
          onPress,
          onValueChange: context === null || context === void 0 ? void 0 : context.onValueChange,
          value,
          event
        });
      },
      accessibilityRole: "radio",
      accessibilityState: {
        disabled,
        checked
      },
      accessibilityLiveRegion: "polite",
      style: styles.container,
      testID: testID,
      theme: theme
    }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
      style: [styles.radio, {
        borderColor: selectionControlColor,
        borderWidth: borderAnim
      }]
    }, checked ? /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [_reactNative.StyleSheet.absoluteFill, styles.radioContainer]
    }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
      style: [styles.dot, {
        backgroundColor: selectionControlColor,
        transform: [{
          scale: radioAnim
        }]
      }]
    })) : null));
  });
};
exports.RadioButtonAndroid = RadioButtonAndroid;
RadioButtonAndroid.displayName = 'RadioButton.Android';
const styles = _reactNative.StyleSheet.create({
  container: {
    borderRadius: 18
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5
  }
});
var _default = exports.default = RadioButtonAndroid; // @component-docs ignore-next-line
//# sourceMappingURL=RadioButtonAndroid.js.map