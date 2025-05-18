function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import color from 'color';
import { useInternalTheme } from '../../core/theming';
import { MD3Colors } from '../../styles/themes/v3/tokens';
import Divider from '../Divider';
import Text from '../Typography/Text';
/**
 * A component to group content inside a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [active, setActive] = React.useState('');
 *
 *   return (
 *     <Drawer.Section title="Some title">
 *       <Drawer.Item
 *         label="First Item"
 *         active={active === 'first'}
 *         onPress={() => setActive('first')}
 *       />
 *       <Drawer.Item
 *         label="Second Item"
 *         active={active === 'second'}
 *         onPress={() => setActive('second')}
 *       />
 *     </Drawer.Section>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DrawerSection = ({
  children,
  title,
  theme: themeOverrides,
  style,
  showDivider = true,
  titleMaxFontSizeMultiplier,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const {
    isV3
  } = theme;
  const titleColor = isV3 ? theme.colors.onSurfaceVariant : color(theme.colors.text).alpha(0.54).rgb().string();
  const titleMargin = isV3 ? 28 : 16;
  const font = isV3 ? theme.fonts.titleSmall : theme.fonts.medium;
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [styles.container, style]
  }, rest), title && /*#__PURE__*/React.createElement(View, {
    style: [styles.titleContainer, isV3 && styles.v3TitleContainer]
  }, title && /*#__PURE__*/React.createElement(Text, {
    variant: "titleSmall",
    numberOfLines: 1,
    style: [{
      color: titleColor,
      marginLeft: titleMargin,
      ...font
    }],
    maxFontSizeMultiplier: titleMaxFontSizeMultiplier
  }, title)), children, showDivider && /*#__PURE__*/React.createElement(Divider, _extends({}, isV3 && {
    horizontalInset: true,
    bold: true
  }, {
    style: [styles.divider, isV3 && styles.v3Divider],
    theme: theme
  })));
};
DrawerSection.displayName = 'Drawer.Section';
const styles = StyleSheet.create({
  container: {
    marginBottom: 4
  },
  titleContainer: {
    height: 40,
    justifyContent: 'center'
  },
  v3TitleContainer: {
    height: 56
  },
  divider: {
    marginTop: 4
  },
  v3Divider: {
    backgroundColor: MD3Colors.neutralVariant50
  }
});
export default DrawerSection;
//# sourceMappingURL=DrawerSection.js.map