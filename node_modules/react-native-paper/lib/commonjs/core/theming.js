"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = exports.DefaultTheme = void 0;
exports.adaptNavigationTheme = adaptNavigationTheme;
exports.useInternalTheme = exports.useAppTheme = exports.getTheme = exports.getDynamicThemeElevations = exports.defaultThemesByVersion = void 0;
exports.useTheme = useTheme;
exports.withTheme = exports.withInternalTheme = void 0;
var _reactThemeProvider = require("@callstack/react-theme-provider");
var _color = _interopRequireDefault(require("color"));
var _themes = require("../styles/themes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DefaultTheme = exports.DefaultTheme = _themes.MD3LightTheme;
const {
  ThemeProvider,
  withTheme,
  useTheme: useAppTheme
} = (0, _reactThemeProvider.createTheming)(_themes.MD3LightTheme);
exports.useAppTheme = useAppTheme;
exports.withTheme = withTheme;
exports.ThemeProvider = ThemeProvider;
function useTheme(overrides) {
  return useAppTheme(overrides);
}
const useInternalTheme = themeOverrides => useAppTheme(themeOverrides);
exports.useInternalTheme = useInternalTheme;
const withInternalTheme = WrappedComponent => withTheme(WrappedComponent);
exports.withInternalTheme = withInternalTheme;
const defaultThemesByVersion = exports.defaultThemesByVersion = {
  2: {
    light: _themes.MD2LightTheme,
    dark: _themes.MD2DarkTheme
  },
  3: {
    light: _themes.MD3LightTheme,
    dark: _themes.MD3DarkTheme
  }
};
const getTheme = (isDark = false, isV3 = true) => {
  const themeVersion = isV3 ? 3 : 2;
  const scheme = isDark ? 'dark' : 'light';
  return defaultThemesByVersion[themeVersion][scheme];
};

// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare
exports.getTheme = getTheme;
// eslint-disable-next-line no-redeclare
function adaptNavigationTheme(themes) {
  const {
    reactNavigationLight,
    reactNavigationDark,
    materialLight,
    materialDark
  } = themes;
  const MD3Themes = {
    light: materialLight || _themes.MD3LightTheme,
    dark: materialDark || _themes.MD3DarkTheme
  };
  const result = {};
  if (reactNavigationLight) {
    result.LightTheme = getAdaptedTheme(reactNavigationLight, MD3Themes.light);
  }
  if (reactNavigationDark) {
    result.DarkTheme = getAdaptedTheme(reactNavigationDark, MD3Themes.dark);
  }
  return result;
}
const getAdaptedTheme = (theme, materialTheme) => {
  const base = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: materialTheme.colors.primary,
      background: materialTheme.colors.background,
      card: materialTheme.colors.elevation.level2,
      text: materialTheme.colors.onSurface,
      border: materialTheme.colors.outline,
      notification: materialTheme.colors.error
    }
  };
  if ('fonts' in theme) {
    return {
      ...base,
      fonts: {
        regular: {
          fontFamily: materialTheme.fonts.bodyMedium.fontFamily,
          fontWeight: materialTheme.fonts.bodyMedium.fontWeight,
          letterSpacing: materialTheme.fonts.bodyMedium.letterSpacing
        },
        medium: {
          fontFamily: materialTheme.fonts.titleMedium.fontFamily,
          fontWeight: materialTheme.fonts.titleMedium.fontWeight,
          letterSpacing: materialTheme.fonts.titleMedium.letterSpacing
        },
        bold: {
          fontFamily: materialTheme.fonts.headlineSmall.fontFamily,
          fontWeight: materialTheme.fonts.headlineSmall.fontWeight,
          letterSpacing: materialTheme.fonts.headlineSmall.letterSpacing
        },
        heavy: {
          fontFamily: materialTheme.fonts.headlineLarge.fontFamily,
          fontWeight: materialTheme.fonts.headlineLarge.fontWeight,
          letterSpacing: materialTheme.fonts.headlineLarge.letterSpacing
        }
      }
    };
  }
  return base;
};
const getDynamicThemeElevations = scheme => {
  const elevationValues = ['transparent', 0.05, 0.08, 0.11, 0.12, 0.14];
  return elevationValues.reduce((elevations, elevationValue, index) => {
    return {
      ...elevations,
      [`level${index}`]: index === 0 ? elevationValue : (0, _color.default)(scheme.surface).mix((0, _color.default)(scheme.primary), elevationValue).rgb().string()
    };
  }, {});
};
exports.getDynamicThemeElevations = getDynamicThemeElevations;
//# sourceMappingURL=theming.js.map