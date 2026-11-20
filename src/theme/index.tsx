/**
 * Tema do Alfie: tokens de cor para claro e escuro, espaçamento, raios e tipografia.
 * As telas pegam o tema com useTheme() e montam os estilos com useStyles(makeStyles).
 */
import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export type ThemePreference = 'system' | 'light' | 'dark';

const palette = {
  light: {
    background: '#F6F5FB',
    surface: '#FFFFFF',
    surfaceAlt: '#EFEDF8',
    border: '#E2DFF0',
    text: '#17162A',
    textMuted: '#5E5B76',
    textSubtle: '#8D8AA5',
    primary: '#5B4FE9',
    primaryText: '#FFFFFF',
    primarySoft: '#ECEAFE',
    success: '#16865A',
    successSoft: '#E3F5EC',
    warning: '#B26A00',
    warningSoft: '#FDF1DC',
    danger: '#C93636',
    dangerSoft: '#FCE8E8',
    overlay: 'rgba(23, 22, 42, 0.45)',
  },
  dark: {
    background: '#0F0E17',
    surface: '#1A1926',
    surfaceAlt: '#242233',
    border: '#2E2C40',
    text: '#EDECF5',
    textMuted: '#A9A6C0',
    textSubtle: '#76738F',
    primary: '#8B80FF',
    primaryText: '#0F0E17',
    primarySoft: '#2A2650',
    success: '#4CC995',
    successSoft: '#143327',
    warning: '#F2B35B',
    warningSoft: '#3A2A12',
    danger: '#F07272',
    dangerSoft: '#3D1A1C',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

export type Colors = typeof palette.light;

const base = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, full: 999 },
  type: {
    display: { fontSize: 30, lineHeight: 36, fontWeight: '800' as const },
    title: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
    heading: { fontSize: 17, lineHeight: 23, fontWeight: '700' as const },
    body: { fontSize: 16, lineHeight: 23, fontWeight: '400' as const },
    label: { fontSize: 14, lineHeight: 19, fontWeight: '600' as const },
    caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' as const },
  },
  /** Largura máxima do conteúdo na web e em tablets. */
  maxWidth: 640,
};

export interface Theme {
  scheme: 'light' | 'dark';
  colors: Colors;
  spacing: typeof base.spacing;
  radius: typeof base.radius;
  type: typeof base.type;
  maxWidth: number;
}

const buildTheme = (scheme: 'light' | 'dark'): Theme => ({
  scheme,
  colors: palette[scheme],
  ...base,
});

const ThemeContext = createContext<Theme>(buildTheme('dark'));

export function ThemeProvider({
  preference,
  children,
}: {
  preference: ThemePreference;
  children: React.ReactNode;
}) {
  const system = useColorScheme();
  const scheme = preference === 'system' ? (system === 'light' ? 'light' : 'dark') : preference;
  const theme = useMemo(() => buildTheme(scheme), [scheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/** Monta um StyleSheet a partir do tema atual, refeito só quando o tema muda. */
export function useStyles<T extends StyleSheet.NamedStyles<T>>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => StyleSheet.create(factory(theme)), [factory, theme]);
}

/** Cor de uma nota de 0 a 10. */
export function scoreColors(theme: Theme, score: number): { fg: string; bg: string } {
  if (score >= 7) return { fg: theme.colors.success, bg: theme.colors.successSoft };
  if (score >= 5) return { fg: theme.colors.warning, bg: theme.colors.warningSoft };
  return { fg: theme.colors.danger, bg: theme.colors.dangerSoft };
}
