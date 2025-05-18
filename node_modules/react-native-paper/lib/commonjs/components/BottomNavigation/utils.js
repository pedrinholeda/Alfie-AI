"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLabelColor = exports.getInactiveTintColor = exports.getActiveTintColor = void 0;
var _color = _interopRequireDefault(require("color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getActiveTintColor = ({
  activeColor,
  defaultColor,
  theme
}) => {
  if (typeof activeColor === 'string') {
    return activeColor;
  }
  if (theme.isV3) {
    return theme.colors.onSecondaryContainer;
  }
  return defaultColor;
};
exports.getActiveTintColor = getActiveTintColor;
const getInactiveTintColor = ({
  inactiveColor,
  defaultColor,
  theme
}) => {
  if (typeof inactiveColor === 'string') {
    return inactiveColor;
  }
  if (theme.isV3) {
    return theme.colors.onSurfaceVariant;
  }
  return (0, _color.default)(defaultColor).alpha(0.5).rgb().string();
};
exports.getInactiveTintColor = getInactiveTintColor;
const getLabelColor = ({
  tintColor,
  hasColor,
  focused,
  defaultColor,
  theme
}) => {
  if (hasColor) {
    return tintColor;
  }
  if (theme.isV3) {
    if (focused) {
      return theme.colors.onSurface;
    }
    return theme.colors.onSurfaceVariant;
  }
  return defaultColor;
};
exports.getLabelColor = getLabelColor;
//# sourceMappingURL=utils.js.map