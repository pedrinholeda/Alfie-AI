"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../core/theming");
var _colors = require("../styles/themes/v2/colors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A divider is a thin, lightweight separator that groups content in lists and page layouts.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Divider, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Text>Lemon</Text>
 *     <Divider />
 *     <Text>Mango</Text>
 *     <Divider />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Divider = ({
  leftInset,
  horizontalInset = false,
  style,
  theme: themeOverrides,
  bold = false,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    dark: isDarkTheme,
    isV3
  } = theme;
  const dividerColor = isV3 ? theme.colors.outlineVariant : (0, _color.default)(isDarkTheme ? _colors.white : _colors.black).alpha(0.12).rgb().string();
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, rest, {
    style: [{
      height: _reactNative.StyleSheet.hairlineWidth,
      backgroundColor: dividerColor
    }, leftInset && (isV3 ? styles.v3LeftInset : styles.leftInset), isV3 && horizontalInset && styles.horizontalInset, isV3 && bold && styles.bold, style]
  }));
};
const styles = _reactNative.StyleSheet.create({
  leftInset: {
    marginLeft: 72
  },
  v3LeftInset: {
    marginLeft: 16
  },
  horizontalInset: {
    marginLeft: 16,
    marginRight: 16
  },
  bold: {
    height: 1
  }
});
var _default = exports.default = Divider;
//# sourceMappingURL=Divider.js.map