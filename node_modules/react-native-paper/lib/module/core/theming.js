import { createTheming } from '@callstack/react-theme-provider';
import color from 'color';
import { MD2DarkTheme, MD2LightTheme, MD3DarkTheme, MD3LightTheme } from '../styles/themes';
export const DefaultTheme = MD3LightTheme;
export const {
  ThemeProvider,
  withTheme,
  useTheme: useAppTheme
} = createTheming(MD3LightTheme);
export function useTheme(overrides) {
  return useAppTheme(overrides);
}
export const useInternalTheme = themeOverrides => useAppTheme(themeOverrides);
export const withInternalTheme = WrappedComponent => withTheme(WrappedComponent);
export const defaultThemesByVersion = {
  2: {
    light: MD2LightTheme,
    dark: MD2DarkTheme
  },
  3: {
    light: MD3LightTheme,
    dark: MD3DarkTheme
  }
};
export const getTheme = (isDark = false, isV3 = true) => {
  const themeVersion = isV3 ? 3 : 2;
  const scheme = isDark ? 'dark' : 'light';
  return defaultThemesByVersion[themeVersion][scheme];
};

// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare
export function adaptNavigationTheme(themes) {
  const {
    reactNavigationLight,
    reactNavigationDark,
    materialLight,
    materialDark
  } = themes;
  const MD3Themes = {
    light: materialLight || MD3LightTheme,
    dark: materialDark || MD3DarkTheme
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
export const getDynamicThemeElevations = scheme => {
  const elevationValues = ['transparent', 0.05, 0.08, 0.11, 0.12, 0.14];
  return elevationValues.reduce((elevations, elevationValue, index) => {
    return {
      ...elevations,
      [`level${index}`]: index === 0 ? elevationValue : color(scheme.surface).mix(color(scheme.primary), elevationValue).rgb().string()
    };
  }, {});
};
//# sourceMappingURL=theming.js.map