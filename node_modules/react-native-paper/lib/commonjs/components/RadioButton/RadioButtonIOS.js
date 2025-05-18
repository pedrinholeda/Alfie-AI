"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadioButtonIOS = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _RadioButtonGroup = require("./RadioButtonGroup");
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _utils2 = require("../Checkbox/utils");
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const RadioButtonIOS = ({
  disabled,
  onPress,
  theme: themeOverrides,
  status,
  value,
  testID,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  return /*#__PURE__*/React.createElement(_RadioButtonGroup.RadioButtonContext.Consumer, null, context => {
    const checked = (0, _utils.isChecked)({
      contextValue: context === null || context === void 0 ? void 0 : context.value,
      status,
      value
    }) === 'checked';
    const {
      checkedColor,
      rippleColor
    } = (0, _utils2.getSelectionControlIOSColor)({
      theme,
      disabled,
      customColor: rest.color
    });
    const opacity = checked ? 1 : 0;
    return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
      borderless: true,
      rippleColor: rippleColor,
      onPress: disabled ? undefined : event => {
        (0, _utils.handlePress)({
          onPress,
          value,
          onValueChange: context === null || context === void 0 ? void 0 : context.onValueChange,
          event
        });
      },
      accessibilityRole: "radio",
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
      name: "check",
      size: 24,
      color: checkedColor,
      direction: "ltr"
    })));
  });
};
exports.RadioButtonIOS = RadioButtonIOS;
RadioButtonIOS.displayName = 'RadioButton.IOS';
const styles = _reactNative.StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6
  }
});
var _default = exports.default = RadioButtonIOS; // @component-docs ignore-next-line
//# sourceMappingURL=RadioButtonIOS.js.map