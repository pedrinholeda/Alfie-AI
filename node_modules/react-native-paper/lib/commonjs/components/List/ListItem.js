"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _color = _interopRequireDefault(require("color"));
var _utils = require("./utils");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show tiles inside a List.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <List.Item
 *     title="First Item"
 *     description="Item description"
 *     left={props => <List.Icon {...props} icon="folder" />}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const ListItem = ({
  left,
  right,
  title,
  description,
  onPress,
  theme: themeOverrides,
  style,
  containerStyle,
  contentStyle,
  titleStyle,
  titleNumberOfLines = 1,
  descriptionNumberOfLines = 2,
  titleEllipsizeMode,
  descriptionEllipsizeMode,
  descriptionStyle,
  descriptionMaxFontSizeMultiplier,
  titleMaxFontSizeMultiplier,
  testID,
  ...rest
}, ref) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const [alignToTop, setAlignToTop] = React.useState(false);
  const onDescriptionTextLayout = event => {
    if (!theme.isV3) {
      return;
    }
    const {
      nativeEvent
    } = event;
    setAlignToTop(nativeEvent.lines.length >= 2);
  };
  const renderDescription = (descriptionColor, description) => {
    return typeof description === 'function' ? description({
      selectable: false,
      ellipsizeMode: descriptionEllipsizeMode,
      color: descriptionColor,
      fontSize: styles.description.fontSize
    }) : /*#__PURE__*/React.createElement(_Text.default, {
      selectable: false,
      numberOfLines: descriptionNumberOfLines,
      ellipsizeMode: descriptionEllipsizeMode,
      style: [styles.description, {
        color: descriptionColor
      }, descriptionStyle],
      onTextLayout: onDescriptionTextLayout,
      maxFontSizeMultiplier: descriptionMaxFontSizeMultiplier
    }, description);
  };
  const renderTitle = () => {
    const titleColor = theme.isV3 ? theme.colors.onSurface : (0, _color.default)(theme.colors.text).alpha(0.87).rgb().string();
    return typeof title === 'function' ? title({
      selectable: false,
      ellipsizeMode: titleEllipsizeMode,
      color: titleColor,
      fontSize: styles.title.fontSize
    }) : /*#__PURE__*/React.createElement(_Text.default, {
      selectable: false,
      ellipsizeMode: titleEllipsizeMode,
      numberOfLines: titleNumberOfLines,
      style: [styles.title, {
        color: titleColor
      }, titleStyle],
      maxFontSizeMultiplier: titleMaxFontSizeMultiplier
    }, title);
  };
  const descriptionColor = theme.isV3 ? theme.colors.onSurfaceVariant : (0, _color.default)(theme.colors.text).alpha(0.54).rgb().string();
  return /*#__PURE__*/React.createElement(_TouchableRipple.default, _extends({}, rest, {
    ref: ref,
    style: [theme.isV3 ? styles.containerV3 : styles.container, style],
    onPress: onPress,
    theme: theme,
    testID: testID
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [theme.isV3 ? styles.rowV3 : styles.row, containerStyle]
  }, left ? left({
    color: descriptionColor,
    style: (0, _utils.getLeftStyles)(alignToTop, description, theme.isV3)
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [theme.isV3 ? styles.itemV3 : styles.item, styles.content, contentStyle],
    testID: `${testID}-content`
  }, renderTitle(), description ? renderDescription(descriptionColor, description) : null), right ? right({
    color: descriptionColor,
    style: (0, _utils.getRightStyles)(alignToTop, description, theme.isV3)
  }) : null));
};
ListItem.displayName = 'List.Item';
const Component = (0, _forwardRef.forwardRef)(ListItem);
const styles = _reactNative.StyleSheet.create({
  container: {
    padding: 8
  },
  containerV3: {
    paddingVertical: 8,
    paddingRight: 24
  },
  row: {
    width: '100%',
    flexDirection: 'row'
  },
  rowV3: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 6
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 14
  },
  item: {
    marginVertical: 6,
    paddingLeft: 8
  },
  itemV3: {
    paddingLeft: 16
  },
  content: {
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: 'center'
  }
});
var _default = exports.default = Component;
//# sourceMappingURL=ListItem.js.map