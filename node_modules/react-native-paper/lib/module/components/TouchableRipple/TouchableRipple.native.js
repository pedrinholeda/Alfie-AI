function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Pressable } from './Pressable';
import { getTouchableRippleColors } from './utils';
import { SettingsContext } from '../../core/settings';
import { useInternalTheme } from '../../core/theming';
import { forwardRef } from '../../utils/forwardRef';
import hasTouchHandler from '../../utils/hasTouchHandler';
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
  const theme = useInternalTheme(themeOverrides);
  const {
    rippleEffectEnabled
  } = React.useContext(SettingsContext);
  const {
    onPress,
    onLongPress,
    onPressIn,
    onPressOut
  } = rest;
  const hasPassedTouchHandler = hasTouchHandler({
    onPress,
    onLongPress,
    onPressIn,
    onPressOut
  });
  const disabled = disabledProp || !hasPassedTouchHandler;
  const {
    calculatedRippleColor,
    calculatedUnderlayColor
  } = getTouchableRippleColors({
    theme,
    rippleColor,
    underlayColor
  });

  // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
  // https://github.com/facebook/react-native/issues/6480
  const useForeground = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE && borderless;
  if (TouchableRipple.supported) {
    const androidRipple = rippleEffectEnabled ? background ?? {
      color: calculatedRippleColor,
      borderless,
      foreground: useForeground
    } : undefined;
    return /*#__PURE__*/React.createElement(Pressable, _extends({}, rest, {
      ref: ref,
      disabled: disabled,
      style: [borderless && styles.overflowHidden, style],
      android_ripple: androidRipple
    }), React.Children.only(children));
  }
  return /*#__PURE__*/React.createElement(Pressable, _extends({}, rest, {
    ref: ref,
    disabled: disabled,
    style: [borderless && styles.overflowHidden, style]
  }), ({
    pressed
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, pressed && rippleEffectEnabled && /*#__PURE__*/React.createElement(View, {
    testID: "touchable-ripple-underlay",
    style: [styles.underlay, {
      backgroundColor: calculatedUnderlayColor
    }]
  }), React.Children.only(children)));
};
TouchableRipple.supported = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;
const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden'
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2
  }
});
const Component = forwardRef(TouchableRipple);
export default Component;
//# sourceMappingURL=TouchableRipple.native.js.map