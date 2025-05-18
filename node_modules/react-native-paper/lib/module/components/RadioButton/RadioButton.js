function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Platform } from 'react-native';
import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonIOS from './RadioButtonIOS';
import { useInternalTheme } from '../../core/theming';
/**
 * Radio buttons allow the selection a single option from a set.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { RadioButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [checked, setChecked] = React.useState('first');
 *
 *   return (
 *     <View>
 *       <RadioButton
 *         value="first"
 *         status={ checked === 'first' ? 'checked' : 'unchecked' }
 *         onPress={() => setChecked('first')}
 *       />
 *       <RadioButton
 *         value="second"
 *         status={ checked === 'second' ? 'checked' : 'unchecked' }
 *         onPress={() => setChecked('second')}
 *       />
 *     </View>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const RadioButton = ({
  theme: themeOverrides,
  ...props
}) => {
  const theme = useInternalTheme(themeOverrides);
  const Button = Platform.select({
    default: RadioButtonAndroid,
    ios: RadioButtonIOS
  });
  return /*#__PURE__*/React.createElement(Button, _extends({}, props, {
    theme: theme
  }));
};
export default RadioButton;
//# sourceMappingURL=RadioButton.js.map