function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { I18nManager, Platform, StyleSheet, TextInput, View } from 'react-native';
import color from 'color';
import ActivityIndicator from './ActivityIndicator';
import Divider from './Divider';
import IconButton from './IconButton/IconButton';
import MaterialCommunityIcon from './MaterialCommunityIcon';
import Surface from './Surface';
import { useInternalTheme } from '../core/theming';
import { forwardRef } from '../utils/forwardRef';
/**
 * Searchbar is a simple input box where users can type search queries.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Searchbar } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [searchQuery, setSearchQuery] = React.useState('');
 *
 *   return (
 *     <Searchbar
 *       placeholder="Search"
 *       onChangeText={setSearchQuery}
 *       value={searchQuery}
 *     />
 *   );
 * };
 *
 * export default MyComponent;

 * ```
 */
const Searchbar = forwardRef(({
  icon,
  iconColor: customIconColor,
  rippleColor: customRippleColor,
  onIconPress,
  searchAccessibilityLabel = 'search',
  clearIcon,
  clearAccessibilityLabel = 'clear',
  onClearIconPress,
  traileringIcon,
  traileringIconColor,
  traileringIconAccessibilityLabel,
  traileringRippleColor: customTraileringRippleColor,
  onTraileringIconPress,
  right,
  mode = 'bar',
  showDivider = true,
  inputStyle,
  placeholder,
  elevation = 0,
  style,
  theme: themeOverrides,
  value,
  loading = false,
  testID = 'search-bar',
  ...rest
}, ref) => {
  var _theme$colors, _theme$colors2;
  const theme = useInternalTheme(themeOverrides);
  const root = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      var _root$current;
      return (_root$current = root.current) === null || _root$current === void 0 ? void 0 : _root$current.focus();
    },
    clear: () => {
      var _root$current2;
      return (_root$current2 = root.current) === null || _root$current2 === void 0 ? void 0 : _root$current2.clear();
    },
    setNativeProps: args => {
      var _root$current3;
      return (_root$current3 = root.current) === null || _root$current3 === void 0 ? void 0 : _root$current3.setNativeProps(args);
    },
    isFocused: () => {
      var _root$current4;
      return ((_root$current4 = root.current) === null || _root$current4 === void 0 ? void 0 : _root$current4.isFocused()) || false;
    },
    blur: () => {
      var _root$current5;
      return (_root$current5 = root.current) === null || _root$current5 === void 0 ? void 0 : _root$current5.blur();
    },
    setSelection: (start, end) => {
      var _root$current6;
      return (_root$current6 = root.current) === null || _root$current6 === void 0 ? void 0 : _root$current6.setSelection(start, end);
    }
  }));
  const handleClearPress = e => {
    var _root$current7, _rest$onChangeText;
    (_root$current7 = root.current) === null || _root$current7 === void 0 || _root$current7.clear();
    (_rest$onChangeText = rest.onChangeText) === null || _rest$onChangeText === void 0 || _rest$onChangeText.call(rest, '');
    onClearIconPress === null || onClearIconPress === void 0 || onClearIconPress(e);
  };
  const {
    roundness,
    dark,
    isV3,
    fonts
  } = theme;
  const placeholderTextColor = isV3 ? theme.colors.onSurface : (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.placeholder;
  const textColor = isV3 ? theme.colors.onSurfaceVariant : theme.colors.text;
  const md2IconColor = dark ? textColor : color(textColor).alpha(0.54).rgb().string();
  const iconColor = customIconColor || (isV3 ? theme.colors.onSurfaceVariant : md2IconColor);
  const rippleColor = customRippleColor || color(textColor).alpha(0.32).rgb().string();
  const traileringRippleColor = customTraileringRippleColor || color(textColor).alpha(0.32).rgb().string();
  const font = isV3 ? {
    ...fonts.bodyLarge,
    lineHeight: Platform.select({
      ios: 0,
      default: fonts.bodyLarge.lineHeight
    })
  } : theme.fonts.regular;
  const isBarMode = isV3 && mode === 'bar';
  const shouldRenderTraileringIcon = isBarMode && traileringIcon && !loading && (!value || right !== undefined);
  return /*#__PURE__*/React.createElement(Surface, _extends({
    style: [{
      borderRadius: roundness
    }, !isV3 && styles.elevation, isV3 && {
      backgroundColor: theme.colors.elevation.level3,
      borderRadius: roundness * (isBarMode ? 7 : 0)
    }, styles.container, style],
    testID: `${testID}-container`
  }, theme.isV3 && {
    elevation
  }, {
    container: true,
    theme: theme
  }), /*#__PURE__*/React.createElement(IconButton, {
    accessibilityRole: "button",
    borderless: true,
    rippleColor: rippleColor,
    onPress: onIconPress,
    iconColor: iconColor,
    icon: icon || (({
      size,
      color
    }) => /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
      name: "magnify",
      color: color,
      size: size,
      direction: I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
    })),
    theme: theme,
    accessibilityLabel: searchAccessibilityLabel,
    testID: `${testID}-icon`
  }), /*#__PURE__*/React.createElement(TextInput, _extends({
    style: [styles.input, {
      color: textColor,
      ...font,
      ...Platform.select({
        web: {
          outline: 'none'
        }
      })
    }, isV3 && (isBarMode ? styles.barModeInput : styles.viewModeInput), inputStyle],
    placeholder: placeholder || '',
    placeholderTextColor: placeholderTextColor,
    selectionColor: (_theme$colors2 = theme.colors) === null || _theme$colors2 === void 0 ? void 0 : _theme$colors2.primary,
    underlineColorAndroid: "transparent",
    returnKeyType: "search",
    keyboardAppearance: dark ? 'dark' : 'light',
    accessibilityRole: "search",
    ref: root,
    value: value,
    testID: testID
  }, rest)), loading ? /*#__PURE__*/React.createElement(ActivityIndicator, {
    testID: "activity-indicator",
    style: isV3 ? styles.v3Loader : styles.loader
  }) :
  /*#__PURE__*/
  // Clear icon should be always rendered within Searchbar – it's transparent,
  // without touch events, when there is no value. It's done to avoid issues
  // with the abruptly stopping ripple effect and changing bar width on web,
  // when clearing the value.
  React.createElement(View, {
    pointerEvents: value ? 'auto' : 'none',
    testID: `${testID}-icon-wrapper`,
    style: [isV3 && !value && styles.v3ClearIcon, isV3 && right !== undefined && styles.v3ClearIconHidden]
  }, /*#__PURE__*/React.createElement(IconButton, {
    borderless: true,
    accessibilityLabel: clearAccessibilityLabel,
    iconColor: value ? iconColor : 'rgba(255, 255, 255, 0)',
    rippleColor: rippleColor,
    onPress: handleClearPress,
    icon: clearIcon || (({
      size,
      color
    }) => /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
      name: isV3 ? 'close' : 'close-circle-outline',
      color: color,
      size: size,
      direction: I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
    })),
    testID: `${testID}-clear-icon`,
    accessibilityRole: "button",
    theme: theme
  })), shouldRenderTraileringIcon ? /*#__PURE__*/React.createElement(IconButton, {
    accessibilityRole: "button",
    borderless: true,
    onPress: onTraileringIconPress,
    iconColor: traileringIconColor || theme.colors.onSurfaceVariant,
    rippleColor: traileringRippleColor,
    icon: traileringIcon,
    accessibilityLabel: traileringIconAccessibilityLabel,
    testID: `${testID}-trailering-icon`
  }) : null, isBarMode && (right === null || right === void 0 ? void 0 : right({
    color: textColor,
    style: styles.rightStyle,
    testID
  })), isV3 && !isBarMode && showDivider && /*#__PURE__*/React.createElement(Divider, {
    bold: true,
    style: [styles.divider, {
      backgroundColor: theme.colors.outline
    }],
    testID: `${testID}-divider`
  }));
});
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 8,
    alignSelf: 'stretch',
    textAlign: I18nManager.getConstants().isRTL ? 'right' : 'left',
    minWidth: 0
  },
  barModeInput: {
    paddingLeft: 0,
    minHeight: 56
  },
  viewModeInput: {
    paddingLeft: 0,
    minHeight: 72
  },
  elevation: {
    elevation: 4
  },
  loader: {
    margin: 10
  },
  v3Loader: {
    marginHorizontal: 16
  },
  rightStyle: {
    marginRight: 16
  },
  v3ClearIcon: {
    position: 'absolute',
    right: 0,
    marginLeft: 16
  },
  v3ClearIconHidden: {
    display: 'none'
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});
export default Searchbar;
//# sourceMappingURL=Searchbar.js.map