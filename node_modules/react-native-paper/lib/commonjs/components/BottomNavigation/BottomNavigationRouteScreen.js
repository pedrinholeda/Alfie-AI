"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class BottomNavigationRouteScreen extends _react.default.Component {
  render() {
    const {
      style,
      index,
      children,
      visibility,
      ...rest
    } = this.props;

    // On Web, the unfocused tab screens can still be clicked since they are transparent, but still there
    // Hiding them with `display: none` makes sure that they won't receive clicks
    // We only set it on Web since on native, react-native-pager-view's breaks due to layout changing
    const display = _reactNative.Platform.OS === 'web' ? visibility === 0 ? 'none' : 'flex' : undefined;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
      testID: `RouteScreen: ${index}`,
      style: [style, {
        display
      }]
    }, rest), children);
  }
}
var _default = exports.default = _reactNative.Animated.createAnimatedComponent(BottomNavigationRouteScreen);
//# sourceMappingURL=BottomNavigationRouteScreen.js.map