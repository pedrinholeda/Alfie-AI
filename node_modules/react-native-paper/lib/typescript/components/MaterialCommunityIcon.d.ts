import * as React from 'react';
import { ComponentProps } from 'react';
import { Role, ViewProps } from 'react-native';
export type IconProps = {
    name: ComponentProps<typeof MaterialCommunityIcons>['name'];
    color?: string;
    size: number;
    direction: 'rtl' | 'ltr';
    allowFontScaling?: boolean;
    testID?: string;
};
type AccessibilityProps = {
    role?: Role;
    focusable?: boolean;
} | {
    accessibilityElementsHidden?: boolean;
    importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
};
export declare const accessibilityProps: AccessibilityProps;
type IconModuleType = React.ComponentType<React.ComponentProps<typeof import('@react-native-vector-icons/material-design-icons').default | typeof import('react-native-vector-icons/MaterialCommunityIcons').default> & {
    color: string;
    pointerEvents?: ViewProps['pointerEvents'];
}>;
declare const MaterialCommunityIcons: IconModuleType;
/**
 * Default icon component that handles icon rendering with proper styling and accessibility
 */
declare const DefaultIcon: ({ name, color, size, direction, allowFontScaling, testID, }: IconProps) => React.JSX.Element;
export default DefaultIcon;
//# sourceMappingURL=MaterialCommunityIcon.d.ts.map