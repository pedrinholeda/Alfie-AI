function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet } from 'react-native';
import color from 'color';
import { useInternalTheme } from '../../core/theming';
import Text from '../Typography/Text';
/**
 * A component used to display a header in lists.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List } from 'react-native-paper';
 *
 * const MyComponent = () => <List.Subheader>My List Title</List.Subheader>;
 *
 * export default MyComponent;
 * ```
 */
const ListSubheader = ({
  style,
  theme: overrideTheme,
  maxFontSizeMultiplier,
  ...rest
}) => {
  const theme = useInternalTheme(overrideTheme);
  const textColor = theme.isV3 ? theme.colors.onSurfaceVariant : color(theme.colors.text).alpha(0.54).rgb().string();
  const font = theme.isV3 ? theme.fonts.bodyMedium : theme.fonts.medium;
  return /*#__PURE__*/React.createElement(Text, _extends({
    variant: "bodyMedium",
    numberOfLines: 1,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, rest, {
    style: [styles.container, {
      color: textColor,
      ...font
    }, style]
  }));
};
ListSubheader.displayName = 'List.Subheader';
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 13
  }
});
export default ListSubheader;
//# sourceMappingURL=ListSubheader.js.map