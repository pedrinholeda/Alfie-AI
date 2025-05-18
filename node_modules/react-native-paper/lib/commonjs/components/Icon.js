"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidIcon = exports.isEqualIcon = exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialCommunityIcon = require("./MaterialCommunityIcon");
var _settings = require("../core/settings");
var _theming = require("../core/theming");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isImageSource = source =>
// source is an object with uri
typeof source === 'object' && source !== null && Object.prototype.hasOwnProperty.call(source, 'uri') && typeof source.uri === 'string' ||
// source is a module, e.g. - require('image')
typeof source === 'number' ||
// image url on web
_reactNative.Platform.OS === 'web' && typeof source === 'string' && (source.startsWith('data:image') || /\.(bmp|jpg|jpeg|png|gif|svg)$/.test(source));
const getIconId = source => {
  if (typeof source === 'object' && source !== null && Object.prototype.hasOwnProperty.call(source, 'uri') && typeof source.uri === 'string') {
    return source.uri;
  }
  return source;
};
const isValidIcon = source => typeof source === 'string' || typeof source === 'function' || isImageSource(source);
exports.isValidIcon = isValidIcon;
const isEqualIcon = (a, b) => a === b || getIconId(a) === getIconId(b);
exports.isEqualIcon = isEqualIcon;
/**
 * An icon component which renders icon from vector library.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Icon, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Icon
 *     source="camera"
 *     color={MD3Colors.error50}
 *     size={20}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 */

const Icon = ({
  source,
  color,
  size,
  theme: themeOverrides,
  testID,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const direction = typeof source === 'object' && source.direction && source.source ? source.direction === 'auto' ? _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr' : source.direction : null;
  const s = typeof source === 'object' && source.direction && source.source ? source.source : source;
  const iconColor = color || (theme.isV3 ? theme.colors.onSurface : theme.colors.text);
  if (isImageSource(s)) {
    return /*#__PURE__*/React.createElement(_reactNative.Image, _extends({}, rest, {
      testID: testID,
      source: s,
      style: [{
        transform: [{
          scaleX: direction === 'rtl' ? -1 : 1
        }]
      }, {
        width: size,
        height: size,
        tintColor: color,
        resizeMode: `contain`
      }]
    }, _MaterialCommunityIcon.accessibilityProps, {
      accessibilityIgnoresInvertColors: true
    }));
  } else if (typeof s === 'string') {
    return /*#__PURE__*/React.createElement(_settings.Consumer, null, ({
      icon
    }) => {
      return icon === null || icon === void 0 ? void 0 : icon({
        name: s,
        color: iconColor,
        size,
        direction,
        testID
      });
    });
  } else if (typeof s === 'function') {
    return s({
      color: iconColor,
      size,
      direction,
      testID
    });
  }
  return null;
};
var _default = exports.default = Icon;
//# sourceMappingURL=Icon.js.map