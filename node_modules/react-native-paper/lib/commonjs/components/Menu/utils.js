"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemColor = exports.getContentMaxWidth = exports.MIN_WIDTH = exports.MAX_WIDTH = void 0;
var _color = _interopRequireDefault(require("color"));
var _colors = require("../../styles/themes/v2/colors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MIN_WIDTH = exports.MIN_WIDTH = 112;
const MAX_WIDTH = exports.MAX_WIDTH = 280;
const getDisabledColor = theme => {
  if (theme.isV3) {
    return theme.colors.onSurfaceDisabled;
  }
  return (0, _color.default)(theme.dark ? _colors.white : _colors.black).alpha(0.32).rgb().string();
};
const getTitleColor = ({
  theme,
  disabled
}) => {
  if (disabled) {
    return getDisabledColor(theme);
  }
  if (theme.isV3) {
    return theme.colors.onSurface;
  }
  return (0, _color.default)(theme.colors.text).alpha(0.87).rgb().string();
};
const getIconColor = ({
  theme,
  disabled
}) => {
  if (disabled) {
    return getDisabledColor(theme);
  }
  if (theme.isV3) {
    return theme.colors.onSurfaceVariant;
  }
  return (0, _color.default)(theme.colors.text).alpha(0.54).rgb().string();
};
const getRippleColor = ({
  theme,
  customRippleColor
}) => {
  if (customRippleColor) {
    return customRippleColor;
  }
  if (theme.isV3) {
    return (0, _color.default)(theme.colors.onSurfaceVariant).alpha(0.12).rgb().string();
  }
  return undefined;
};
const getMenuItemColor = ({
  theme,
  disabled,
  customRippleColor
}) => {
  return {
    titleColor: getTitleColor({
      theme,
      disabled
    }),
    iconColor: getIconColor({
      theme,
      disabled
    }),
    rippleColor: getRippleColor({
      theme,
      customRippleColor
    })
  };
};
exports.getMenuItemColor = getMenuItemColor;
const getContentMaxWidth = ({
  isV3,
  iconWidth,
  leadingIcon,
  trailingIcon
}) => {
  if (isV3) {
    if (leadingIcon && trailingIcon) {
      return MAX_WIDTH - (2 * iconWidth + 24);
    }
    if (leadingIcon || trailingIcon) {
      return MAX_WIDTH - (iconWidth + 24);
    }
    return MAX_WIDTH - 12;
  }
  if (leadingIcon) {
    return MAX_WIDTH - (iconWidth + 48);
  }
  return MAX_WIDTH - 16;
};
exports.getContentMaxWidth = getContentMaxWidth;
//# sourceMappingURL=utils.js.map