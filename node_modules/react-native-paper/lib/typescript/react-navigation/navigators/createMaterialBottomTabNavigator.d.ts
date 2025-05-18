import * as React from 'react';
import { DefaultNavigatorOptions, ParamListBase, TabNavigationState, TabRouterOptions } from '@react-navigation/native';
import type { MaterialBottomTabNavigationConfig, MaterialBottomTabNavigationEventMap, MaterialBottomTabNavigationOptions } from '../types';
export type MaterialBottomTabNavigatorProps = DefaultNavigatorOptions<ParamListBase, TabNavigationState<ParamListBase>, MaterialBottomTabNavigationOptions, MaterialBottomTabNavigationEventMap> & TabRouterOptions & MaterialBottomTabNavigationConfig;
declare function MaterialBottomTabNavigator({ id, initialRouteName, backBehavior, children, screenListeners, screenOptions, ...rest }: MaterialBottomTabNavigatorProps): React.JSX.Element;
/**
 * @deprecated `createMaterialBottomTabNavigator` has been deprecated since `react-native-paper@5.14.0`.
 * Please use `@react-navigation/bottom-tabs` version `7.x` or higher and combine it with `BottomNavigation.Bar` for a Material Design look.
 */
declare const _default: <ParamList extends ParamListBase>() => import("@react-navigation/native").TypedNavigator<ParamList, TabNavigationState<ParamListBase>, MaterialBottomTabNavigationOptions, MaterialBottomTabNavigationEventMap, typeof MaterialBottomTabNavigator>;
export default _default;
//# sourceMappingURL=createMaterialBottomTabNavigator.d.ts.map