function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedButtonItem from './SegmentedButtonItem';
import { getDisabledSegmentedButtonStyle } from './utils';
import { useInternalTheme } from '../../core/theming';
/**
 * Segmented buttons can be used to select options, switch views or sort elements.</br>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { SafeAreaView, StyleSheet } from 'react-native';
 * import { SegmentedButtons } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = React.useState('');
 *
 *   return (
 *     <SafeAreaView style={styles.container}>
 *       <SegmentedButtons
 *         value={value}
 *         onValueChange={setValue}
 *         buttons={[
 *           {
 *             value: 'walk',
 *             label: 'Walking',
 *           },
 *           {
 *             value: 'train',
 *             label: 'Transit',
 *           },
 *           { value: 'drive', label: 'Driving' },
 *         ]}
 *       />
 *     </SafeAreaView>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     alignItems: 'center',
 *   },
 * });
 *
 * export default MyComponent;
 *```
 */
const SegmentedButtons = ({
  value,
  onValueChange,
  buttons,
  multiSelect,
  density,
  style,
  theme: themeOverrides
}) => {
  const theme = useInternalTheme(themeOverrides);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.row, style]
  }, buttons.map((item, i) => {
    const disabledChildStyle = getDisabledSegmentedButtonStyle({
      theme,
      buttons,
      index: i
    });
    const segment = i === 0 ? 'first' : i === buttons.length - 1 ? 'last' : undefined;
    const checked = multiSelect && Array.isArray(value) ? value.includes(item.value) : value === item.value;
    const onPress = e => {
      var _item$onPress;
      (_item$onPress = item.onPress) === null || _item$onPress === void 0 || _item$onPress.call(item, e);
      const nextValue = multiSelect && Array.isArray(value) ? checked ? value.filter(val => item.value !== val) : [...value, item.value] : item.value;

      // @ts-expect-error: TS doesn't preserve types after destructuring, so the type isn't inferred correctly
      onValueChange(nextValue);
    };
    return /*#__PURE__*/React.createElement(SegmentedButtonItem, _extends({}, item, {
      key: i,
      checked: checked,
      segment: segment,
      density: density,
      onPress: onPress,
      style: [item.style, disabledChildStyle],
      labelStyle: item.labelStyle,
      theme: theme
    }));
  }));
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});
export default SegmentedButtons;

// @component-docs ignore-next-line
export { SegmentedButtons };
//# sourceMappingURL=SegmentedButtons.js.map