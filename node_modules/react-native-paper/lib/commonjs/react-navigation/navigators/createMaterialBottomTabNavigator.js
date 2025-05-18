"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _native = require("@react-navigation/native");
var _MaterialBottomTabView = _interopRequireDefault(require("../views/MaterialBottomTabView"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MaterialBottomTabNavigator({
  id,
  initialRouteName,
  backBehavior,
  children,
  screenListeners,
  screenOptions,
  ...rest
}) {
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = (0, _native.useNavigationBuilder)(_native.TabRouter, {
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(_MaterialBottomTabView.default, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors
  })));
}

/**
 * @deprecated `createMaterialBottomTabNavigator` has been deprecated since `react-native-paper@5.14.0`.
 * Please use `@react-navigation/bottom-tabs` version `7.x` or higher and combine it with `BottomNavigation.Bar` for a Material Design look.
 */
var _default = exports.default = (0, _native.createNavigatorFactory)(MaterialBottomTabNavigator);
//# sourceMappingURL=createMaterialBottomTabNavigator.js.map