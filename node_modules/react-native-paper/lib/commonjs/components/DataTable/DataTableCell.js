"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show a single cell inside of a table.
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
 * If you want to support multiline text, please use View instead, as multiline text doesn't comply with
 * MD Guidelines (https://github.com/callstack/react-native-paper/issues/2381).
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const DataTableCell = ({
  children,
  textStyle,
  style,
  numeric,
  maxFontSizeMultiplier,
  testID,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
    testID: testID,
    style: [styles.container, numeric && styles.right, style]
  }), /*#__PURE__*/React.createElement(CellContent, {
    textStyle: textStyle,
    testID: testID,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, children));
};
const CellContent = ({
  children,
  textStyle,
  maxFontSizeMultiplier,
  testID
}) => {
  if (/*#__PURE__*/React.isValidElement(children)) {
    return children;
  }
  return /*#__PURE__*/React.createElement(_Text.default, {
    style: textStyle,
    numberOfLines: 1,
    maxFontSizeMultiplier: maxFontSizeMultiplier,
    testID: `${testID}-text-container`
  }, children);
};
DataTableCell.displayName = 'DataTable.Cell';
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  }
});
var _default = exports.default = DataTableCell;
//# sourceMappingURL=DataTableCell.js.map