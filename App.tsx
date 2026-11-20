import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme as NavTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastProvider } from './src/components/Toast';
import HistoryScreen from './src/screens/History';
import HomeScreen from './src/screens/Home';
import InterviewScreen from './src/screens/Interview';
import IntroductionScreen from './src/screens/Introduction';
import OnboardingScreen from './src/screens/Onboarding';
import QuizScreen from './src/screens/Quiz';
import ResultsScreen from './src/screens/Results';
import SettingsScreen from './src/screens/Settings';
import { AppProvider, useApp } from './src/state/app';
import { HistoryProvider } from './src/state/history';
import { ThemeProvider, useTheme } from './src/theme';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Rotas por estado: primeira abertura vê a apresentação; sem nome ou sem chave, a
 * configuração; depois disso, o app. Trocar a chave ou apagar os dados volta sozinho para o
 * passo certo, e a apresentação não se repete a cada abertura como na versão 1.0.
 */
function Routes() {
  const theme = useTheme();
  const { ready, settings, name, hasApiKey } = useApp();

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  const base = theme.scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme: NavTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme} documentTitle={{ formatter: () => 'Alfie' }}>
      <StatusBar
        barStyle={theme.scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {!settings.introSeen ? (
          <Stack.Screen name="Introduction" component={IntroductionScreen} />
        ) : !name || !hasApiKey ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Interview" component={InterviewScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Themed() {
  const { settings } = useApp();
  return (
    <ThemeProvider preference={settings.theme}>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <HistoryProvider>
          <Themed />
        </HistoryProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
