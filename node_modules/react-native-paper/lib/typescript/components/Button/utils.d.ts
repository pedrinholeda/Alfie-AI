import { type ViewStyle } from 'react-native';
import type { InternalTheme } from '../../types';
export type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
export declare const getButtonColors: ({ theme, mode, customButtonColor, customTextColor, disabled, dark, }: {
    theme: InternalTheme;
    mode: ButtonMode;
    customButtonColor?: string | undefined;
    customTextColor?: string | undefined;
    disabled?: boolean | undefined;
    dark?: boolean | undefined;
}) => {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    borderWidth: number;
};
type ViewStyleBorderRadiusStyles = Partial<Pick<ViewStyle, 'borderBottomEndRadius' | 'borderBottomLeftRadius' | 'borderBottomRightRadius' | 'borderBottomStartRadius' | 'borderTopEndRadius' | 'borderTopLeftRadius' | 'borderTopRightRadius' | 'borderTopStartRadius' | 'borderRadius'>>;
export declare const getButtonTouchableRippleStyle: (style?: ViewStyle, borderWidth?: number) => ViewStyleBorderRadiusStyles;
export {};
//# sourceMappingURL=utils.d.ts.map