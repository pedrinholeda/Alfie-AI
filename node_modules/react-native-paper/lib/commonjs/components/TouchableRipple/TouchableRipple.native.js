"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Pressable = require("./Pressable");
var _utils = require("./utils");
var _settings = require("../../core/settings");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
var _hasTouchHandler = _interopRequireDefault(require("../../utils/hasTouchHandler"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_VERSION_PIE = 28;
const TouchableRipple = ({
  style,
  background,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  underlayColor,
  children,
  theme: themeOverrides,
  ...rest
}, ref) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    rippleEffectEnabled
  } = React.useContext(_settings.SettingsContext);
  const {
    onPress,
    onLongPress,
    onPressIn,
    onPressOut
  } = rest;
  const hasPassedTouchHandler = (0, _hasTouchHandler.default)({
    onPress,
    onLongPress,
    onPressIn,
    onPressOut
  });
  const disabled = disabledProp || !hasPassedTouchHandler;
  const {
    calculatedRippleColor,
    calculatedUnderlayColor
  } = (0, _utils.getTouchableRippleColors)({
    theme,
    rippleColor,
    underlayColor
  });

  // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
  // https://github.com/facebook/react-native/issues/6480
  const useForeground = _reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= ANDROID_VERSION_PIE && borderless;
  if (TouchableRipple.supported) {
    const androidRipple = rippleEffectEnabled ? background ?? {
      color: calculatedRippleColor,
      borderless,
      foreground: useForeground
    } : undefined;
    return /*#__PURE__*/React.createElement(_Pressable.Pressable, _extends({}, rest, {
      ref: ref,
      disabled: disabled,
      style: [borderless && styles.overflowHidden, style],
      android_ripple: androidRipple
    }), React.Children.only(children));
  }
  return /*#__PURE__*/React.createElement(_Pressable.Pressable, _extends({}, rest, {
    ref: ref,
    disabled: disabled,
    style: [borderless && styles.overflowHidden, style]
  }), ({
    pressed
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, pressed && rippleEffectEnabled && /*#__PURE__*/React.createElement(_reactNative.View, {
    testID: "touchable-ripple-underlay",
    style: [styles.underlay, {
      backgroundColor: calculatedUnderlayColor
    }]
  }), React.Children.only(children)));
};
TouchableRipple.supported = _reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= ANDROID_VERSION_LOLLIPOP;
const styles = _reactNative.StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden'
  },
  underlay: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    zIndex: 2
  }
});
const Component = (0, _forwardRef.forwardRef)(TouchableRipple);
var _default = exports.default = Component;
//# sourceMappingURL=TouchableRipple.native.js.map