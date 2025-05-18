"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CheckboxIOS = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const CheckboxIOS = ({
  status,
  disabled,
  onPress,
  theme: themeOverrides,
  testID,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';
  const {
    checkedColor,
    rippleColor
  } = (0, _utils.getSelectionControlIOSColor)({
    theme,
    disabled,
    customColor: rest.color
  });
  const icon = indeterminate ? 'minus' : 'check';
  const opacity = indeterminate || checked ? 1 : 0;
  return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
    borderless: true,
    rippleColor: rippleColor,
    onPress: onPress,
    disabled: disabled,
    accessibilityRole: "checkbox",
    accessibilityState: {
      disabled,
      checked
    },
    accessibilityLiveRegion: "polite",
    style: styles.container,
    testID: testID,
    theme: theme
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      opacity
    }
  }, /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    allowFontScaling: false,
    name: icon,
    size: 24,
    color: checkedColor,
    direction: "ltr"
  })));
};
exports.CheckboxIOS = CheckboxIOS;
CheckboxIOS.displayName = 'Checkbox.IOS';
const styles = _reactNative.StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6
  }
});
var _default = exports.default = CheckboxIOS; // @component-docs ignore-next-line
//# sourceMappingURL=CheckboxIOS.js.map