"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shadow;
var _reactNative = require("react-native");
var MD2Colors = _interopRequireWildcard(require("./themes/v2/colors"));
var _tokens = require("./themes/v3/tokens");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SHADOW_COLOR = MD2Colors.black;
const SHADOW_OPACITY = 0.24;
const MD3_SHADOW_OPACITY = 0.3;
const MD3_SHADOW_COLOR = _tokens.MD3Colors.primary0;
function shadow(elevation = 0, isV3 = false) {
  return isV3 ? v3Shadow(elevation) : v2Shadow(elevation);
}
function v2Shadow(elevation = 0) {
  if (elevation instanceof _reactNative.Animated.Value) {
    const inputRange = [0, 1, 2, 3, 8, 24];
    return {
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: new _reactNative.Animated.Value(0),
        height: elevation.interpolate({
          inputRange,
          outputRange: [0, 0.5, 0.75, 2, 7, 23]
        })
      },
      shadowOpacity: elevation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, SHADOW_OPACITY],
        extrapolate: 'clamp'
      }),
      shadowRadius: elevation.interpolate({
        inputRange,
        outputRange: [0, 0.75, 1.5, 3, 8, 24]
      })
    };
  } else {
    if (elevation === 0) {
      return {};
    }
    let height, radius;
    switch (elevation) {
      case 1:
        height = 0.5;
        radius = 0.75;
        break;
      case 2:
        height = 0.75;
        radius = 1.5;
        break;
      default:
        height = elevation - 1;
        radius = elevation;
    }
    return {
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: 0,
        height
      },
      shadowOpacity: SHADOW_OPACITY,
      shadowRadius: radius
    };
  }
}
function v3Shadow(elevation = 0) {
  const inputRange = [0, 1, 2, 3, 4, 5];
  const shadowHeight = [0, 1, 2, 4, 6, 8];
  const shadowRadius = [0, 3, 6, 8, 10, 12];
  if (elevation instanceof _reactNative.Animated.Value) {
    return {
      shadowColor: MD3_SHADOW_COLOR,
      shadowOffset: {
        width: new _reactNative.Animated.Value(0),
        height: elevation.interpolate({
          inputRange,
          outputRange: shadowHeight
        })
      },
      shadowOpacity: elevation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MD3_SHADOW_OPACITY],
        extrapolate: 'clamp'
      }),
      shadowRadius: elevation.interpolate({
        inputRange,
        outputRange: shadowRadius
      })
    };
  } else {
    return {
      shadowColor: MD3_SHADOW_COLOR,
      shadowOpacity: elevation ? MD3_SHADOW_OPACITY : 0,
      shadowOffset: {
        width: 0,
        height: shadowHeight[elevation]
      },
      shadowRadius: shadowRadius[elevation]
    };
  }
}
//# sourceMappingURL=shadow.js.map