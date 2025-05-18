"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _AnimatedText = _interopRequireDefault(require("../../Typography/AnimatedText"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const LabelBackground = ({
  labeled,
  labelLayoutWidth,
  labelLayoutHeight,
  placeholderStyle,
  baseLabelTranslateX,
  topPosition,
  backgroundColor,
  roundness,
  labelStyle,
  maxFontSizeMultiplier,
  testID
}) => {
  const opacity = labeled.interpolate({
    inputRange: [0, 0.6],
    outputRange: [1, 0]
  });
  const labelTranslationX = {
    translateX: labeled.interpolate({
      inputRange: [0, 1],
      outputRange: [-baseLabelTranslateX, 0]
    })
  };
  const labelTextScaleY = {
    scaleY: labeled.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 1]
    })
  };
  const labelTextTransform = [...labelStyle.transform, labelTextScaleY];
  const isRounded = roundness > 6;
  const roundedEdgeCover = isRounded ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    key: "labelBackground-view",
    pointerEvents: "none",
    style: [_reactNative.StyleSheet.absoluteFill, styles.view, {
      backgroundColor,
      maxHeight: Math.max(roundness / 3, 2),
      bottom: Math.max(roundness, 2),
      transform: [labelTranslationX],
      opacity
    }]
  }) : null;
  return [roundedEdgeCover, /*#__PURE__*/React.createElement(_AnimatedText.default, {
    key: "labelBackground-text",
    testID: `${testID}-label-background`,
    style: [placeholderStyle, labelStyle, styles.outlinedLabel, {
      top: topPosition + 1,
      width: labelLayoutWidth - placeholderStyle.paddingHorizontal,
      height: labelLayoutHeight,
      backgroundColor,
      opacity,
      transform: labelTextTransform
    }],
    numberOfLines: 1,
    maxFontSizeMultiplier: maxFontSizeMultiplier
  })];
};
var _default = exports.default = LabelBackground;
const styles = _reactNative.StyleSheet.create({
  view: {
    position: 'absolute',
    top: 6,
    left: 10,
    width: 12
  },
  // eslint-disable-next-line react-native/no-color-literals
  outlinedLabel: {
    position: 'absolute',
    left: 8,
    paddingHorizontal: 0,
    color: 'transparent'
  }
});
//# sourceMappingURL=LabelBackground.js.map