function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ListSubheader from './ListSubheader';
import { useInternalTheme } from '../../core/theming';
/**
 * A component used to group list items.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <List.Section>
 *     <List.Subheader>Some title</List.Subheader>
 *     <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
 *     <List.Item
 *       title="Second Item"
 *       left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
 *     />
 *   </List.Section>
 * );
 *
 * export default MyComponent;
 * ```
 */
const ListSection = ({
  children,
  title,
  titleStyle,
  style,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const viewProps = {
    ...rest,
    theme
  };
  return /*#__PURE__*/React.createElement(View, _extends({}, viewProps, {
    style: [styles.container, style]
  }), title ? /*#__PURE__*/React.createElement(ListSubheader, {
    style: titleStyle,
    theme: theme
  }, title) : null, children);
};
ListSection.displayName = 'List.Section';
const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  }
});
export default ListSection;
//# sourceMappingURL=ListSection.js.map