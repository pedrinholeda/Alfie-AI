function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { black } from '../styles/themes/v2/colors';
export const accessibilityProps = Platform.OS === 'web' ? {
  role: 'img',
  focusable: false
} : {
  accessibilityElementsHidden: true,
  importantForAccessibility: 'no-hide-descendants'
};

/**
 * Loads the appropriate icon module based on available dependencies
 */
const loadIconModule = () => {
  try {
    return require('@react-native-vector-icons/material-design-icons').default;
  } catch (e) {
    try {
      return require('@expo/vector-icons/MaterialCommunityIcons').default;
    } catch (e) {
      try {
        return require('react-native-vector-icons/MaterialCommunityIcons').default;
      } catch (e) {
        return null;
      }
    }
  }
};
const IconModule = loadIconModule();

/**
 * Fallback component displayed when no icon library is available
 */
const FallbackIcon = ({
  name,
  color,
  size,
  ...rest
}) => {
  console.warn(`Tried to use the icon '${name}' in a component from 'react-native-paper', but none of the required icon libraries are installed.`, `To fix this, please install one of the following:\n` + `- @expo/vector-icons\n` + `- @react-native-vector-icons/material-design-icons\n` + `- react-native-vector-icons\n\n` + `You can also use another method to specify icon: https://callstack.github.io/react-native-paper/docs/guides/icons`);
  return /*#__PURE__*/React.createElement(Text, _extends({}, rest, {
    style: [styles.icon, {
      color,
      fontSize: size
    }],
    selectable: false
  }), "\u25A1");
};
const MaterialCommunityIcons = IconModule || FallbackIcon;

/**
 * Default icon component that handles icon rendering with proper styling and accessibility
 */
const DefaultIcon = ({
  name,
  color = black,
  size,
  direction,
  allowFontScaling,
  testID
}) => {
  return /*#__PURE__*/React.createElement(MaterialCommunityIcons, _extends({
    allowFontScaling: allowFontScaling,
    name: name,
    color: color,
    size: size,
    style: [{
      transform: [{
        scaleX: direction === 'rtl' ? -1 : 1
      }],
      lineHeight: size
    }, styles.icon],
    pointerEvents: "none",
    selectable: false,
    testID: testID
  }, accessibilityProps));
};
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  icon: {
    backgroundColor: 'transparent'
  }
});
export default DefaultIcon;
//# sourceMappingURL=MaterialCommunityIcon.js.map