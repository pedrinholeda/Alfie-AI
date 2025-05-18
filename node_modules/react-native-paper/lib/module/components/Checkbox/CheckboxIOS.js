function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { getSelectionControlIOSColor } from './utils';
import { useInternalTheme } from '../../core/theming';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const CheckboxIOS = ({
  status,
  disabled,
  onPress,
  theme: themeOverrides,
  testID,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';
  const {
    checkedColor,
    rippleColor
  } = getSelectionControlIOSColor({
    theme,
    disabled,
    customColor: rest.color
  });
  const icon = indeterminate ? 'minus' : 'check';
  const opacity = indeterminate || checked ? 1 : 0;
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
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      opacity
    }
  }, /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
    allowFontScaling: false,
    name: icon,
    size: 24,
    color: checkedColor,
    direction: "ltr"
  })));
};
CheckboxIOS.displayName = 'Checkbox.IOS';
const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6
  }
});
export default CheckboxIOS;

// @component-docs ignore-next-line
export { CheckboxIOS };
//# sourceMappingURL=CheckboxIOS.js.map