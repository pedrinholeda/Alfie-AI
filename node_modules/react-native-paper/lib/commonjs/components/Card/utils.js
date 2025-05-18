"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardCoverStyle = exports.getCardColors = void 0;
var _color = _interopRequireDefault(require("color"));
var _colors = require("../../styles/themes/v2/colors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getCardCoverStyle = ({
  theme,
  index,
  total,
  borderRadiusStyles
}) => {
  const {
    isV3,
    roundness
  } = theme;
  if (Object.keys(borderRadiusStyles).length > 0) {
    return {
      borderRadius: 3 * roundness,
      ...borderRadiusStyles
    };
  }
  if (isV3) {
    return {
      borderRadius: 3 * roundness
    };
  }
  if (index === 0) {
    if (total === 1) {
      return {
        borderRadius: roundness
      };
    }
    return {
      borderTopLeftRadius: roundness,
      borderTopRightRadius: roundness
    };
  }
  if (typeof total === 'number' && index === total - 1) {
    return {
      borderBottomLeftRadius: roundness
    };
  }
  return undefined;
};
exports.getCardCoverStyle = getCardCoverStyle;
const getBorderColor = ({
  theme
}) => {
  if (theme.isV3) {
    return theme.colors.outline;
  }
  if (theme.dark) {
    return (0, _color.default)(_colors.white).alpha(0.12).rgb().string();
  }
  return (0, _color.default)(_colors.black).alpha(0.12).rgb().string();
};
const getBackgroundColor = ({
  theme,
  isMode
}) => {
  if (theme.isV3) {
    if (isMode('contained')) {
      return theme.colors.surfaceVariant;
    }
    if (isMode('outlined')) {
      return theme.colors.surface;
    }
  }
  return undefined;
};
const getCardColors = ({
  theme,
  mode
}) => {
  const isMode = modeToCompare => {
    return mode === modeToCompare;
  };
  return {
    backgroundColor: getBackgroundColor({
      theme,
      isMode
    }),
    borderColor: getBorderColor({
      theme
    })
  };
};
exports.getCardColors = getCardColors;
//# sourceMappingURL=utils.js.map