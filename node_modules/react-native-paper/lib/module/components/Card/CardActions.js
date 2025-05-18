function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useInternalTheme } from '../../core/theming';
/**
 * A component to show a list of actions inside a Card.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Card, Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Actions>
 *       <Button>Cancel</Button>
 *       <Button>Ok</Button>
 *     </Card.Actions>
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 */
const CardActions = ({
  theme,
  style,
  children,
  ...rest
}) => {
  const {
    isV3
  } = useInternalTheme(theme);
  const justifyContent = isV3 ? 'flex-end' : 'flex-start';
  const containerStyle = [styles.container, {
    justifyContent
  }, style];
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
    style: containerStyle
  }), React.Children.map(children, (child, index) => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return child;
    }
    const compact = !isV3 && child.props.compact !== false;
    const mode = child.props.mode ?? (isV3 ? index === 0 ? 'outlined' : 'contained' : undefined);
    const childStyle = [isV3 && styles.button, child.props.style];
    return /*#__PURE__*/React.cloneElement(child, {
      ...child.props,
      compact,
      mode,
      style: childStyle
    });
  }));
};
CardActions.displayName = 'Card.Actions';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  button: {
    marginLeft: 8
  }
});
export default CardActions;
//# sourceMappingURL=CardActions.js.map