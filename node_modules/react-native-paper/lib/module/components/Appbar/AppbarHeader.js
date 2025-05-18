function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar } from './Appbar';
import { DEFAULT_APPBAR_HEIGHT, getAppbarBackgroundColor, modeAppbarHeight, getAppbarBorders } from './utils';
import { useInternalTheme } from '../../core/theming';
import shadow from '../../styles/shadow';
/**
 * A component to use as a header at the top of the screen.
 * It can contain the screen title, controls such as navigation buttons, menu button etc.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const _goBack = () => console.log('Went back');
 *
 *   const _handleSearch = () => console.log('Searching');
 *
 *   const _handleMore = () => console.log('Shown more');
 *
 *   return (
 *     <Appbar.Header>
 *       <Appbar.BackAction onPress={_goBack} />
 *       <Appbar.Content title="Title" />
 *       <Appbar.Action icon="magnify" onPress={_handleSearch} />
 *       <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
 *     </Appbar.Header>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const AppbarHeader = ({
  // Don't use default props since we check it to know whether we should use SafeAreaView
  statusBarHeight,
  style,
  dark,
  mode = Platform.OS === 'ios' ? 'center-aligned' : 'small',
  elevated = false,
  theme: themeOverrides,
  testID = 'appbar-header',
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const {
    isV3
  } = theme;
  const flattenedStyle = StyleSheet.flatten(style);
  const {
    height = isV3 ? modeAppbarHeight[mode] : DEFAULT_APPBAR_HEIGHT,
    elevation = isV3 ? elevated ? 2 : 0 : 4,
    backgroundColor: customBackground,
    zIndex = isV3 && elevated ? 1 : 0,
    ...restStyle
  } = flattenedStyle || {};
  const borderRadius = getAppbarBorders(restStyle);
  const backgroundColor = getAppbarBackgroundColor(theme, elevation, customBackground, elevated);
  const {
    top,
    left,
    right
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(View, {
    testID: `${testID}-root-layer`,
    style: [{
      backgroundColor,
      zIndex,
      elevation,
      paddingTop: statusBarHeight ?? top,
      paddingHorizontal: Math.max(left, right)
    }, borderRadius, shadow(elevation)]
  }, /*#__PURE__*/React.createElement(Appbar, _extends({
    testID: testID,
    style: [{
      height,
      backgroundColor
    }, styles.appbar, restStyle],
    dark: dark
  }, isV3 && {
    mode
  }, rest, {
    theme: theme
  })));
};
AppbarHeader.displayName = 'Appbar.Header';
const styles = StyleSheet.create({
  appbar: {
    elevation: 0
  }
});
export default AppbarHeader;

// @component-docs ignore-next-line
export { AppbarHeader };
//# sourceMappingURL=AppbarHeader.js.map