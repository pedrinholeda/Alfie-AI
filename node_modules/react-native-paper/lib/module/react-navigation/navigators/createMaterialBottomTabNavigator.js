function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { createNavigatorFactory, TabRouter, useNavigationBuilder } from '@react-navigation/native';
import MaterialBottomTabView from '../views/MaterialBottomTabView';
function MaterialBottomTabNavigator({
  id,
  initialRouteName,
  backBehavior,
  children,
  screenListeners,
  screenOptions,
  ...rest
}) {
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = useNavigationBuilder(TabRouter, {
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(MaterialBottomTabView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors
  })));
}

/**
 * @deprecated `createMaterialBottomTabNavigator` has been deprecated since `react-native-paper@5.14.0`.
 * Please use `@react-navigation/bottom-tabs` version `7.x` or higher and combine it with `BottomNavigation.Bar` for a Material Design look.
 */
export default createNavigatorFactory(MaterialBottomTabNavigator);
//# sourceMappingURL=createMaterialBottomTabNavigator.js.map