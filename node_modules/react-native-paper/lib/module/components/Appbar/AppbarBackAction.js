function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import AppbarAction from './AppbarAction';
import AppbarBackIcon from './AppbarBackIcon';
import { forwardRef } from '../../utils/forwardRef';
/**
 * A component used to display a back button in the appbar.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *       <Appbar.BackAction onPress={() => {}} />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
const AppbarBackAction = forwardRef(({
  accessibilityLabel = 'Back',
  ...rest
}, ref) => /*#__PURE__*/React.createElement(AppbarAction, _extends({
  accessibilityLabel: accessibilityLabel
}, rest, {
  icon: AppbarBackIcon,
  isLeading: true,
  ref: ref
})));
AppbarBackAction.displayName = 'Appbar.BackAction';
export default AppbarBackAction;

// @component-docs ignore-next-line
export { AppbarBackAction };
//# sourceMappingURL=AppbarBackAction.js.map