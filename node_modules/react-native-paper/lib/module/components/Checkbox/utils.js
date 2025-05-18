import color from 'color';
const getAndroidCheckedColor = ({
  theme,
  customColor
}) => {
  if (customColor) {
    return customColor;
  }
  if (theme.isV3) {
    return theme.colors.primary;
  }
  return theme.colors.accent;
};
const getAndroidUncheckedColor = ({
  theme,
  customUncheckedColor
}) => {
  if (customUncheckedColor) {
    return customUncheckedColor;
  }
  if (theme.isV3) {
    return theme.colors.onSurfaceVariant;
  }
  if (theme.dark) {
    return color(theme.colors.text).alpha(0.7).rgb().string();
  }
  return color(theme.colors.text).alpha(0.54).rgb().string();
};
const getAndroidRippleColor = ({
  theme,
  checkedColor,
  disabled
}) => {
  if (disabled) {
    if (theme.isV3) {
      return color(theme.colors.onSurface).alpha(0.16).rgb().string();
    }
    return color(theme.colors.text).alpha(0.16).rgb().string();
  }
  return color(checkedColor).fade(0.32).rgb().string();
};
const getAndroidControlColor = ({
  theme,
  checked,
  disabled,
  checkedColor,
  uncheckedColor
}) => {
  if (disabled) {
    if (theme.isV3) {
      return theme.colors.onSurfaceDisabled;
    }
    return theme.colors.disabled;
  }
  if (checked) {
    return checkedColor;
  }
  return uncheckedColor;
};
export const getAndroidSelectionControlColor = ({
  theme,
  disabled,
  checked,
  customColor,
  customUncheckedColor
}) => {
  const checkedColor = getAndroidCheckedColor({
    theme,
    customColor
  });
  const uncheckedColor = getAndroidUncheckedColor({
    theme,
    customUncheckedColor
  });
  return {
    rippleColor: getAndroidRippleColor({
      theme,
      checkedColor,
      disabled
    }),
    selectionControlColor: getAndroidControlColor({
      theme,
      disabled,
      checked,
      checkedColor,
      uncheckedColor
    })
  };
};
const getIOSCheckedColor = ({
  theme,
  disabled,
  customColor
}) => {
  if (disabled) {
    if (theme.isV3) {
      return theme.colors.onSurfaceDisabled;
    }
    return theme.colors.disabled;
  }
  if (customColor) {
    return customColor;
  }
  if (theme.isV3) {
    return theme.colors.primary;
  }
  return theme.colors.accent;
};
const getIOSRippleColor = ({
  theme,
  checkedColor,
  disabled
}) => {
  if (disabled) {
    if (theme.isV3) {
      return color(theme.colors.onSurface).alpha(0.16).rgb().string();
    }
    return color(theme.colors.text).alpha(0.16).rgb().string();
  }
  return color(checkedColor).fade(0.32).rgb().string();
};
export const getSelectionControlIOSColor = ({
  theme,
  disabled,
  customColor
}) => {
  const checkedColor = getIOSCheckedColor({
    theme,
    disabled,
    customColor
  });
  return {
    checkedColor,
    rippleColor: getIOSRippleColor({
      theme,
      checkedColor,
      disabled
    })
  };
};
//# sourceMappingURL=utils.js.map