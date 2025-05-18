function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet } from 'react-native';
import StyledText from './StyledText';
// @component-group Typography

/**
 * @deprecated Deprecated in v5.x - use `<Text variant="titleLarge" />` instead.
 * Typography component for showing a title.
 *
 * <div class="screenshots">
 *   <img src="screenshots/title.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Title } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Title>Title</Title>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Title = props => /*#__PURE__*/React.createElement(StyledText, _extends({}, props, {
  alpha: 0.87,
  family: "medium",
  style: [styles.text, props.style]
}));
export default Title;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 30,
    marginVertical: 2,
    letterSpacing: 0.15
  }
});
//# sourceMappingURL=Title.js.map