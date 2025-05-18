function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet } from 'react-native';
import StyledText from './StyledText';
// @component-group Typography

/**
 * @deprecated Deprecated in v5.x - use `<Text variant="titleMedium" />` instead.
 * Typography component for showing a subheading.
 *
 * <div class="screenshots">
 *   <img src="screenshots/subheading.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Subheading } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Subheading>Subheading</Subheading>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Subheading = props => /*#__PURE__*/React.createElement(StyledText, _extends({}, props, {
  alpha: 0.87,
  family: "regular",
  style: [styles.text, props.style]
}));
export default Subheading;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 2,
    letterSpacing: 0.5
  }
});
//# sourceMappingURL=Subheading.js.map