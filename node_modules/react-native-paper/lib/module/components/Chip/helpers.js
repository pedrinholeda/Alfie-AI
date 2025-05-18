import color from 'color';
import { black, white } from '../../styles/themes/v2/colors';
const getBorderColor = ({
  theme,
  isOutlined,
  disabled,
  selectedColor,
  backgroundColor
}) => {
  const isSelectedColor = selectedColor !== undefined;
  if (theme.isV3) {
    if (!isOutlined) {
      // If the Chip mode is "flat", set border color to transparent
      return 'transparent';
    }
    if (disabled) {
      return color(theme.colors.onSurfaceVariant).alpha(0.12).rgb().string();
    }
    if (isSelectedColor) {
      return color(selectedColor).alpha(0.29).rgb().string();
    }
    return theme.colors.outline;
  }
  if (isOutlined) {
    if (isSelectedColor) {
      return color(selectedColor).alpha(0.29).rgb().string();
    }
    if (theme.dark) {
      return color(white).alpha(0.29).rgb().string();
    }
    return color(black).alpha(0.29).rgb().string();
  }
  return backgroundColor;
};
const getTextColor = ({
  theme,
  isOutlined,
  disabled,
  selectedColor
}) => {
  const isSelectedColor = selectedColor !== undefined;
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    }
    if (isSelectedColor) {
      return selectedColor;
    }
    if (isOutlined) {
      return theme.colors.onSurfaceVariant;
    }
    return theme.colors.onSecondaryContainer;
  }
  if (disabled) {
    return theme.colors.disabled;
  }
  if (isSelectedColor) {
    return color(selectedColor).alpha(0.87).rgb().string();
  }
  return color(theme.colors.text).alpha(0.87).rgb().string();
};
const getDefaultBackgroundColor = ({
  theme,
  isOutlined
}) => {
  if (theme.isV3) {
    if (isOutlined) {
      return theme.colors.surface;
    }
    return theme.colors.secondaryContainer;
  }
  if (isOutlined) {
    var _theme$colors;
    return (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.surface;
  }
  if (theme.dark) {
    return '#383838';
  }
  return '#ebebeb';
};
const getBackgroundColor = ({
  theme,
  isOutlined,
  disabled,
  customBackgroundColor
}) => {
  if (typeof customBackgroundColor === 'string') {
    return customBackgroundColor;
  }
  if (theme.isV3) {
    if (disabled) {
      if (isOutlined) {
        return 'transparent';
      }
      return color(theme.colors.onSurfaceVariant).alpha(0.12).rgb().string();
    }
  }
  return getDefaultBackgroundColor({
    theme,
    isOutlined
  });
};
const getSelectedBackgroundColor = ({
  theme,
  isOutlined,
  disabled,
  customBackgroundColor,
  showSelectedOverlay
}) => {
  const backgroundColor = getBackgroundColor({
    theme,
    disabled,
    isOutlined,
    customBackgroundColor
  });
  if (theme.isV3) {
    if (isOutlined) {
      if (showSelectedOverlay) {
        return color(backgroundColor).mix(color(theme.colors.onSurfaceVariant), 0.12).rgb().string();
      }
      return color(backgroundColor).mix(color(theme.colors.onSurfaceVariant), 0).rgb().string();
    }
    if (showSelectedOverlay) {
      return color(backgroundColor).mix(color(theme.colors.onSecondaryContainer), 0.12).rgb().string();
    }
    return color(backgroundColor).mix(color(theme.colors.onSecondaryContainer), 0).rgb().string();
  }
  if (theme.dark) {
    if (isOutlined) {
      return color(backgroundColor).lighten(0.2).rgb().string();
    }
    return color(backgroundColor).lighten(0.4).rgb().string();
  }
  if (isOutlined) {
    return color(backgroundColor).darken(0.08).rgb().string();
  }
  return color(backgroundColor).darken(0.2).rgb().string();
};
const getIconColor = ({
  theme,
  isOutlined,
  disabled,
  selectedColor
}) => {
  const isSelectedColor = selectedColor !== undefined;
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    }
    if (isSelectedColor) {
      return selectedColor;
    }
    if (isOutlined) {
      return theme.colors.onSurfaceVariant;
    }
    return theme.colors.onSecondaryContainer;
  }
  if (disabled) {
    return theme.colors.disabled;
  }
  if (isSelectedColor) {
    return color(selectedColor).alpha(0.54).rgb().string();
  }
  return color(theme.colors.text).alpha(0.54).rgb().string();
};
const getRippleColor = ({
  theme,
  isOutlined,
  disabled,
  selectedColor,
  selectedBackgroundColor,
  customRippleColor
}) => {
  if (customRippleColor) {
    return customRippleColor;
  }
  const isSelectedColor = selectedColor !== undefined;
  const textColor = getTextColor({
    theme,
    disabled,
    selectedColor,
    isOutlined
  });
  if (theme.isV3) {
    if (isSelectedColor) {
      return color(selectedColor).alpha(0.12).rgb().string();
    }
    return color(textColor).alpha(0.12).rgb().string();
  }
  if (isSelectedColor) {
    return color(selectedColor).fade(0.5).rgb().string();
  }
  return selectedBackgroundColor;
};
export const getChipColors = ({
  isOutlined,
  theme,
  selectedColor,
  showSelectedOverlay,
  customBackgroundColor,
  disabled,
  customRippleColor
}) => {
  const baseChipColorProps = {
    theme,
    isOutlined,
    disabled
  };
  const backgroundColor = getBackgroundColor({
    ...baseChipColorProps,
    customBackgroundColor
  });
  const selectedBackgroundColor = getSelectedBackgroundColor({
    ...baseChipColorProps,
    customBackgroundColor,
    showSelectedOverlay
  });
  return {
    borderColor: getBorderColor({
      ...baseChipColorProps,
      selectedColor,
      backgroundColor
    }),
    textColor: getTextColor({
      ...baseChipColorProps,
      selectedColor
    }),
    iconColor: getIconColor({
      ...baseChipColorProps,
      selectedColor
    }),
    rippleColor: getRippleColor({
      ...baseChipColorProps,
      selectedColor,
      selectedBackgroundColor,
      customRippleColor
    }),
    backgroundColor,
    selectedBackgroundColor
  };
};
//# sourceMappingURL=helpers.js.map