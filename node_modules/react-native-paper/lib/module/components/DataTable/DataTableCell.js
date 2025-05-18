function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet } from 'react-native';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import Text from '../Typography/Text';
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
  return /*#__PURE__*/React.createElement(TouchableRipple, _extends({}, rest, {
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
  return /*#__PURE__*/React.createElement(Text, {
    style: textStyle,
    numberOfLines: 1,
    maxFontSizeMultiplier: maxFontSizeMultiplier,
    testID: `${testID}-text-container`
  }, children);
};
DataTableCell.displayName = 'DataTable.Cell';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  }
});
export default DataTableCell;
//# sourceMappingURL=DataTableCell.js.map