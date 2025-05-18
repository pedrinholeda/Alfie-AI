function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Animated, I18nManager, StyleSheet } from 'react-native';
import { useInternalTheme } from '../../core/theming';
import { forwardRef } from '../../utils/forwardRef';
/**
 * Animated text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
const AnimatedText = forwardRef(function AnimatedText({
  style,
  theme: themeOverrides,
  variant,
  ...rest
}, ref) {
  const theme = useInternalTheme(themeOverrides);
  const writingDirection = I18nManager.getConstants().isRTL ? 'rtl' : 'ltr';
  if (theme.isV3 && variant) {
    const font = theme.fonts[variant];
    if (typeof font !== 'object') {
      throw new Error(`Variant ${variant} was not provided properly. Valid variants are ${Object.keys(theme.fonts).join(', ')}.`);
    }
    return /*#__PURE__*/React.createElement(Animated.Text, _extends({
      ref: ref
    }, rest, {
      style: [font, styles.text, {
        writingDirection,
        color: theme.colors.onSurface
      }, style]
    }));
  } else {
    const font = !theme.isV3 ? theme.fonts.regular : theme.fonts.bodyMedium;
    const textStyle = {
      ...font,
      color: theme.isV3 ? theme.colors.onSurface : theme.colors.text
    };
    return /*#__PURE__*/React.createElement(Animated.Text, _extends({
      ref: ref
    }, rest, {
      style: [styles.text, textStyle, {
        writingDirection
      }, style]
    }));
  }
});
const styles = StyleSheet.create({
  text: {
    textAlign: 'left'
  }
});
export const customAnimatedText = () => AnimatedText;
export default AnimatedText;
//# sourceMappingURL=AnimatedText.js.map