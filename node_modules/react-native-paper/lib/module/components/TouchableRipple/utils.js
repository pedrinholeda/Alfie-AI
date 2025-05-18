import color from 'color';
const getUnderlayColor = ({
  theme,
  calculatedRippleColor,
  underlayColor
}) => {
  if (underlayColor != null) {
    return underlayColor;
  }
  if (theme.isV3) {
    return color(calculatedRippleColor).rgb().string();
  }
  return color(calculatedRippleColor).fade(0.5).rgb().string();
};
const getRippleColor = ({
  theme,
  rippleColor
}) => {
  if (rippleColor) {
    return rippleColor;
  }
  if (theme.isV3) {
    return color(theme.colors.onSurface).alpha(0.12).rgb().string();
  }
  if (theme.dark) {
    return color(theme.colors.text).alpha(0.32).rgb().string();
  }
  return color(theme.colors.text).alpha(0.2).rgb().string();
};
export const getTouchableRippleColors = ({
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
//# sourceMappingURL=utils.js.map