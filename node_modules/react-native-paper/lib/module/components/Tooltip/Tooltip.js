function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Dimensions, View, StyleSheet, Platform, Pressable } from 'react-native';
import { getTooltipPosition } from './utils';
import { useInternalTheme } from '../../core/theming';
import { addEventListener } from '../../utils/addEventListener';
import Portal from '../Portal/Portal';
import Text from '../Typography/Text';
/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 *
 * Plain tooltips, when activated, display a text label identifying an element, such as a description of its function. Tooltips should include only short, descriptive text and avoid restating visible UI text.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, Tooltip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Tooltip title="Selected Camera">
 *     <IconButton icon="camera" selected size={24} onPress={() => {}} />
 *   </Tooltip>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Tooltip = ({
  children,
  enterTouchDelay = 500,
  leaveTouchDelay = 1500,
  title,
  theme: themeOverrides,
  titleMaxFontSizeMultiplier,
  ...rest
}) => {
  const isWeb = Platform.OS === 'web';
  const theme = useInternalTheme(themeOverrides);
  const [visible, setVisible] = React.useState(false);
  const [measurement, setMeasurement] = React.useState({
    children: {},
    tooltip: {},
    measured: false
  });
  const showTooltipTimer = React.useRef([]);
  const hideTooltipTimer = React.useRef([]);
  const childrenWrapperRef = React.useRef(null);
  const touched = React.useRef(false);
  const isValidChild = React.useMemo(() => /*#__PURE__*/React.isValidElement(children), [children]);
  React.useEffect(() => {
    return () => {
      if (showTooltipTimer.current.length) {
        showTooltipTimer.current.forEach(t => clearTimeout(t));
        showTooltipTimer.current = [];
      }
      if (hideTooltipTimer.current.length) {
        hideTooltipTimer.current.forEach(t => clearTimeout(t));
        hideTooltipTimer.current = [];
      }
    };
  }, []);
  React.useEffect(() => {
    const subscription = addEventListener(Dimensions, 'change', () => setVisible(false));
    return () => subscription.remove();
  }, []);
  const handleTouchStart = React.useCallback(() => {
    if (hideTooltipTimer.current.length) {
      hideTooltipTimer.current.forEach(t => clearTimeout(t));
      hideTooltipTimer.current = [];
    }
    if (isWeb) {
      let id = setTimeout(() => {
        touched.current = true;
        setVisible(true);
      }, enterTouchDelay);
      showTooltipTimer.current.push(id);
    } else {
      touched.current = true;
      setVisible(true);
    }
  }, [isWeb, enterTouchDelay]);
  const handleTouchEnd = React.useCallback(() => {
    touched.current = false;
    if (showTooltipTimer.current.length) {
      showTooltipTimer.current.forEach(t => clearTimeout(t));
      showTooltipTimer.current = [];
    }
    let id = setTimeout(() => {
      setVisible(false);
      setMeasurement({
        children: {},
        tooltip: {},
        measured: false
      });
    }, leaveTouchDelay);
    hideTooltipTimer.current.push(id);
  }, [leaveTouchDelay]);
  const handlePress = React.useCallback(() => {
    var _props$onPress;
    if (touched.current) {
      return null;
    }
    if (!isValidChild) return null;
    const props = children.props;
    if (props.disabled) return null;
    return (_props$onPress = props.onPress) === null || _props$onPress === void 0 ? void 0 : _props$onPress.call(props);
  }, [children.props, isValidChild]);
  const handleHoverIn = React.useCallback(() => {
    handleTouchStart();
    if (isValidChild) {
      var _onHoverIn, _ref;
      (_onHoverIn = (_ref = children.props).onHoverIn) === null || _onHoverIn === void 0 || _onHoverIn.call(_ref);
    }
  }, [children.props, handleTouchStart, isValidChild]);
  const handleHoverOut = React.useCallback(() => {
    handleTouchEnd();
    if (isValidChild) {
      var _onHoverOut, _ref2;
      (_onHoverOut = (_ref2 = children.props).onHoverOut) === null || _onHoverOut === void 0 || _onHoverOut.call(_ref2);
    }
  }, [children.props, handleTouchEnd, isValidChild]);
  const handleOnLayout = ({
    nativeEvent: {
      layout
    }
  }) => {
    var _childrenWrapperRef$c;
    (_childrenWrapperRef$c = childrenWrapperRef.current) === null || _childrenWrapperRef$c === void 0 || _childrenWrapperRef$c.measure((_x, _y, width, height, pageX, pageY) => {
      setMeasurement({
        children: {
          pageX,
          pageY,
          height,
          width
        },
        tooltip: {
          ...layout
        },
        measured: true
      });
    });
  };
  const mobilePressProps = {
    onPress: handlePress,
    onLongPress: () => handleTouchStart(),
    onPressOut: () => handleTouchEnd(),
    delayLongPress: enterTouchDelay
  };
  const webPressProps = {
    onHoverIn: handleHoverIn,
    onHoverOut: handleHoverOut
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible && /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(View, {
    onLayout: handleOnLayout,
    style: [styles.tooltip, {
      backgroundColor: theme.isV3 ? theme.colors.onSurface : theme.colors.tooltip,
      ...getTooltipPosition(measurement, children),
      borderRadius: theme.roundness,
      ...(measurement.measured ? styles.visible : styles.hidden)
    }],
    testID: "tooltip-container"
  }, /*#__PURE__*/React.createElement(Text, {
    accessibilityLiveRegion: "polite",
    numberOfLines: 1,
    selectable: false,
    variant: "labelLarge",
    style: {
      color: theme.colors.surface
    },
    maxFontSizeMultiplier: titleMaxFontSizeMultiplier
  }, title))), /*#__PURE__*/React.createElement(Pressable, _extends({
    ref: childrenWrapperRef,
    style: styles.pressContainer
  }, isWeb ? webPressProps : mobilePressProps), /*#__PURE__*/React.cloneElement(children, {
    ...rest,
    ...(isWeb ? webPressProps : mobilePressProps)
  })));
};
Tooltip.displayName = 'Tooltip';
const styles = StyleSheet.create({
  tooltip: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 32,
    maxHeight: 32
  },
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  },
  pressContainer: {
    ...(Platform.OS === 'web' && {
      cursor: 'default'
    })
  }
});
export default Tooltip;
//# sourceMappingURL=Tooltip.js.map