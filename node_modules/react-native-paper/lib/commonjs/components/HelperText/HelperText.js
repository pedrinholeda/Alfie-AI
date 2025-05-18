"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _AnimatedText = _interopRequireDefault(require("../Typography/AnimatedText"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Helper text is used in conjuction with input elements to provide additional hints for the user.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { HelperText, TextInput } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [text, setText] = React.useState('');
 *
 *    const onChangeText = text => setText(text);
 *
 *   const hasErrors = () => {
 *     return !text.includes('@');
 *   };
 *
 *  return (
 *     <View>
 *       <TextInput label="Email" value={text} onChangeText={onChangeText} />
 *       <HelperText type="error" visible={hasErrors()}>
 *         Email address is invalid!
 *       </HelperText>
 *     </View>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const HelperText = ({
  style,
  type = 'info',
  visible = true,
  theme: themeOverrides,
  onLayout,
  padding = 'normal',
  disabled,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    current: shown
  } = React.useRef(new _reactNative.Animated.Value(visible ? 1 : 0));
  let {
    current: textHeight
  } = React.useRef(0);
  const {
    scale
  } = theme.animation;
  const {
    maxFontSizeMultiplier = 1.5
  } = rest;
  React.useEffect(() => {
    if (visible) {
      // show text
      _reactNative.Animated.timing(shown, {
        toValue: 1,
        duration: 150 * scale,
        useNativeDriver: true
      }).start();
    } else {
      // hide text
      _reactNative.Animated.timing(shown, {
        toValue: 0,
        duration: 180 * scale,
        useNativeDriver: true
      }).start();
    }
  }, [visible, scale, shown]);
  const handleTextLayout = e => {
    onLayout === null || onLayout === void 0 || onLayout(e);
    textHeight = e.nativeEvent.layout.height;
  };
  const textColor = (0, _utils.getTextColor)({
    theme,
    disabled,
    type
  });
  return /*#__PURE__*/React.createElement(_AnimatedText.default, _extends({
    onLayout: handleTextLayout,
    style: [styles.text, padding !== 'none' ? styles.padding : {}, {
      color: textColor,
      opacity: shown,
      transform: visible && type === 'error' ? [{
        translateY: shown.interpolate({
          inputRange: [0, 1],
          outputRange: [-textHeight / 2, 0]
        })
      }] : []
    }, style],
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, rest), rest.children);
};
const styles = _reactNative.StyleSheet.create({
  text: {
    fontSize: 12,
    paddingVertical: 4
  },
  padding: {
    paddingHorizontal: 12
  }
});
var _default = exports.default = HelperText;
//# sourceMappingURL=HelperText.js.map