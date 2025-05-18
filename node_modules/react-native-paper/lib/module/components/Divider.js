function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import color from 'color';
import { useInternalTheme } from '../core/theming';
import { black, white } from '../styles/themes/v2/colors';
/**
 * A divider is a thin, lightweight separator that groups content in lists and page layouts.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Divider, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Text>Lemon</Text>
 *     <Divider />
 *     <Text>Mango</Text>
 *     <Divider />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Divider = ({
  leftInset,
  horizontalInset = false,
  style,
  theme: themeOverrides,
  bold = false,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const {
    dark: isDarkTheme,
    isV3
  } = theme;
  const dividerColor = isV3 ? theme.colors.outlineVariant : color(isDarkTheme ? white : black).alpha(0.12).rgb().string();
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
    style: [{
      height: StyleSheet.hairlineWidth,
      backgroundColor: dividerColor
    }, leftInset && (isV3 ? styles.v3LeftInset : styles.leftInset), isV3 && horizontalInset && styles.horizontalInset, isV3 && bold && styles.bold, style]
  }));
};
const styles = StyleSheet.create({
  leftInset: {
    marginLeft: 72
  },
  v3LeftInset: {
    marginLeft: 16
  },
  horizontalInset: {
    marginLeft: 16,
    marginRight: 16
  },
  bold: {
    height: 1
  }
});
export default Divider;
//# sourceMappingURL=Divider.js.map