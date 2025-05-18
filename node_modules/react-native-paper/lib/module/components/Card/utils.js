import color from 'color';
import { black, white } from '../../styles/themes/v2/colors';
export const getCardCoverStyle = ({
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
const getBorderColor = ({
  theme
}) => {
  if (theme.isV3) {
    return theme.colors.outline;
  }
  if (theme.dark) {
    return color(white).alpha(0.12).rgb().string();
  }
  return color(black).alpha(0.12).rgb().string();
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
export const getCardColors = ({
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
//# sourceMappingURL=utils.js.map