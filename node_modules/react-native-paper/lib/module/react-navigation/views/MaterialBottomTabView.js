function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { I18nManager, Platform, StyleSheet } from 'react-native';
import { CommonActions, Link, useLinkBuilder } from '@react-navigation/native';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import MaterialCommunityIcon from '../../components/MaterialCommunityIcon';
export default function MaterialBottomTabView({
  state,
  navigation,
  descriptors,
  ...rest
}) {
  const buildLink = useLinkBuilder();
  return /*#__PURE__*/React.createElement(BottomNavigation, _extends({}, rest, {
    onIndexChange: noop,
    navigationState: state,
    renderScene: ({
      route
    }) => descriptors[route.key].render(),
    renderTouchable: Platform.OS === 'web' ? ({
      onPress,
      route,
      accessibilityRole: _0,
      borderless: _1,
      centered: _2,
      rippleColor: _3,
      style,
      ...rest
    }) => {
      return /*#__PURE__*/React.createElement(Link, _extends({}, rest, {
        // @ts-expect-error: to could be undefined, but it doesn't affect functionality
        to: buildLink(route.name, route.params),
        accessibilityRole: "link",
        onPress: e => {
          if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && (
          // ignore clicks with modifier keys
          e.button == null || e.button === 0) // ignore everything but left clicks
          ) {
            e.preventDefault();
            onPress === null || onPress === void 0 || onPress(e);
          }
        },
        style: [styles.touchable, style]
      }));
    } : undefined,
    renderIcon: ({
      route,
      focused,
      color
    }) => {
      const {
        options
      } = descriptors[route.key];
      if (typeof options.tabBarIcon === 'string') {
        return /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
          direction: I18nManager.getConstants().isRTL ? 'rtl' : 'ltr',
          name: options.tabBarIcon,
          color: color,
          size: 24
        });
      }
      if (typeof options.tabBarIcon === 'function') {
        return options.tabBarIcon({
          focused,
          color
        });
      }
      return null;
    },
    getLabelText: ({
      route
    }) => {
      const {
        options
      } = descriptors[route.key];
      return options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    },
    getColor: ({
      route
    }) => descriptors[route.key].options.tabBarColor,
    getBadge: ({
      route
    }) => descriptors[route.key].options.tabBarBadge,
    getAccessibilityLabel: ({
      route
    }) => descriptors[route.key].options.tabBarAccessibilityLabel,
    getTestID: ({
      route
    }) => descriptors[route.key].options.tabBarButtonTestID,
    onTabPress: ({
      route,
      preventDefault
    }) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });
      if (event.defaultPrevented) {
        preventDefault();
      } else {
        navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key
        });
      }
    },
    onTabLongPress: ({
      route
    }) => navigation.emit({
      type: 'tabLongPress',
      target: route.key
    })
  }));
}
const styles = StyleSheet.create({
  touchable: {
    display: 'flex',
    justifyContent: 'center'
  }
});
function noop() {}
//# sourceMappingURL=MaterialBottomTabView.js.map