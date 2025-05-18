import color from 'color';
export function getTextColor({
  theme,
  disabled,
  type
}) {
  var _theme$colors;
  const {
    colors,
    dark
  } = theme;
  if (type === 'error') {
    return colors === null || colors === void 0 ? void 0 : colors.error;
  }
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    } else {
      return theme.colors.onSurfaceVariant;
    }
  }
  return color(theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.text).alpha(dark ? 0.7 : 0.54).rgb().string();
}
//# sourceMappingURL=utils.js.map