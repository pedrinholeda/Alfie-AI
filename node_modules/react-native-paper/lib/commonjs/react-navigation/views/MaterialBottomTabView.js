"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MaterialBottomTabView;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _BottomNavigation = _interopRequireDefault(require("../../components/BottomNavigation/BottomNavigation"));
var _MaterialCommunityIcon = _interopRequireDefault(require("../../components/MaterialCommunityIcon"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MaterialBottomTabView({
  state,
  navigation,
  descriptors,
  ...rest
}) {
  const buildLink = (0, _native.useLinkBuilder)();
  return /*#__PURE__*/React.createElement(_BottomNavigation.default, _extends({}, rest, {
    onIndexChange: noop,
    navigationState: state,
    renderScene: ({
      route
    }) => descriptors[route.key].render(),
    renderTouchable: _reactNative.Platform.OS === 'web' ? ({
      onPress,
      route,
      accessibilityRole: _0,
      borderless: _1,
      centered: _2,
      rippleColor: _3,
      style,
      ...rest
    }) => {
      return /*#__PURE__*/React.createElement(_native.Link, _extends({}, rest, {
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
        return /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
          direction: _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr',
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
          ..._native.CommonActions.navigate(route.name, route.params),
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
const styles = _reactNative.StyleSheet.create({
  touchable: {
    display: 'flex',
    justifyContent: 'center'
  }
});
function noop() {}
//# sourceMappingURL=MaterialBottomTabView.js.map