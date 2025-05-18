/// <reference types="react" />
import { FlexAlignType, ColorValue, StyleProp, ViewStyle } from 'react-native';
import type { EllipsizeProp, InternalTheme, ThemeProp } from 'src/types';
type Description = React.ReactNode | ((props: {
    selectable: boolean;
    ellipsizeMode: EllipsizeProp | undefined;
    color: string;
    fontSize: number;
}) => React.ReactNode);
export type ListChildProps = {
    left?: React.ReactNode;
    right?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    theme?: ThemeProp;
};
export type Style = {
    marginLeft?: number;
    marginRight?: number;
    marginVertical?: number;
    alignSelf?: FlexAlignType;
};
export declare const getLeftStyles: (alignToTop: boolean, description: Description, isV3: boolean) => {
    marginLeft: number;
    marginRight: number;
};
export declare const getRightStyles: (alignToTop: boolean, description: Description, isV3: boolean) => {
    marginRight: number;
};
export declare const getAccordionColors: ({ theme, isExpanded, customRippleColor, }: {
    theme: InternalTheme;
    isExpanded?: boolean | undefined;
    customRippleColor?: ColorValue | undefined;
}) => {
    titleColor: string;
    descriptionColor: string;
    titleTextColor: string;
    rippleColor: ColorValue;
};
export {};
//# sourceMappingURL=utils.d.ts.map