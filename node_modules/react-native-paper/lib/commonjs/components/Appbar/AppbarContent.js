"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppbarContent = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component used to display a title and optional subtitle in an appbar.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *        <Appbar.Content title="Title" />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
const AppbarContent = ({
  color: titleColor,
  subtitle,
  subtitleStyle,
  onPress,
  disabled,
  style,
  titleRef,
  titleStyle,
  title,
  titleMaxFontSizeMultiplier,
  mode = 'small',
  theme: themeOverrides,
  testID = 'appbar-content',
  ...rest
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    isV3,
    colors
  } = theme;
  const titleTextColor = titleColor ? titleColor : isV3 ? colors.onSurface : _colors.white;
  const subtitleColor = (0, _color.default)(titleTextColor).alpha(0.7).rgb().string();
  const modeContainerStyles = {
    small: styles.v3DefaultContainer,
    medium: styles.v3MediumContainer,
    large: styles.v3LargeContainer,
    'center-aligned': styles.v3DefaultContainer
  };
  const variant = _utils.modeTextVariant[mode];
  const contentWrapperProps = {
    pointerEvents: 'box-none',
    style: [styles.container, isV3 && modeContainerStyles[mode], style],
    testID,
    ...rest
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, typeof title === 'string' ? /*#__PURE__*/React.createElement(_Text.default, _extends({}, isV3 && {
    variant
  }, {
    ref: titleRef,
    style: [{
      color: titleTextColor,
      ...(isV3 ? theme.fonts[variant] : _reactNative.Platform.OS === 'ios' ? theme.fonts.regular : theme.fonts.medium)
    }, !isV3 && styles.title, titleStyle],
    numberOfLines: 1,
    accessible: true,
    accessibilityRole: onPress ? 'none' : _reactNative.Platform.OS === 'web' ? 'heading' : 'header'
    // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
    ,
    accessibilityTraits: "header",
    testID: `${testID}-title-text`,
    maxFontSizeMultiplier: titleMaxFontSizeMultiplier
  }), title) : title, !isV3 && subtitle ? /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.subtitle, {
      color: subtitleColor
    }, subtitleStyle],
    numberOfLines: 1
  }, subtitle) : null);
  if (onPress) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react-native-a11y/has-accessibility-props
      React.createElement(_reactNative.Pressable, _extends({
        accessibilityRole: touchableRole
        // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
        ,
        accessibilityTraits: touchableRole,
        accessibilityComponentType: "button",
        accessbilityState: disabled ? 'disabled' : null,
        onPress: onPress,
        disabled: disabled
      }, contentWrapperProps), content)
    );
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, contentWrapperProps, content);
};
exports.AppbarContent = AppbarContent;
AppbarContent.displayName = 'Appbar.Content';
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12
  },
  v3DefaultContainer: {
    paddingHorizontal: 0
  },
  v3MediumContainer: {
    paddingHorizontal: 0,
    justifyContent: 'flex-end',
    paddingBottom: 24
  },
  v3LargeContainer: {
    paddingHorizontal: 0,
    paddingTop: 36,
    justifyContent: 'flex-end',
    paddingBottom: 28
  },
  title: {
    fontSize: _reactNative.Platform.OS === 'ios' ? 17 : 20
  },
  subtitle: {
    fontSize: _reactNative.Platform.OS === 'ios' ? 11 : 14
  }
});
const touchableRole = 'button';
var _default = exports.default = AppbarContent; // @component-docs ignore-next-line
//# sourceMappingURL=AppbarContent.js.map