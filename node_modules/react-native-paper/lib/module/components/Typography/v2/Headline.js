function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet } from 'react-native';
import StyledText from './StyledText';
// @component-group Typography

/**
 * @deprecated Deprecated in v5.x - use `<Text variant="headlineSmall" />` instead.
 * Typography component for showing a headline.
 *
 * <div class="screenshots">
 *   <img src="screenshots/headline.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Headline } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Headline>Headline</Headline>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Headline = props => {
  return /*#__PURE__*/React.createElement(StyledText, _extends({}, props, {
    alpha: 0.87,
    family: "regular",
    style: [styles.text, props.style]
  }));
};
export default Headline;
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight: 32,
    marginVertical: 2,
    letterSpacing: 0
  }
});
//# sourceMappingURL=Headline.js.map