import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { ApiKeyProvider } from './src/contexts/ApiKeyContext';
import { FeedbackHistoryProvider } from './src/contexts/FeedbackHistoryContext';
import IntroductionScreen from './src/screens/Introduction';
import OnboardingScreen from './src/screens/Onboarding';
import HomeScreen from './src/screens/Home';
import InterviewScreen from './src/screens/Interview';
import QuizScreen from './src/screens/Quiz';
import ResultsScreen from './src/screens/Results';
import HistoryScreen from './src/screens/History';
import { theme } from './src/styles/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApiKeyProvider>
      <FeedbackHistoryProvider>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.background}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background },
            }}
          >
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Interview" component={InterviewScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FeedbackHistoryProvider>
    </ApiKeyProvider>
  );
}
