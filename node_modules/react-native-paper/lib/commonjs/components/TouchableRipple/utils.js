"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTouchableRippleColors = void 0;
var _color = _interopRequireDefault(require("color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getUnderlayColor = ({
  theme,
  calculatedRippleColor,
  underlayColor
}) => {
  if (underlayColor != null) {
    return underlayColor;
  }
  if (theme.isV3) {
    return (0, _color.default)(calculatedRippleColor).rgb().string();
  }
  return (0, _color.default)(calculatedRippleColor).fade(0.5).rgb().string();
};
const getRippleColor = ({
  theme,
  rippleColor
}) => {
  if (rippleColor) {
    return rippleColor;
  }
  if (theme.isV3) {
    return (0, _color.default)(theme.colors.onSurface).alpha(0.12).rgb().string();
  }
  if (theme.dark) {
    return (0, _color.default)(theme.colors.text).alpha(0.32).rgb().string();
  }
  return (0, _color.default)(theme.colors.text).alpha(0.2).rgb().string();
};
const getTouchableRippleColors = ({
  theme,
  rippleColor,
  underlayColor
}) => {
  const calculatedRippleColor = getRippleColor({
    theme,
    rippleColor
  });
  return {
    calculatedRippleColor,
    calculatedUnderlayColor: getUnderlayColor({
      theme,
      calculatedRippleColor,
      underlayColor
    })
  };
};
exports.getTouchableRippleColors = getTouchableRippleColors;
//# sourceMappingURL=utils.js.map