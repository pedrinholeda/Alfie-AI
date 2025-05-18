function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useInternalTheme } from '../../core/theming';
import Text from '../Typography/Text';
import Title from '../Typography/v2/Title';
/**
 * A component to show a title in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Dialog, Portal, Text } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Title>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Text variant="bodyMedium">This is simple dialog</Text>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogTitle = ({
  children,
  theme: themeOverrides,
  style,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const {
    isV3,
    colors,
    fonts
  } = theme;
  const TextComponent = isV3 ? Text : Title;
  const headerTextStyle = {
    color: isV3 ? colors.onSurface : colors === null || colors === void 0 ? void 0 : colors.text,
    ...(isV3 ? fonts.headlineSmall : {})
  };
  return /*#__PURE__*/React.createElement(TextComponent, _extends({
    variant: "headlineSmall",
    accessibilityRole: "header",
    style: [styles.text, isV3 && styles.v3Text, headerTextStyle, style]
  }, rest), children);
};
DialogTitle.displayName = 'Dialog.Title';
const styles = StyleSheet.create({
  text: {
    marginTop: 22,
    marginBottom: 18,
    marginHorizontal: 24
  },
  v3Text: {
    marginTop: 16,
    marginBottom: 16
  }
});
export default DialogTitle;

// @component-docs ignore-next-line
export { DialogTitle };
//# sourceMappingURL=DialogTitle.js.map