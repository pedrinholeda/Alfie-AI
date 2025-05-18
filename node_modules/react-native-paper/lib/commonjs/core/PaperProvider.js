"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _SafeAreaProviderCompat = _interopRequireDefault(require("./SafeAreaProviderCompat"));
var _settings = require("./settings");
var _theming = require("./theming");
var _MaterialCommunityIcon = _interopRequireDefault(require("../components/MaterialCommunityIcon"));
var _PortalHost = _interopRequireDefault(require("../components/Portal/PortalHost"));
var _addEventListener = require("../utils/addEventListener");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PaperProvider = props => {
  const isOnlyVersionInTheme = props.theme && Object.keys(props.theme).length === 1 && props.theme.version;
  const colorSchemeName = (!props.theme || isOnlyVersionInTheme) && (_reactNative.Appearance === null || _reactNative.Appearance === void 0 ? void 0 : _reactNative.Appearance.getColorScheme()) || 'light';
  const [reduceMotionEnabled, setReduceMotionEnabled] = React.useState(false);
  const [colorScheme, setColorScheme] = React.useState(colorSchemeName);
  const handleAppearanceChange = preferences => {
    const {
      colorScheme
    } = preferences;
    setColorScheme(colorScheme);
  };
  React.useEffect(() => {
    let subscription;
    if (!props.theme) {
      subscription = (0, _addEventListener.addEventListener)(_reactNative.AccessibilityInfo, 'reduceMotionChanged', setReduceMotionEnabled);
    }
    return () => {
      if (!props.theme) {
        var _subscription;
        (_subscription = subscription) === null || _subscription === void 0 || _subscription.remove();
      }
    };
  }, [props.theme]);
  React.useEffect(() => {
    let appearanceSubscription;
    if (!props.theme || isOnlyVersionInTheme) {
      appearanceSubscription = _reactNative.Appearance === null || _reactNative.Appearance === void 0 ? void 0 : _reactNative.Appearance.addChangeListener(handleAppearanceChange);
    }
    return () => {
      if (!props.theme || isOnlyVersionInTheme) {
        if (appearanceSubscription) {
          appearanceSubscription.remove();
        } else {
          // @ts-expect-error: We keep deprecated listener remove method for backwards compat with old RN versions
          _reactNative.Appearance === null || _reactNative.Appearance === void 0 || _reactNative.Appearance.removeChangeListener(handleAppearanceChange);
        }
      }
    };
  }, [props.theme, isOnlyVersionInTheme]);
  const theme = React.useMemo(() => {
    var _props$theme, _props$theme2;
    const themeVersion = ((_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.version) || 3;
    const scheme = colorScheme || 'light';
    const defaultThemeBase = _theming.defaultThemesByVersion[themeVersion][scheme];
    const extendedThemeBase = {
      ...defaultThemeBase,
      ...props.theme,
      version: themeVersion,
      animation: {
        ...((_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.animation),
        scale: reduceMotionEnabled ? 0 : 1
      }
    };
    return {
      ...extendedThemeBase,
      isV3: extendedThemeBase.version === 3
    };
  }, [colorScheme, props.theme, reduceMotionEnabled]);
  const {
    children,
    settings
  } = props;
  const settingsValue = React.useMemo(() => ({
    icon: _MaterialCommunityIcon.default,
    rippleEffectEnabled: true,
    ...settings
  }), [settings]);
  return /*#__PURE__*/React.createElement(_SafeAreaProviderCompat.default, null, /*#__PURE__*/React.createElement(_PortalHost.default, null, /*#__PURE__*/React.createElement(_settings.Provider, {
    value: settingsValue
  }, /*#__PURE__*/React.createElement(_theming.ThemeProvider, {
    theme: theme
  }, children))));
};
var _default = exports.default = PaperProvider;
//# sourceMappingURL=PaperProvider.js.map