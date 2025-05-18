"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SegmentedButton = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _Icon = _interopRequireDefault(require("../Icon"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SegmentedButtonItem = ({
  checked,
  accessibilityLabel,
  disabled,
  style,
  labelStyle,
  showSelectedCheck,
  checkedColor,
  uncheckedColor,
  rippleColor: customRippleColor,
  background,
  icon,
  testID,
  label,
  onPress,
  segment,
  density = 'regular',
  theme: themeOverrides,
  labelMaxFontSizeMultiplier,
  hitSlop
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const checkScale = React.useRef(new _reactNative.Animated.Value(0)).current;
  React.useEffect(() => {
    if (!showSelectedCheck) {
      return;
    }
    if (checked) {
      _reactNative.Animated.spring(checkScale, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    } else {
      _reactNative.Animated.spring(checkScale, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  }, [checked, checkScale, showSelectedCheck]);
  const {
    roundness,
    isV3
  } = theme;
  const {
    borderColor,
    textColor,
    borderWidth,
    backgroundColor
  } = (0, _utils.getSegmentedButtonColors)({
    checked,
    theme,
    disabled,
    checkedColor,
    uncheckedColor
  });
  const borderRadius = (isV3 ? 5 : 1) * roundness;
  const segmentBorderRadius = (0, _utils.getSegmentedButtonBorderRadius)({
    theme,
    segment
  });
  const rippleColor = customRippleColor || (0, _color.default)(textColor).alpha(0.12).rgb().string();
  const showIcon = !icon ? false : label && checked ? !showSelectedCheck : true;
  const showCheckedIcon = checked && showSelectedCheck;
  const iconSize = isV3 ? 18 : 16;
  const iconStyle = {
    marginRight: label ? 5 : showCheckedIcon ? 3 : 0,
    ...(label && {
      transform: [{
        scale: checkScale.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }]
    })
  };
  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    ...segmentBorderRadius
  };
  const paddingVertical = (0, _utils.getSegmentedButtonDensityPadding)({
    density
  });
  const rippleStyle = {
    borderRadius,
    ...segmentBorderRadius
  };
  const labelTextStyle = {
    ...(!isV3 ? {
      textTransform: 'uppercase',
      fontWeight: '500'
    } : theme.fonts.labelLarge),
    color: textColor
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [buttonStyle, styles.button, style]
  }, /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    borderless: true,
    onPress: onPress,
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      disabled,
      checked
    },
    accessibilityRole: "button",
    disabled: disabled,
    rippleColor: rippleColor,
    testID: testID,
    style: rippleStyle,
    background: background,
    theme: theme,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.content, {
      paddingVertical
    }]
  }, showCheckedIcon ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    testID: `${testID}-check-icon`,
    style: [iconStyle, {
      transform: [{
        scale: checkScale
      }]
    }]
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: 'check',
    size: iconSize,
    color: textColor
  })) : null, showIcon ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    testID: `${testID}-icon`,
    style: iconStyle
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: iconSize,
    color: textColor
  })) : null, /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelLarge",
    style: [styles.label, labelTextStyle, labelStyle],
    selectable: false,
    numberOfLines: 1,
    maxFontSizeMultiplier: labelMaxFontSizeMultiplier,
    testID: `${testID}-label`
  }, label))));
};
exports.SegmentedButton = SegmentedButtonItem;
const styles = _reactNative.StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 76,
    borderStyle: 'solid'
  },
  label: {
    textAlign: 'center'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16
  }
});
var _default = exports.default = SegmentedButtonItem;
//# sourceMappingURL=SegmentedButtonItem.js.map