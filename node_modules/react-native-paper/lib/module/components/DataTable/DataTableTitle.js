function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Animated, I18nManager, PixelRatio, Pressable, StyleSheet } from 'react-native';
import color from 'color';
import { useInternalTheme } from '../../core/theming';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import Text from '../Typography/Text';
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
  const theme = useInternalTheme(themeOverrides);
  const {
    current: spinAnim
  } = React.useRef(new Animated.Value(sortDirection === 'ascending' ? 0 : 1));
  React.useEffect(() => {
    Animated.timing(spinAnim, {
      toValue: sortDirection === 'ascending' ? 0 : 1,
      duration: 150,
      useNativeDriver: true
    }).start();
  }, [sortDirection, spinAnim]);
  const textColor = theme.isV3 ? theme.colors.onSurface : theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.text;
  const alphaTextColor = color(textColor).alpha(0.6).rgb().string();
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  const icon = sortDirection ? /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.icon, {
      transform: [{
        rotate: spin
      }]
    }]
  }, /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
    name: "arrow-up",
    size: 16,
    color: textColor,
    direction: I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
  })) : null;
  return /*#__PURE__*/React.createElement(Pressable, _extends({
    disabled: !onPress,
    onPress: onPress
  }, rest, {
    style: [styles.container, numeric && styles.right, style]
  }), icon, /*#__PURE__*/React.createElement(Text, {
    style: [styles.cell,
    // height must scale with numberOfLines
    {
      maxHeight: 24 * PixelRatio.getFontScale() * numberOfLines
    },
    // if numberOfLines causes wrap, center is lost. Align directly, sensitive to numeric and RTL
    numberOfLines > 1 ? numeric ? I18nManager.getConstants().isRTL ? styles.leftText : styles.rightText : styles.centerText : {}, sortDirection ? styles.sorted : {
      color: alphaTextColor
    }, textStyle],
    numberOfLines: numberOfLines,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  }, children));
};
DataTableTitle.displayName = 'DataTable.Title';
const styles = StyleSheet.create({
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
export default DataTableTitle;

// @component-docs ignore-next-line
export { DataTableTitle };
//# sourceMappingURL=DataTableTitle.js.map