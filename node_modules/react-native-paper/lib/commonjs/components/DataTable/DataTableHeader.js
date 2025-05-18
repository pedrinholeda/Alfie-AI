"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataTableHeader = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to display title in table header.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *       <DataTable>
 *         <DataTable.Header>
 *           <DataTable.Title
 *             sortDirection='descending'
 *           >
 *             Dessert
 *           </DataTable.Title>
 *           <DataTable.Title numeric>Calories</DataTable.Title>
 *           <DataTable.Title numeric>Fat (g)</DataTable.Title>
 *         </DataTable.Header>
 *       </DataTable>
 * );
 *
 * export default MyComponent;
 * ```
 */

const DataTableHeader = ({
  children,
  style,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const borderBottomColor = theme.isV3 ? theme.colors.surfaceVariant : (0, _color.default)(theme.dark ? _colors.white : _colors.black).alpha(0.12).rgb().string();
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, rest, {
    style: [styles.header, {
      borderBottomColor
    }, style]
  }), children);
};
exports.DataTableHeader = DataTableHeader;
DataTableHeader.displayName = 'DataTable.Header';
const styles = _reactNative.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth * 2
  }
});
var _default = exports.default = DataTableHeader; // @component-docs ignore-next-line
//# sourceMappingURL=DataTableHeader.js.map