import { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';
type ChildrenMeasurement = {
    width: number;
    height: number;
    pageX: number;
    pageY: number;
};
type TooltipLayout = LayoutRectangle;
export type Measurement = {
    children: ChildrenMeasurement;
    tooltip: TooltipLayout;
    measured: boolean;
};
export type TooltipChildProps = {
    style: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: () => void;
    onHoverIn?: () => void;
    onHoverOut?: () => void;
};
export declare const getTooltipPosition: ({ children, tooltip, measured }: Measurement, component: React.ReactElement<{
    style: StyleProp<ViewStyle>;
}>) => {} | {
    left: number;
    top: number;
};
export {};
//# sourceMappingURL=utils.d.ts.map