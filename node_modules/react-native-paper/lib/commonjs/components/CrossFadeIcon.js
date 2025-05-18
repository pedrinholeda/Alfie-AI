"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Icon = _interopRequireWildcard(require("./Icon"));
var _theming = require("../core/theming");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CrossFadeIcon = ({
  color,
  size,
  source,
  theme: themeOverrides,
  testID = 'cross-fade-icon'
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const [currentIcon, setCurrentIcon] = React.useState(() => source);
  const [previousIcon, setPreviousIcon] = React.useState(null);
  const {
    current: fade
  } = React.useRef(new _reactNative.Animated.Value(1));
  const {
    scale
  } = theme.animation;
  if (currentIcon !== source) {
    setPreviousIcon(() => currentIcon);
    setCurrentIcon(() => source);
  }
  React.useEffect(() => {
    if ((0, _Icon.isValidIcon)(previousIcon) && !(0, _Icon.isEqualIcon)(previousIcon, currentIcon)) {
      fade.setValue(1);
      _reactNative.Animated.timing(fade, {
        duration: scale * 200,
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  }, [currentIcon, previousIcon, fade, scale]);
  const opacityPrev = fade;
  const opacityNext = previousIcon ? fade.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  }) : 1;
  const rotatePrev = fade.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg']
  });
  const rotateNext = previousIcon ? fade.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg']
  }) : '0deg';
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.content, {
      height: size,
      width: size
    }]
  }, previousIcon ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.icon, {
      opacity: opacityPrev,
      transform: [{
        rotate: rotatePrev
      }]
    }],
    testID: `${testID}-previous`
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: previousIcon,
    size: size,
    color: color,
    theme: theme
  })) : null, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.icon, {
      opacity: opacityNext,
      transform: [{
        rotate: rotateNext
      }]
    }],
    testID: `${testID}-current`
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: currentIcon,
    size: size,
    color: color,
    theme: theme
  })));
};
var _default = exports.default = CrossFadeIcon;
const styles = _reactNative.StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
//# sourceMappingURL=CrossFadeIcon.js.map