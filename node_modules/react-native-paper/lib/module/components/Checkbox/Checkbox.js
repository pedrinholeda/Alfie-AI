function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Platform } from 'react-native';
import CheckboxAndroid from './CheckboxAndroid';
import CheckboxIOS from './CheckboxIOS';
import { useInternalTheme } from '../../core/theming';
/**
 * Checkboxes allow the selection of multiple options from a set.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [checked, setChecked] = React.useState(false);
 *
 *   return (
 *     <Checkbox
 *       status={checked ? 'checked' : 'unchecked'}
 *       onPress={() => {
 *         setChecked(!checked);
 *       }}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const Checkbox = ({
  theme: themeOverrides,
  ...props
}) => {
  const theme = useInternalTheme(themeOverrides);
  return Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(CheckboxIOS, _extends({}, props, {
    theme: theme
  })) : /*#__PURE__*/React.createElement(CheckboxAndroid, _extends({}, props, {
    theme: theme
  }));
};
export default Checkbox;

// @component-docs ignore-next-line
const CheckboxWithTheme = Checkbox;
// @component-docs ignore-next-line
export { CheckboxWithTheme as Checkbox };
//# sourceMappingURL=Checkbox.js.map