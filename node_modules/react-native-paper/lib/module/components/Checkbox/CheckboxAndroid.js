function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { getAndroidSelectionControlColor } from './utils';
import { useInternalTheme } from '../../core/theming';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
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
  const theme = useInternalTheme(themeOverrides);
  const {
    current: scaleAnim
  } = React.useRef(new Animated.Value(1));
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
    Animated.sequence([Animated.timing(scaleAnim, {
      toValue: 0.85,
      duration: checked ? ANIMATION_DURATION * scale : 0,
      useNativeDriver: false
    }), Animated.timing(scaleAnim, {
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
  } = getAndroidSelectionControlColor({
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
  return /*#__PURE__*/React.createElement(TouchableRipple, _extends({}, rest, {
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
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        scale: scaleAnim
      }]
    }
  }, /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
    allowFontScaling: false,
    name: icon,
    size: 24,
    color: selectionControlColor,
    direction: "ltr"
  }), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.fillContainer]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.fill, {
      borderColor: selectionControlColor
    }, {
      borderWidth
    }]
  }))));
};
CheckboxAndroid.displayName = 'Checkbox.Android';
const styles = StyleSheet.create({
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
export default CheckboxAndroid;

// @component-docs ignore-next-line
export { CheckboxAndroid };
//# sourceMappingURL=CheckboxAndroid.js.map