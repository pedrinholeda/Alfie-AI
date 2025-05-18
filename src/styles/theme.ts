export const theme = {
  colors: {
    primary: '#6C63FF',
    secondary: '#4CAF50',
    background: '#121214',
    surface: '#1C1C21',
    surfaceLight: '#29292E',
    text: '#E1E1E6',
    textSecondary: '#A8A8B3',
    error: '#FF4444',
    success: '#4CAF50',
    warning: '#FFB74D',
    border: '#29292E',
  },
  fonts: {
    regular: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
    bold: 'Roboto_700Bold',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
    small: {
      fontSize: 12,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
} as const;

export type Theme = typeof theme; 