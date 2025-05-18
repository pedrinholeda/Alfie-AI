"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _Text = _interopRequireDefault(require("./Text"));
var _theming = require("../../../core/theming");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const StyledText = ({
  alpha = 1,
  family,
  style,
  theme: themeOverrides,
  ...rest
}) => {
  var _theme$colors, _theme$fonts;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const textColor = (0, _color.default)(theme.isV3 ? theme.colors.onSurface : (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.text).alpha(alpha).rgb().string();
  const writingDirection = _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr';
  return /*#__PURE__*/React.createElement(_Text.default, _extends({}, rest, {
    style: [styles.text, {
      color: textColor,
      ...(!theme.isV3 && ((_theme$fonts = theme.fonts) === null || _theme$fonts === void 0 ? void 0 : _theme$fonts[family])),
      writingDirection
    }, style]
  }));
};
const styles = _reactNative.StyleSheet.create({
  text: {
    textAlign: 'left'
  }
});
var _default = exports.default = StyledText;
//# sourceMappingURL=StyledText.js.map