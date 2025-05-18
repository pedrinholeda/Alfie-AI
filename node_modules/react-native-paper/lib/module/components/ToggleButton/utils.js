import color from 'color';
import { tokens } from '../../styles/themes/v3/tokens';
export const getToggleButtonColor = ({
  theme,
  checked
}) => {
  if (checked) {
    if (theme.isV3) {
      return color(theme.colors.onSecondaryContainer).alpha(tokens.md.ref.opacity.level2).rgb().string();
    }
    if (theme.dark) {
      return 'rgba(255, 255, 255, .12)';
    }
    return 'rgba(0, 0, 0, .08)';
  }
  return 'transparent';
};
//# sourceMappingURL=utils.js.map