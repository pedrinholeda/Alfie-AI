/** Configuração inicial em dois passos: nome e chave do Gemini. */
import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';

import AlfieAvatar from '../components/AlfieAvatar';
import { AppHeader, Button, Icon, Screen, TextField } from '../components/ui';
import { errorMessage } from '../lib/errors';
import { secret } from '../storage';
import { devApiKey, useApp } from '../state/app';
import { useTheme } from '../theme';

const AI_STUDIO_URL = 'https://aistudio.google.com/app/apikey';

export default function OnboardingScreen() {
  const theme = useTheme();
  const app = useApp();
  // Quem já tem nome (veio da versão 1.0 ou trocou a chave) vai direto para a chave.
  const [step, setStep] = useState<'name' | 'key'>(app.name ? 'key' : 'name');
  const [name, setName] = useState(app.name);
  const [key, setKey] = useState(devApiKey);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submitName = async () => {
    if (name.trim().length < 2) {
      setError('Digite pelo menos duas letras.');
      return;
    }
    setError(null);
    await app.setName(name);
    setStep('key');
  };

  const submitKey = async () => {
    if (!key.trim()) {
      setError('Cole a chave para continuar.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await app.saveApiKey(key);
    } catch (e) {
      setError(errorMessage(e));
      setSaving(false);
    }
  };

  const paste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setKey(text.trim());
      setError(null);
    }
  };

  const stepLabel = `Passo ${step === 'name' ? 1 : 2} de 2`;

  if (step === 'name') {
    return (
      <Screen
        footer={<Button title="Continuar" onPress={submitName} />}
        header={<AppHeader title={stepLabel} />}
      >
        <View style={{ alignItems: 'center', gap: theme.spacing.lg, marginTop: theme.spacing.xl }}>
          <AlfieAvatar size={104} expression={error ? 'thinking' : 'happy'} />
          <Text
            style={{ ...theme.type.title, color: theme.colors.text, textAlign: 'center' }}
            accessibilityRole="header"
          >
            Oi! Eu sou o Alfie. Como posso te chamar?
          </Text>
        </View>
        <View style={{ marginTop: theme.spacing.xxl }}>
          <TextField
            label="Seu nome"
            placeholder="Como você prefere ser chamado"
            value={name}
            onChangeText={(t) => {
              setName(t);
              setError(null);
            }}
            autoCapitalize="words"
            autoComplete="given-name"
            returnKeyType="next"
            onSubmitEditing={submitName}
            error={error}
            autoFocus
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      footer={<Button title="Validar e começar" onPress={submitKey} loading={saving} />}
      header={
        <AppHeader
          title={stepLabel}
          onBack={() => {
            setError(null);
            setStep('name');
          }}
        />
      }
    >
      <View style={{ alignItems: 'center', gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        <AlfieAvatar size={88} expression={error ? 'thinking' : 'excited'} />
        <Text
          style={{ ...theme.type.title, color: theme.colors.text, textAlign: 'center' }}
          accessibilityRole="header"
        >
          Conecte sua chave do Gemini
        </Text>
        <Text style={{ ...theme.type.body, color: theme.colors.textMuted, textAlign: 'center' }}>
          O Alfie usa a IA do Google para criar e avaliar suas entrevistas. A chave é gratuita e
          leva um minuto para criar.
        </Text>
      </View>

      <View
        style={{
          marginTop: theme.spacing.xl,
          gap: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
        }}
      >
        {[
          'Abra o Google AI Studio e entre com sua conta Google.',
          'Toque em "Create API key" e copie a chave.',
          'Cole a chave aqui embaixo.',
        ].map((text, i) => (
          <View key={text} style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: theme.colors.primarySoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ ...theme.type.caption, fontWeight: '700', color: theme.colors.primary }}
              >
                {i + 1}
              </Text>
            </View>
            <Text style={{ ...theme.type.body, color: theme.colors.text, flex: 1 }}>{text}</Text>
          </View>
        ))}
        <Button
          title="Abrir o Google AI Studio"
          variant="secondary"
          icon="open-in-new"
          onPress={() => Linking.openURL(AI_STUDIO_URL)}
        />
      </View>

      <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.sm }}>
        <TextField
          label="Chave da API"
          placeholder="Cole sua chave aqui"
          value={key}
          onChangeText={(t) => {
            setKey(t.trim());
            setError(null);
          }}
          secureTextEntry={!showKey}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onSubmitEditing={submitKey}
          error={error}
        />
        <View style={{ flexDirection: 'row', gap: theme.spacing.lg }}>
          <Pressable onPress={paste} accessibilityRole="button" hitSlop={8}>
            <Text style={{ ...theme.type.label, color: theme.colors.primary }}>Colar</Text>
          </Pressable>
          <Pressable onPress={() => setShowKey((v) => !v)} accessibilityRole="button" hitSlop={8}>
            <Text style={{ ...theme.type.label, color: theme.colors.primary }}>
              {showKey ? 'Ocultar' : 'Mostrar'}
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.xl,
          alignItems: 'flex-start',
        }}
      >
        <Icon name="shield-lock-outline" size={18} color={theme.colors.textMuted} />
        <Text style={{ ...theme.type.caption, color: theme.colors.textMuted, flex: 1 }}>
          {secret.secure
            ? 'A chave fica guardada no cofre seguro do seu aparelho e só é enviada ao Google.'
            : 'Na versão web, a chave fica salva neste navegador e só é enviada ao Google. Use um navegador pessoal.'}
        </Text>
      </View>
    </Screen>
  );
}
