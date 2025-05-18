function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';
import { useInternalTheme } from '../../../core/theming';
import { forwardRef } from '../../../utils/forwardRef';
// @component-group Typography

/**
 * Text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
const Text = ({
  style,
  theme: overrideTheme,
  ...rest
}, ref) => {
  var _theme$fonts, _theme$colors;
  const root = React.useRef(null);
  const theme = useInternalTheme(overrideTheme);
  React.useImperativeHandle(ref, () => ({
    setNativeProps: args => {
      var _root$current;
      return (_root$current = root.current) === null || _root$current === void 0 ? void 0 : _root$current.setNativeProps(args);
    }
  }));
  return /*#__PURE__*/React.createElement(NativeText, _extends({}, rest, {
    ref: root,
    style: [{
      ...(!theme.isV3 && ((_theme$fonts = theme.fonts) === null || _theme$fonts === void 0 ? void 0 : _theme$fonts.regular)),
      color: theme.isV3 ? (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.onSurface : theme.colors.text
    }, styles.text, style]
  }));
};
const styles = StyleSheet.create({
  text: {
    textAlign: 'left'
  }
});
export default forwardRef(Text);
//# sourceMappingURL=Text.js.map