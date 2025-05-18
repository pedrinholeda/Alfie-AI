import { StyleSheet } from 'react-native';
import color from 'color';
import { black, white } from '../../styles/themes/v2/colors';
const DEFAULT_PADDING = 9;
export const getSegmentedButtonDensityPadding = ({
  density
}) => {
  let padding = DEFAULT_PADDING;
  switch (density) {
    case 'small':
      return padding - 2;
    case 'medium':
      return padding - 4;
    case 'high':
      return padding - 8;
    default:
      return padding;
  }
};
export const getDisabledSegmentedButtonStyle = ({
  theme,
  index,
  buttons
}) => {
  var _buttons$index, _buttons;
  const width = getSegmentedButtonBorderWidth({
    theme
  });
  const isDisabled = (_buttons$index = buttons[index]) === null || _buttons$index === void 0 ? void 0 : _buttons$index.disabled;
  const isNextDisabled = (_buttons = buttons[index + 1]) === null || _buttons === void 0 ? void 0 : _buttons.disabled;
  if (!isDisabled && isNextDisabled) {
    return {
      borderRightWidth: width
    };
  }
  return {};
};
export const getSegmentedButtonBorderRadius = ({
  segment,
  theme
}) => {
  if (segment === 'first') {
    return {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      ...(theme.isV3 && {
        borderEndWidth: 0
      })
    };
  } else if (segment === 'last') {
    return {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    };
  } else {
    return {
      borderRadius: 0,
      ...(theme.isV3 && {
        borderEndWidth: 0
      })
    };
  }
};
const getSegmentedButtonBackgroundColor = ({
  checked,
  theme
}) => {
  if (checked) {
    if (theme.isV3) {
      return theme.colors.secondaryContainer;
    } else {
      return color(theme.colors.primary).alpha(0.12).rgb().string();
    }
  }
  return 'transparent';
};
const getSegmentedButtonBorderColor = ({
  theme,
  disabled,
  checked
}) => {
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.surfaceDisabled;
    }
    return theme.colors.outline;
  }
  if (checked) {
    return theme.colors.primary;
  }
  return color(theme.dark ? white : black).alpha(0.29).rgb().string();
};
const getSegmentedButtonBorderWidth = ({
  theme
}) => {
  if (theme.isV3) {
    return 1;
  }
  return StyleSheet.hairlineWidth;
};
const getSegmentedButtonTextColor = ({
  theme,
  disabled,
  checked,
  checkedColor,
  uncheckedColor
}) => {
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    }
    if (checked) {
      return checkedColor ?? theme.colors.onSecondaryContainer;
    }
    return uncheckedColor ?? theme.colors.onSurface;
  }
  if (disabled) {
    return theme.colors.disabled;
  }
  // Primary color is used for checked state too.
  return theme.colors.primary;
};
export const getSegmentedButtonColors = ({
  theme,
  disabled,
  checked,
  checkedColor,
  uncheckedColor
}) => {
  const backgroundColor = getSegmentedButtonBackgroundColor({
    theme,
    checked
  });
  const borderColor = getSegmentedButtonBorderColor({
    theme,
    disabled,
    checked
  });
  const textColor = getSegmentedButtonTextColor({
    theme,
    disabled,
    checked,
    checkedColor,
    uncheckedColor
  });
  const borderWidth = getSegmentedButtonBorderWidth({
    theme
  });
  return {
    backgroundColor,
    borderColor,
    textColor,
    borderWidth
  };
};
//# sourceMappingURL=utils.js.map