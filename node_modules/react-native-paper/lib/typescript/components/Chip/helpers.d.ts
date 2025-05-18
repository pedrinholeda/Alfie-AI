import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import type { InternalTheme } from '../../types';
export type ChipAvatarProps = {
    style?: StyleProp<ViewStyle>;
};
type BaseProps = {
    theme: InternalTheme;
    isOutlined: boolean;
    disabled?: boolean;
};
export declare const getChipColors: ({ isOutlined, theme, selectedColor, showSelectedOverlay, customBackgroundColor, disabled, customRippleColor, }: BaseProps & {
    customBackgroundColor?: ColorValue | undefined;
    disabled?: boolean | undefined;
    showSelectedOverlay?: boolean | undefined;
    selectedColor?: string | undefined;
    customRippleColor?: ColorValue | undefined;
}) => {
    borderColor: string;
    textColor: string;
    iconColor: string;
    rippleColor: ColorValue;
    backgroundColor: string;
    selectedBackgroundColor: string;
};
export {};
//# sourceMappingURL=helpers.d.ts.map