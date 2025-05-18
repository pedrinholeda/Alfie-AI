"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SegmentedButtons = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _SegmentedButtonItem = _interopRequireDefault(require("./SegmentedButtonItem"));
var _utils = require("./utils");
var _theming = require("../../core/theming");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.row, style]
  }, buttons.map((item, i) => {
    const disabledChildStyle = (0, _utils.getDisabledSegmentedButtonStyle)({
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
    return /*#__PURE__*/React.createElement(_SegmentedButtonItem.default, _extends({}, item, {
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
exports.SegmentedButtons = SegmentedButtons;
const styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});
var _default = exports.default = SegmentedButtons; // @component-docs ignore-next-line
//# sourceMappingURL=SegmentedButtons.js.map