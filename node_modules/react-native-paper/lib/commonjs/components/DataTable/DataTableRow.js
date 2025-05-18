"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataTableRow = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show a single row inside of a table.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *      <DataTable.Row>
 *        <DataTable.Cell numeric>1</DataTable.Cell>
 *        <DataTable.Cell numeric>2</DataTable.Cell>
 *        <DataTable.Cell numeric>3</DataTable.Cell>
 *        <DataTable.Cell numeric>4</DataTable.Cell>
 *      </DataTable.Row>
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const DataTableRow = ({
  onPress,
  style,
  children,
  pointerEvents,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const borderBottomColor = theme.isV3 ? theme.colors.surfaceVariant : (0, _color.default)(theme.dark ? _colors.white : _colors.black).alpha(0.12).rgb().string();
  return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
    onPress: onPress,
    style: [styles.container, {
      borderBottomColor
    }, style]
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.content,
    pointerEvents: pointerEvents
  }, children));
};
exports.DataTableRow = DataTableRow;
DataTableRow.displayName = 'DataTable.Row';
const styles = _reactNative.StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    minHeight: 48,
    paddingHorizontal: 16
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  }
});
var _default = exports.default = DataTableRow; // @component-docs ignore-next-line
//# sourceMappingURL=DataTableRow.js.map