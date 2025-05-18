"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _Icon = _interopRequireDefault(require("../Icon"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ICON_SIZE = 24;

/**
 * A component to show an icon in a list item.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <>
 *     <List.Icon color={MD3Colors.tertiary70} icon="folder" />
 *     <List.Icon color={MD3Colors.tertiary70} icon="equal" />
 *     <List.Icon color={MD3Colors.tertiary70} icon="calendar" />
 *   </>
 * );
 *
 * export default MyComponent;
 * ```
 */
const ListIcon = ({
  icon,
  color: iconColor,
  style,
  theme: themeOverrides
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [theme.isV3 ? styles.itemV3 : styles.item, style],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: ICON_SIZE,
    color: iconColor,
    theme: theme
  }));
};
const styles = _reactNative.StyleSheet.create({
  item: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemV3: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
ListIcon.displayName = 'List.Icon';
var _default = exports.default = ListIcon;
//# sourceMappingURL=ListIcon.js.map