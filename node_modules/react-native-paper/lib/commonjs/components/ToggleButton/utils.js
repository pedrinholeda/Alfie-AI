"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToggleButtonColor = void 0;
var _color = _interopRequireDefault(require("color"));
var _tokens = require("../../styles/themes/v3/tokens");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getToggleButtonColor = ({
  theme,
  checked
}) => {
  if (checked) {
    if (theme.isV3) {
      return (0, _color.default)(theme.colors.onSecondaryContainer).alpha(_tokens.tokens.md.ref.opacity.level2).rgb().string();
    }
    if (theme.dark) {
      return 'rgba(255, 255, 255, .12)';
    }
    return 'rgba(0, 0, 0, .08)';
  }
  return 'transparent';
};
exports.getToggleButtonColor = getToggleButtonColor;
//# sourceMappingURL=utils.js.map