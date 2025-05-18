import * as React from 'react';
import { AccessibilityState, ColorValue, GestureResponderEvent, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ThemeProp } from '../../types';
import { IconSource } from '../Icon';
import { Props as TouchableRippleProps } from '../TouchableRipple/TouchableRipple';
export type Props = {
    /**
     * Title text for the `MenuItem`.
     */
    title: React.ReactNode;
    /**
     * @renamed Renamed from 'icon' to 'leadingIcon' in v5.x
     *
     * Leading icon to display for the `MenuItem`.
     */
    leadingIcon?: IconSource;
    /**
     * @supported Available in v5.x with theme version 3
     *
     * Trailing icon to display for the `MenuItem`.
     */
    trailingIcon?: IconSource;
    /**
     * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * @supported Available in v5.x with theme version 3
     *
     * Sets min height with densed layout.
     */
    dense?: boolean;
    /**
     * Type of background drawabale to display the feedback (Android).
     * https://reactnative.dev/docs/pressable#rippleconfig
     */
    background?: PressableAndroidRippleConfig;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * Specifies the largest possible scale a title font can reach.
     */
    titleMaxFontSizeMultiplier?: number;
    /**
     * Style that is passed to the root TouchableRipple container.
     * @optional
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to the outermost container that wraps the entire content, including leading and trailing icons and title text.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to the content container, which wraps the title text.
     */
    contentStyle?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to the Title element.
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * Color of the ripple effect.
     */
    rippleColor?: ColorValue;
    /**
     * @optional
     */
    theme?: ThemeProp;
    /**
     * Sets additional distance outside of element in which a press can be detected.
     */
    hitSlop?: TouchableRippleProps['hitSlop'];
    /**
     * TestID used for testing purposes
     */
    testID?: string;
    /**
     * Accessibility label for the Touchable. This is read by the screen reader when the user taps the component.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility state for the Touchable. This is read by the screen reader when the user taps the component.
     */
    accessibilityState?: AccessibilityState;
};
/**
 * A component to show a single list item inside a Menu.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Menu } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View style={{ flex: 1 }}>
 *     <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
 *     <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
 *     <Menu.Item leadingIcon="content-cut" onPress={() => {}} title="Cut" disabled />
 *     <Menu.Item leadingIcon="content-copy" onPress={() => {}} title="Copy" disabled />
 *     <Menu.Item leadingIcon="content-paste" onPress={() => {}} title="Paste" />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */
declare const MenuItem: {
    ({ leadingIcon, trailingIcon, dense, title, disabled, background, onPress, style, containerStyle, contentStyle, titleStyle, rippleColor: customRippleColor, testID, accessibilityLabel, accessibilityState, theme: themeOverrides, titleMaxFontSizeMultiplier, hitSlop, }: Props): React.JSX.Element;
    displayName: string;
};
export default MenuItem;
//# sourceMappingURL=MenuItem.d.ts.map