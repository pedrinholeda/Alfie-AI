import * as React from 'react';
import { Animated, ColorValue, EasingFunction, StyleProp, ViewStyle } from 'react-native';
import type { ThemeProp } from '../../types';
import { IconSource } from '../Icon';
import { Props as TouchableRippleProps } from '../TouchableRipple/TouchableRipple';
type BaseRoute = {
    key: string;
    title?: string;
    focusedIcon?: IconSource;
    unfocusedIcon?: IconSource;
    badge?: string | number | boolean;
    /**
     * @deprecated In v5.x works only with theme version 2.
     */
    color?: string;
    accessibilityLabel?: string;
    testID?: string;
    lazy?: boolean;
};
type NavigationState<Route extends BaseRoute> = {
    index: number;
    routes: Route[];
};
type TabPressEvent = {
    defaultPrevented: boolean;
    preventDefault(): void;
};
type TouchableProps<Route extends BaseRoute> = TouchableRippleProps & {
    key: string;
    route: Route;
    children: React.ReactNode;
    borderless?: boolean;
    centered?: boolean;
    rippleColor?: ColorValue;
};
export type Props<Route extends BaseRoute> = {
    /**
     * Whether the shifting style is used, the active tab icon shifts up to show the label and the inactive tabs won't have a label.
     *
     * By default, this is `false` with theme version 3 and `true` when you have more than 3 tabs.
     * Pass `shifting={false}` to explicitly disable this animation, or `shifting={true}` to always use this animation.
     * Note that you need at least 2 tabs be able to run this animation.
     */
    shifting?: boolean;
    /**
     * Whether to show labels in tabs. When `false`, only icons will be displayed.
     */
    labeled?: boolean;
    /**
     * Whether tabs should be spread across the entire width.
     */
    compact?: boolean;
    /**
     * State for the bottom navigation. The state should contain the following properties:
     *
     * - `index`: a number representing the index of the active route in the `routes` array
     * - `routes`: an array containing a list of route objects used for rendering the tabs
     *
     * Each route object should contain the following properties:
     *
     * - `key`: a unique key to identify the route (required)
     * - `title`: title of the route to use as the tab label
     * - `focusedIcon`:  icon to use as the focused tab icon, can be a string, an image source or a react component @renamed Renamed from 'icon' to 'focusedIcon' in v5.x
     * - `unfocusedIcon`:  icon to use as the unfocused tab icon, can be a string, an image source or a react component @supported Available in v5.x with theme version 3
     * - `color`: color to use as background color for shifting bottom navigation @deprecatedProperty In v5.x works only with theme version 2.
     * - `badge`: badge to show on the tab icon, can be `true` to show a dot, `string` or `number` to show text.
     * - `accessibilityLabel`: accessibility label for the tab button
     * - `testID`: test id for the tab button
     *
     * Example:
     *
     * ```js
     * {
     *   index: 1,
     *   routes: [
     *     { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
     *     { key: 'albums', title: 'Albums', focusedIcon: 'album' },
     *     { key: 'recents', title: 'Recents', focusedIcon: 'history' },
     *     { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
     *   ]
     * }
     * ```
     *
     * `BottomNavigation.Bar` is a controlled component, which means the `index` needs to be updated via the `onTabPress` callback.
     */
    navigationState: NavigationState<Route>;
    /**
     * Callback which returns a React Element to be used as tab icon.
     */
    renderIcon?: (props: {
        route: Route;
        focused: boolean;
        color: string;
    }) => React.ReactNode;
    /**
     * Callback which React Element to be used as tab label.
     */
    renderLabel?: (props: {
        route: Route;
        focused: boolean;
        color: string;
    }) => React.ReactNode;
    /**
     * Callback which returns a React element to be used as the touchable for the tab item.
     * Renders a `TouchableRipple` on Android and `Pressable` on iOS.
     */
    renderTouchable?: (props: TouchableProps<Route>) => React.ReactNode;
    /**
     * Get accessibility label for the tab button. This is read by the screen reader when the user taps the tab.
     * Uses `route.accessibilityLabel` by default.
     */
    getAccessibilityLabel?: (props: {
        route: Route;
    }) => string | undefined;
    /**
     * Get badge for the tab, uses `route.badge` by default.
     */
    getBadge?: (props: {
        route: Route;
    }) => boolean | number | string | undefined;
    /**
     * Get color for the tab, uses `route.color` by default.
     */
    getColor?: (props: {
        route: Route;
    }) => string | undefined;
    /**
     * Get label text for the tab, uses `route.title` by default. Use `renderLabel` to replace label component.
     */
    getLabelText?: (props: {
        route: Route;
    }) => string | undefined;
    /**
     * Get the id to locate this tab button in tests, uses `route.testID` by default.
     */
    getTestID?: (props: {
        route: Route;
    }) => string | undefined;
    /**
     * Function to execute on tab press. It receives the route for the pressed tab. Use this to update the navigation state.
     */
    onTabPress: (props: {
        route: Route;
    } & TabPressEvent) => void;
    /**
     * Function to execute on tab long press. It receives the route for the pressed tab
     */
    onTabLongPress?: (props: {
        route: Route;
    } & TabPressEvent) => void;
    /**
     * Custom color for icon and label in the active tab.
     */
    activeColor?: string;
    /**
     * Custom color for icon and label in the inactive tab.
     */
    inactiveColor?: string;
    /**
     * The scene animation Easing.
     */
    animationEasing?: EasingFunction | undefined;
    /**
     * Whether the bottom navigation bar is hidden when keyboard is shown.
     * On Android, this works best when [`windowSoftInputMode`](https://developer.android.com/guide/topics/manifest/activity-element#wsoft) is set to `adjustResize`.
     */
    keyboardHidesNavigationBar?: boolean;
    /**
     * Safe area insets for the tab bar. This can be used to avoid elements like the navigation bar on Android and bottom safe area on iOS.
     * The bottom insets for iOS is added by default. You can override the behavior with this option.
     */
    safeAreaInsets?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    /**
     * Specifies the largest possible scale a label font can reach.
     */
    labelMaxFontSizeMultiplier?: number;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    activeIndicatorStyle?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: ThemeProp;
    /**
     * TestID used for testing purposes
     */
    testID?: string;
};
/**
 * A navigation bar which can easily be integrated with [React Navigation's Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/).
 *
 * ## Usage
 * ### without React Navigation
 * ```js
 * import React from 'react';
 * import { useState } from 'react';
 * import { View } from 'react-native';
 * import { BottomNavigation, Text, Provider } from 'react-native-paper';
 * import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 *
 * function HomeScreen() {
 *   return (
 *     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Home!</Text>
 *     </View>
 *   );
 * }
 *
 * function SettingsScreen() {
 *   return (
 *     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Settings!</Text>
 *   </View>
 *   );
 * }
 *
 * export default function MyComponent() {
 *   const [index, setIndex] = useState(0);
 *
 *   const routes = [
 *     { key: 'home', title: 'Home', icon: 'home' },
 *     { key: 'settings', title: 'Settings', icon: 'cog' },
 *   ];

 *   const renderScene = ({ route }) => {
 *     switch (route.key) {
 *       case 'home':
 *         return <HomeScreen />;
 *       case 'settings':
 *         return <SettingsScreen />;
 *       default:
 *         return null;
 *     }
 *   };
 *
 *   return (
 *     <Provider>
 *       {renderScene({ route: routes[index] })}
 *       <BottomNavigation.Bar
 *         navigationState={{ index, routes }}
 *         onTabPress={({ route }) => {
 *           const newIndex = routes.findIndex((r) => r.key === route.key);
 *           if (newIndex !== -1) {
 *             setIndex(newIndex);
 *           }
 *         }}
 *         renderIcon={({ route, color }) => (
 *           <Icon name={route.icon} size={24} color={color} />
 *         )}
 *         getLabelText={({ route }) => route.title}
 *       />
 *     </Provider>
 *   );
 * }
 * ```
 */
declare const BottomNavigationBar: {
    <Route extends BaseRoute>({ navigationState, renderIcon, renderLabel, renderTouchable, getLabelText, getBadge, getColor, getAccessibilityLabel, getTestID, activeColor, inactiveColor, keyboardHidesNavigationBar, style, activeIndicatorStyle, labeled, animationEasing, onTabPress, onTabLongPress, shifting: shiftingProp, safeAreaInsets, labelMaxFontSizeMultiplier, compact: compactProp, testID, theme: themeOverrides, }: Props<Route>): React.JSX.Element;
    displayName: string;
};
export default BottomNavigationBar;
//# sourceMappingURL=BottomNavigationBar.d.ts.map