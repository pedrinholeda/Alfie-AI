function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Animated, StyleSheet, Pressable, View } from 'react-native';
import useLatestCallback from 'use-latest-callback';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardCover from './CardCover';
import CardTitle from './CardTitle';
import { getCardColors } from './utils';
import { useInternalTheme } from '../../core/theming';
import { forwardRef } from '../../utils/forwardRef';
import hasTouchHandler from '../../utils/hasTouchHandler';
import { splitStyles } from '../../utils/splitStyles';
import Surface from '../Surface';
/**
 * A card is a sheet of material that serves as an entry point to more detailed information.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar, Button, Card, Text } from 'react-native-paper';
 *
 * const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
 *     <Card.Content>
 *       <Text variant="titleLarge">Card title</Text>
 *       <Text variant="bodyMedium">Card content</Text>
 *     </Card.Content>
 *     <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
 *     <Card.Actions>
 *       <Button>Cancel</Button>
 *       <Button>Ok</Button>
 *     </Card.Actions>
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 */

const Card = ({
  elevation: cardElevation = 1,
  delayLongPress,
  onPress,
  onLongPress,
  onPressOut,
  onPressIn,
  mode: cardMode = 'elevated',
  children,
  style,
  contentStyle,
  theme: themeOverrides,
  testID = 'card',
  accessible,
  disabled,
  ...rest
}, ref) => {
  const theme = useInternalTheme(themeOverrides);
  const isMode = React.useCallback(modeToCompare => {
    return cardMode === modeToCompare;
  }, [cardMode]);
  const hasPassedTouchHandler = hasTouchHandler({
    onPress,
    onLongPress,
    onPressIn,
    onPressOut
  });

  // Default animated value
  const {
    current: elevation
  } = React.useRef(new Animated.Value(cardElevation));
  // Dark adaptive animated value, used in case of toggling the theme,
  // it prevents animating the background with native drivers inside Surface
  const {
    current: elevationDarkAdaptive
  } = React.useRef(new Animated.Value(cardElevation));
  const {
    animation,
    dark,
    mode,
    roundness,
    isV3
  } = theme;
  const prevDarkRef = React.useRef(dark);
  React.useEffect(() => {
    prevDarkRef.current = dark;
  });
  const prevDark = prevDarkRef.current;
  const isAdaptiveMode = mode === 'adaptive';
  const animationDuration = 150 * animation.scale;
  React.useEffect(() => {
    /**
     * Resets animations values if updating to dark adaptive mode,
     * otherwise, any card that is in the middle of animation while
     * toggling the theme will stay at that animated value until
     * the next press-in
     */
    if (dark && isAdaptiveMode && !prevDark) {
      elevation.setValue(cardElevation);
      elevationDarkAdaptive.setValue(cardElevation);
    }
  }, [prevDark, dark, isAdaptiveMode, cardElevation, elevation, elevationDarkAdaptive]);
  const runElevationAnimation = pressType => {
    if (isV3 && isMode('contained')) {
      return;
    }
    const isPressTypeIn = pressType === 'in';
    if (dark && isAdaptiveMode) {
      Animated.timing(elevationDarkAdaptive, {
        toValue: isPressTypeIn ? isV3 ? 2 : 8 : cardElevation,
        duration: animationDuration,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(elevation, {
        toValue: isPressTypeIn ? isV3 ? 2 : 8 : cardElevation,
        duration: animationDuration,
        useNativeDriver: false
      }).start();
    }
  };
  const handlePressIn = useLatestCallback(e => {
    onPressIn === null || onPressIn === void 0 || onPressIn(e);
    runElevationAnimation('in');
  });
  const handlePressOut = useLatestCallback(e => {
    onPressOut === null || onPressOut === void 0 || onPressOut(e);
    runElevationAnimation('out');
  });
  const total = React.Children.count(children);
  const siblings = React.Children.map(children, child => /*#__PURE__*/React.isValidElement(child) && child.type ? child.type.displayName : null);
  const computedElevation = dark && isAdaptiveMode ? elevationDarkAdaptive : elevation;
  const {
    backgroundColor,
    borderColor: themedBorderColor
  } = getCardColors({
    theme,
    mode: cardMode
  });
  const flattenedStyles = StyleSheet.flatten(style) || {};
  const {
    borderColor = themedBorderColor
  } = flattenedStyles;
  const [, borderRadiusStyles] = splitStyles(flattenedStyles, style => style.startsWith('border') && style.endsWith('Radius'));
  const borderRadiusCombinedStyles = {
    borderRadius: (isV3 ? 3 : 1) * roundness,
    ...borderRadiusStyles
  };
  const content = /*#__PURE__*/React.createElement(View, {
    style: [styles.innerContainer, contentStyle],
    testID: testID
  }, React.Children.map(children, (child, index) => /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, {
    index,
    total,
    siblings,
    borderRadiusStyles
  }) : child));
  return /*#__PURE__*/React.createElement(Surface, _extends({
    ref: ref,
    style: [isV3 && !isMode('elevated') && {
      backgroundColor
    }, !isV3 && isMode('outlined') ? styles.resetElevation : {
      elevation: computedElevation
    }, borderRadiusCombinedStyles, style],
    theme: theme
  }, isV3 && {
    elevation: isMode('elevated') ? computedElevation : 0
  }, {
    testID: `${testID}-container`,
    container: true
  }, rest), isMode('outlined') && /*#__PURE__*/React.createElement(View, {
    pointerEvents: "none",
    testID: `${testID}-outline`,
    style: [{
      borderColor
    }, styles.outline, borderRadiusCombinedStyles]
  }), hasPassedTouchHandler ? /*#__PURE__*/React.createElement(Pressable, {
    accessible: accessible,
    unstable_pressDelay: 0,
    disabled: disabled,
    delayLongPress: delayLongPress,
    onLongPress: onLongPress,
    onPress: onPress,
    onPressIn: handlePressIn,
    onPressOut: handlePressOut
  }, content) : content);
};
Card.displayName = 'Card';
const Component = forwardRef(Card);
const CardComponent = Component;

// @component ./CardContent.tsx
CardComponent.Content = CardContent;
// @component ./CardActions.tsx
CardComponent.Actions = CardActions;
// @component ./CardCover.tsx
CardComponent.Cover = CardCover;
// @component ./CardTitle.tsx
CardComponent.Title = CardTitle;
const styles = StyleSheet.create({
  innerContainer: {
    flexShrink: 1
  },
  outline: {
    borderWidth: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  resetElevation: {
    elevation: 0
  }
});
export default CardComponent;
//# sourceMappingURL=Card.js.map