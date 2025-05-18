function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Animated, StyleSheet, useWindowDimensions } from 'react-native';
import { useInternalTheme } from '../core/theming';
import { black, white } from '../styles/themes/v2/colors';
import getContrastingColor from '../utils/getContrastingColor';
const defaultSize = 20;
/**
 * Badges are small status descriptors for UI elements.
 * A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Badge } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Badge>3</Badge>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Badge = ({
  children,
  size = defaultSize,
  style,
  theme: themeOverrides,
  visible = true,
  ...rest
}) => {
  var _theme$colors;
  const theme = useInternalTheme(themeOverrides);
  const {
    current: opacity
  } = React.useRef(new Animated.Value(visible ? 1 : 0));
  const {
    fontScale
  } = useWindowDimensions();
  const isFirstRendering = React.useRef(true);
  const {
    animation: {
      scale
    }
  } = theme;
  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150 * scale,
      useNativeDriver: true
    }).start();
  }, [visible, opacity, scale]);
  const {
    backgroundColor = theme.isV3 ? theme.colors.error : (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.notification,
    ...restStyle
  } = StyleSheet.flatten(style) || {};
  const textColor = theme.isV3 ? theme.colors.onError : getContrastingColor(backgroundColor, white, black);
  const borderRadius = size / 2;
  const paddingHorizontal = theme.isV3 ? 3 : 4;
  return /*#__PURE__*/React.createElement(Animated.Text, _extends({
    numberOfLines: 1,
    style: [{
      opacity,
      backgroundColor,
      color: textColor,
      fontSize: size * 0.5,
      ...(!theme.isV3 && theme.fonts.regular),
      lineHeight: size / fontScale,
      height: size,
      minWidth: size,
      borderRadius,
      paddingHorizontal
    }, styles.container, restStyle]
  }, rest), children);
};
export default Badge;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden'
  }
});
//# sourceMappingURL=Badge.js.map