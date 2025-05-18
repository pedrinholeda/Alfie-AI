function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButtonContext } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
import { useInternalTheme } from '../../core/theming';
import { getSelectionControlIOSColor } from '../Checkbox/utils';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const RadioButtonIOS = ({
  disabled,
  onPress,
  theme: themeOverrides,
  status,
  value,
  testID,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  return /*#__PURE__*/React.createElement(RadioButtonContext.Consumer, null, context => {
    const checked = isChecked({
      contextValue: context === null || context === void 0 ? void 0 : context.value,
      status,
      value
    }) === 'checked';
    const {
      checkedColor,
      rippleColor
    } = getSelectionControlIOSColor({
      theme,
      disabled,
      customColor: rest.color
    });
    const opacity = checked ? 1 : 0;
    return /*#__PURE__*/React.createElement(TouchableRipple, _extends({}, rest, {
      borderless: true,
      rippleColor: rippleColor,
      onPress: disabled ? undefined : event => {
        handlePress({
          onPress,
          value,
          onValueChange: context === null || context === void 0 ? void 0 : context.onValueChange,
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
    }), /*#__PURE__*/React.createElement(View, {
      style: {
        opacity
      }
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
      allowFontScaling: false,
      name: "check",
      size: 24,
      color: checkedColor,
      direction: "ltr"
    })));
  });
};
RadioButtonIOS.displayName = 'RadioButton.IOS';
const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6
  }
});
export default RadioButtonIOS;

// @component-docs ignore-next-line
export { RadioButtonIOS };
//# sourceMappingURL=RadioButtonIOS.js.map