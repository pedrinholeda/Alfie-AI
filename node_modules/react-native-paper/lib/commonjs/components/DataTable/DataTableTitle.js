"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataTableTitle = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _theming = require("../../core/theming");
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
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

const DataTableTitle = ({
  numeric,
  children,
  onPress,
  sortDirection,
  textStyle,
  style,
  theme: themeOverrides,
  numberOfLines = 1,
  maxFontSizeMultiplier,
  ...rest
}) => {
  var _theme$colors;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    current: spinAnim
  } = React.useRef(new _reactNative.Animated.Value(sortDirection === 'ascending' ? 0 : 1));
  React.useEffect(() => {
    _reactNative.Animated.timing(spinAnim, {
      toValue: sortDirection === 'ascending' ? 0 : 1,
      duration: 150,
      useNativeDriver: true
    }).start();
  }, [sortDirection, spinAnim]);
  const textColor = theme.isV3 ? theme.colors.onSurface : theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.text;
  const alphaTextColor = (0, _color.default)(textColor).alpha(0.6).rgb().string();
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  const icon = sortDirection ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.icon, {
      transform: [{
        rotate: spin
      }]
    }]
  }, /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    name: "arrow-up",
    size: 16,
    color: textColor,
    direction: _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
  })) : null;
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, _extends({
    disabled: !onPress,
    onPress: onPress
  }, rest, {
    style: [styles.container, numeric && styles.right, style]
  }), icon, /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.cell,
    // height must scale with numberOfLines
    {
      maxHeight: 24 * _reactNative.PixelRatio.getFontScale() * numberOfLines
    },
    // if numberOfLines causes wrap, center is lost. Align directly, sensitive to numeric and RTL
    numberOfLines > 1 ? numeric ? _reactNative.I18nManager.getConstants().isRTL ? styles.leftText : styles.rightText : styles.centerText : {}, sortDirection ? styles.sorted : {
      color: alphaTextColor
    }, textStyle],
    numberOfLines: numberOfLines,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, children));
};
exports.DataTableTitle = DataTableTitle;
DataTableTitle.displayName = 'DataTable.Title';
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 12
  },
  rightText: {
    textAlign: 'right'
  },
  leftText: {
    textAlign: 'left'
  },
  centerText: {
    textAlign: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  },
  cell: {
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '500',
    alignItems: 'center'
  },
  sorted: {
    marginLeft: 8
  },
  icon: {
    height: 24,
    justifyContent: 'center'
  }
});
var _default = exports.default = DataTableTitle; // @component-docs ignore-next-line
//# sourceMappingURL=DataTableTitle.js.map