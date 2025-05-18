function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import color from 'color';
import { useInternalTheme } from '../../core/theming';
import { black } from '../../styles/themes/v2/colors';
import { forwardRef } from '../../utils/forwardRef';
import IconButton from '../IconButton/IconButton';
/**
 * A component used to display an action item in the appbar.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 * import { Platform } from 'react-native';
 *
 * const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *        <Appbar.Content title="Title" subtitle={'Subtitle'} />
 *         <Appbar.Action icon="magnify" onPress={() => {}} />
 *         <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
const AppbarAction = forwardRef(({
  size = 24,
  color: iconColor,
  icon,
  disabled,
  onPress,
  accessibilityLabel,
  isLeading,
  theme: themeOverrides,
  rippleColor,
  ...rest
}, ref) => {
  const theme = useInternalTheme(themeOverrides);
  const actionIconColor = iconColor ? iconColor : theme.isV3 ? isLeading ? theme.colors.onSurface : theme.colors.onSurfaceVariant : color(black).alpha(0.54).rgb().string();
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    size: size,
    onPress: onPress,
    iconColor: actionIconColor,
    icon: icon,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    animated: true,
    ref: ref,
    rippleColor: rippleColor
  }, rest));
});
AppbarAction.displayName = 'Appbar.Action';
export default AppbarAction;

// @component-docs ignore-next-line
export { AppbarAction };
//# sourceMappingURL=AppbarAction.js.map