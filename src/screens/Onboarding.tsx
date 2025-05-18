import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useApiKey } from '../contexts/ApiKeyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';
import SafeLayout from '../components/SafeLayout';
import AlfieAvatar from '../components/AlfieAvatar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardAwareView from '../components/KeyboardAwareView';

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const { setApiKey, needsApiKey, loading } = useApiKey();

  const handleApiKeySubmit = async () => {
    try {
      setError('');
      if (!apiKeyInput.trim()) {
        setError('Por favor, insira uma API key.');
        return;
      }

      const success = await setApiKey(apiKeyInput.trim());
      if (!success) {
        setError('API key inválida. Por favor, verifique a chave e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao configurar API key:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro ao validar a API key. Por favor, tente novamente.');
      }
    }
  };

  const handleNameSubmit = async () => {
    if (name.trim().length < 2) {
      setError('Por favor, insira um nome válido.');
      return;
    }
    await AsyncStorage.setItem('@AlfieApp:userName', name);
    navigation.replace('Home');
  };

  if (loading) {
    return (
      <SafeLayout>
        <View style={styles.container}>
          <AlfieAvatar expression="thinking" style={styles.avatar} />
          <Text style={styles.title}>Carregando...</Text>
        </View>
      </SafeLayout>
    );
  }

  if (needsApiKey) {
    return (
      <SafeLayout>
        <KeyboardAwareView
          contentContainerStyle={styles.container}
          keyboardAvoidingViewProps={{
            keyboardVerticalOffset: Platform.OS === 'ios' ? 50 : 20,
          }}
        >
          <AlfieAvatar expression={error ? 'thinking' : 'happy'} style={styles.avatar} />
          <Text style={styles.title}>Bem-vindo ao Alfie!</Text>
          <Text style={styles.subtitle}>
            Para começar, precisamos da sua API key do Google Gemini.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Cole sua API key aqui"
            placeholderTextColor={theme.colors.text + '80'}
            value={apiKeyInput}
            onChangeText={text => {
              setApiKeyInput(text);
              setError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={handleApiKeySubmit}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </KeyboardAwareView>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout>
      <KeyboardAwareView
        contentContainerStyle={styles.container}
        keyboardAvoidingViewProps={{
          keyboardVerticalOffset: Platform.OS === 'ios' ? 50 : 20,
        }}
      >
        <AlfieAvatar expression={error ? 'thinking' : 'happy'} style={styles.avatar} />
        <Text style={styles.title}>Como posso te chamar?</Text>
        <Text style={styles.subtitle}>
          Digite seu nome para personalizarmos sua experiência.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor={theme.colors.text + '80'}
          value={name}
          onChangeText={text => {
            setName(text);
            setError('');
          }}
          autoCapitalize="words"
          autoCorrect={false}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleNameSubmit}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </KeyboardAwareView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  avatar: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen; 