"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
var _ActivityIndicator = _interopRequireDefault(require("../ActivityIndicator"));
var _CrossFadeIcon = _interopRequireDefault(require("../CrossFadeIcon"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PADDING = 8;
/**
 * An icon button is a button which displays only an icon without a label.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <IconButton
 *     icon="camera"
 *     iconColor={MD3Colors.error50}
 *     size={20}
 *     onPress={() => console.log('Pressed')}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const IconButton = (0, _forwardRef.forwardRef)(({
  icon,
  iconColor: customIconColor,
  containerColor: customContainerColor,
  rippleColor: customRippleColor,
  size = 24,
  accessibilityLabel,
  disabled,
  onPress,
  selected = false,
  animated = false,
  mode,
  style,
  theme: themeOverrides,
  testID = 'icon-button',
  loading = false,
  contentStyle,
  ...rest
}, ref) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    isV3
  } = theme;
  const IconComponent = animated ? _CrossFadeIcon.default : _Icon.default;
  const {
    iconColor,
    rippleColor,
    backgroundColor,
    borderColor
  } = (0, _utils.getIconButtonColor)({
    theme,
    disabled,
    selected,
    mode,
    customIconColor,
    customContainerColor,
    customRippleColor
  });
  const buttonSize = isV3 ? size + 2 * PADDING : size * 1.5;
  const {
    borderWidth = isV3 && mode === 'outlined' && !selected ? 1 : 0,
    borderRadius = buttonSize / 2
  } = _reactNative.StyleSheet.flatten(style) || {};
  const borderStyles = {
    borderWidth,
    borderRadius,
    borderColor
  };
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({
    ref: ref,
    testID: `${testID}-container`,
    style: [{
      backgroundColor,
      width: buttonSize,
      height: buttonSize
    }, styles.container, borderStyles, !isV3 && disabled && styles.disabled, style],
    container: true
  }, isV3 && {
    elevation: 0
  }), /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({
    borderless: true,
    centered: true,
    onPress: onPress,
    rippleColor: rippleColor,
    accessibilityLabel: accessibilityLabel,
    style: [styles.touchable, contentStyle]
    // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
    ,
    accessibilityTraits: disabled ? ['button', 'disabled'] : 'button',
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: {
      disabled
    },
    disabled: disabled,
    hitSlop: _TouchableRipple.default.supported ? {
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
    } : {
      top: 6,
      left: 6,
      bottom: 6,
      right: 6
    },
    testID: testID
  }, rest), loading ? /*#__PURE__*/React.createElement(_ActivityIndicator.default, {
    size: size,
    color: iconColor
  }) : /*#__PURE__*/React.createElement(IconComponent, {
    color: iconColor,
    source: icon,
    size: size
  })));
});
const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden',
    margin: 6,
    elevation: 0
  },
  touchable: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabled: {
    opacity: 0.32
  }
});
var _default = exports.default = IconButton;
//# sourceMappingURL=IconButton.js.map