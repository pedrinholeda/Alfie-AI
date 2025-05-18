function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Animated, Platform, View } from 'react-native';
class BottomNavigationRouteScreen extends React.Component {
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
    const display = Platform.OS === 'web' ? visibility === 0 ? 'none' : 'flex' : undefined;
    return /*#__PURE__*/React.createElement(View, _extends({
      testID: `RouteScreen: ${index}`,
      style: [style, {
        display
      }]
    }, rest), children);
  }
}
export default Animated.createAnimatedComponent(BottomNavigationRouteScreen);
//# sourceMappingURL=BottomNavigationRouteScreen.js.map