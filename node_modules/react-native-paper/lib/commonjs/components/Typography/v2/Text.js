"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../../core/theming");
var _forwardRef = require("../../../utils/forwardRef");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const theme = (0, _theming.useInternalTheme)(overrideTheme);
  React.useImperativeHandle(ref, () => ({
    setNativeProps: args => {
      var _root$current;
      return (_root$current = root.current) === null || _root$current === void 0 ? void 0 : _root$current.setNativeProps(args);
    }
  }));
  return /*#__PURE__*/React.createElement(_reactNative.Text, _extends({}, rest, {
    ref: root,
    style: [{
      ...(!theme.isV3 && ((_theme$fonts = theme.fonts) === null || _theme$fonts === void 0 ? void 0 : _theme$fonts.regular)),
      color: theme.isV3 ? (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.onSurface : theme.colors.text
    }, styles.text, style]
  }));
};
const styles = _reactNative.StyleSheet.create({
  text: {
    textAlign: 'left'
  }
});
var _default = exports.default = (0, _forwardRef.forwardRef)(Text);
//# sourceMappingURL=Text.js.map