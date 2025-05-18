import color from 'color';
const getBorderColor = ({
  theme,
  disabled
}) => {
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.surfaceDisabled;
    }
    return theme.colors.outline;
  }
  return undefined;
};
const getBackgroundColor = ({
  theme,
  isMode,
  disabled,
  selected,
  customContainerColor
}) => {
  if (theme.isV3) {
    if (disabled) {
      if (isMode('contained') || isMode('contained-tonal')) {
        return theme.colors.surfaceDisabled;
      }
    }
    if (typeof customContainerColor !== 'undefined') {
      return customContainerColor;
    }
    if (isMode('contained')) {
      if (selected) {
        return theme.colors.primary;
      }
      return theme.colors.surfaceVariant;
    }
    if (isMode('contained-tonal')) {
      if (selected) {
        return theme.colors.secondaryContainer;
      }
      return theme.colors.surfaceVariant;
    }
    if (isMode('outlined')) {
      if (selected) {
        return theme.colors.inverseSurface;
      }
    }
  }
  if (typeof customContainerColor !== 'undefined') {
    return customContainerColor;
  }
  return undefined;
};
const getIconColor = ({
  theme,
  isMode,
  disabled,
  selected,
  customIconColor
}) => {
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    }
    if (typeof customIconColor !== 'undefined') {
      return customIconColor;
    }
    if (isMode('contained')) {
      if (selected) {
        return theme.colors.onPrimary;
      }
      return theme.colors.primary;
    }
    if (isMode('contained-tonal')) {
      if (selected) {
        return theme.colors.onSecondaryContainer;
      }
      return theme.colors.onSurfaceVariant;
    }
    if (isMode('outlined')) {
      if (selected) {
        return theme.colors.inverseOnSurface;
      }
      return theme.colors.onSurfaceVariant;
    }
    if (selected) {
      return theme.colors.primary;
    }
    return theme.colors.onSurfaceVariant;
  }
  if (typeof customIconColor !== 'undefined') {
    return customIconColor;
  }
  return theme.colors.text;
};
const getRippleColor = ({
  theme,
  iconColor,
  customRippleColor
}) => {
  if (customRippleColor) {
    return customRippleColor;
  }
  if (theme.isV3) {
    return color(iconColor).alpha(0.12).rgb().string();
  }
  return color(iconColor).alpha(0.32).rgb().string();
};
export const getIconButtonColor = ({
  theme,
  disabled,
  mode,
  selected,
  customIconColor,
  customContainerColor,
  customRippleColor
}) => {
  const isMode = modeToCompare => {
    return mode === modeToCompare;
  };
  const baseIconColorProps = {
    theme,
    isMode,
    disabled,
    selected
  };
  const iconColor = getIconColor({
    ...baseIconColorProps,
    customIconColor
  });
  return {
    iconColor,
    backgroundColor: getBackgroundColor({
      ...baseIconColorProps,
      customContainerColor
    }),
    rippleColor: getRippleColor({
      theme,
      iconColor,
      customRippleColor
    }),
    borderColor: getBorderColor({
      theme,
      disabled
    })
  };
};
//# sourceMappingURL=utils.js.map