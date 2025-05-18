import * as React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
export type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};
/**
 * @deprecated Deprecated in v5.x - use `<Text variant="titleMedium" />` instead.
 * Typography component for showing a subheading.
 *
 * <div class="screenshots">
 *   <img src="screenshots/subheading.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Subheading } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Subheading>Subheading</Subheading>
 * );
 *
 * export default MyComponent;
 * ```
 */
declare const Subheading: (props: Props) => React.JSX.Element;
export default Subheading;
//# sourceMappingURL=Subheading.d.ts.map