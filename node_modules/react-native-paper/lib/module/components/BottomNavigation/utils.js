import color from 'color';
export const getActiveTintColor = ({
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
export const getInactiveTintColor = ({
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
  return color(defaultColor).alpha(0.5).rgb().string();
};
export const getLabelColor = ({
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
//# sourceMappingURL=utils.js.map