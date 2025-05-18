"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconColor = getIconColor;
exports.getTextColor = getTextColor;
var _color = _interopRequireDefault(require("color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getTextColor({
  theme,
  disabled
}) {
  var _theme$colors;
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    }
    return theme.colors.onSurfaceVariant;
  }
  return (0, _color.default)((_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.text).alpha(theme.dark ? 0.7 : 0.54).rgb().string();
}
function getIconColor({
  theme,
  isTextInputFocused,
  disabled,
  customColor
}) {
  if (typeof customColor === 'function') {
    return customColor(isTextInputFocused);
  }
  if (customColor) {
    return customColor;
  }
  if (!theme.isV3) {
    return theme.colors.text;
  }
  if (disabled) {
    return theme.colors.onSurfaceDisabled;
  }
  return theme.colors.onSurfaceVariant;
}
//# sourceMappingURL=utils.js.map