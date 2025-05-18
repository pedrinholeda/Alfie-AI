"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppbarBackIcon = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AppbarBackIcon = ({
  size,
  color
}) => {
  const iosIconSize = size - 3;
  return _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.wrapper, {
      width: size,
      height: size,
      transform: [{
        scaleX: _reactNative.I18nManager.getConstants().isRTL ? -1 : 1
      }]
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.Image, {
    source: require('../../assets/back-chevron.png'),
    style: [styles.icon, {
      tintColor: color,
      width: iosIconSize,
      height: iosIconSize
    }],
    accessibilityIgnoresInvertColors: true
  })) : /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    name: "arrow-left",
    color: color,
    size: size,
    direction: _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
  });
};
exports.AppbarBackIcon = AppbarBackIcon;
const styles = _reactNative.StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    resizeMode: 'contain'
  }
});
var _default = exports.default = AppbarBackIcon; // @component-docs ignore-next-line
//# sourceMappingURL=AppbarBackIcon.js.map