/** Ajustes: perfil, chave do Gemini, sessões, aparência, dados e sobre. */
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';

import { useToast } from '../components/Toast';
import {
  AppHeader,
  Button,
  Card,
  Icon,
  Screen,
  SectionTitle,
  Segmented,
  TextField,
  type IconName,
} from '../components/ui';
import { sessionLengths, type SessionLength } from '../config/practice';
import { confirm } from '../lib/confirm';
import { errorMessage } from '../lib/errors';
import { useApp } from '../state/app';
import { useHistory } from '../state/history';
import { useTheme, type ThemePreference } from '../theme';
import type { ScreenProps } from '../types/navigation';

const REPO_URL = 'https://github.com/pedrinholeda/Alfie-AI';

export default function SettingsScreen({ navigation }: ScreenProps<'Settings'>) {
  const theme = useTheme();
  const toast = useToast();
  const app = useApp();
  const history = useHistory();
  const [name, setName] = useState(app.name);
  const [newKey, setNewKey] = useState('');
  const [keyError, setKeyError] = useState<string | null>(null);
  const [savingKey, setSavingKey] = useState(false);
  const [editingKey, setEditingKey] = useState(false);

  const saveName = async () => {
    if (name.trim().length < 2 || name.trim() === app.name) return;
    await app.setName(name);
    toast('Nome atualizado.', 'success');
  };

  const saveKey = async () => {
    setSavingKey(true);
    setKeyError(null);
    try {
      await app.saveApiKey(newKey);
      setNewKey('');
      setEditingKey(false);
      toast('Chave validada e salva.', 'success');
    } catch (e) {
      setKeyError(errorMessage(e));
    } finally {
      setSavingKey(false);
    }
  };

  const removeKey = async () => {
    const ok = await confirm({
      title: 'Remover a chave?',
      message: 'Você vai precisar de uma chave nova para continuar praticando.',
      confirmLabel: 'Remover',
      destructive: true,
    });
    if (ok) await app.removeApiKey();
  };

  const resetAll = async () => {
    const ok = await confirm({
      title: 'Apagar todos os dados?',
      message: 'Nome, chave, ajustes e histórico serão apagados deste aparelho.',
      confirmLabel: 'Apagar tudo',
      destructive: true,
    });
    if (!ok) return;
    await app.resetAll();
    await history.reload();
  };

  const length = sessionLengths[app.settings.sessionLength];
  const version = Constants.expoConfig?.version ?? '';

  return (
    <Screen header={<AppHeader title="Ajustes" onBack={() => navigation.goBack()} />}>
      <SectionTitle>Perfil</SectionTitle>
      <TextField
        label="Seu nome"
        value={name}
        onChangeText={setName}
        onBlur={saveName}
        onSubmitEditing={saveName}
        autoCapitalize="words"
        returnKeyType="done"
      />

      <SectionTitle>Chave do Gemini</SectionTitle>
      <Card style={{ gap: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
          <Icon name="key-variant" color={theme.colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={{ ...theme.type.label, color: theme.colors.text }}>
              {app.maskedKey ?? 'Nenhuma chave'}
            </Text>
            {app.settings.model ? (
              <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
                Modelo: {app.settings.model}
              </Text>
            ) : null}
          </View>
        </View>
        {editingKey ? (
          <>
            <TextField
              placeholder="Cole a nova chave"
              value={newKey}
              onChangeText={(t) => {
                setNewKey(t.trim());
                setKeyError(null);
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              error={keyError}
            />
            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <Button
                title="Cancelar"
                variant="secondary"
                onPress={() => {
                  setEditingKey(false);
                  setKeyError(null);
                }}
                style={{ flex: 1 }}
              />
              <Button
                title="Validar"
                onPress={saveKey}
                loading={savingKey}
                disabled={!newKey}
                style={{ flex: 1 }}
              />
            </View>
          </>
        ) : (
          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <Button
              title="Trocar chave"
              variant="secondary"
              onPress={() => setEditingKey(true)}
              style={{ flex: 1 }}
            />
            <Button title="Remover" variant="danger" onPress={removeKey} style={{ flex: 1 }} />
          </View>
        )}
      </Card>

      <SectionTitle>Tamanho das sessões</SectionTitle>
      <Segmented<SessionLength>
        value={app.settings.sessionLength}
        onChange={(value) => void app.updateSettings({ sessionLength: value })}
        options={(Object.keys(sessionLengths) as SessionLength[]).map((value) => ({
          value,
          label: sessionLengths[value].label,
        }))}
      />
      <Text
        style={{
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginTop: theme.spacing.sm,
        }}
      >
        Entrevista com {length.interview.technical + length.interview.behavioral} perguntas (
        {length.interview.technical} técnicas e {length.interview.behavioral} comportamentais) e
        quiz com {length.quiz} questões.
      </Text>

      <SectionTitle>Aparência</SectionTitle>
      <Segmented<ThemePreference>
        value={app.settings.theme}
        onChange={(value) => void app.updateSettings({ theme: value })}
        options={[
          { value: 'system', label: 'Sistema' },
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Escuro' },
        ]}
      />

      <SectionTitle>Dados</SectionTitle>
      <Card style={{ gap: theme.spacing.md }}>
        <Text style={{ ...theme.type.body, color: theme.colors.textMuted }}>
          Tudo fica neste aparelho. O texto das vagas e suas respostas são enviados só ao Gemini, do
          Google, para gerar e avaliar as perguntas.
        </Text>
        <Button
          title={`Apagar histórico (${history.sessions.length})`}
          variant="secondary"
          disabled={history.sessions.length === 0}
          onPress={async () => {
            const ok = await confirm({
              title: 'Apagar o histórico?',
              message: 'Todas as sessões salvas serão apagadas.',
              confirmLabel: 'Apagar',
              destructive: true,
            });
            if (ok) await history.clear();
          }}
        />
        <Button title="Apagar todos os dados" variant="danger" onPress={resetAll} />
      </Card>

      <SectionTitle>Sobre</SectionTitle>
      <Card style={{ gap: 0, padding: 0 }}>
        <LinkRow icon="github" label="Código no GitHub" onPress={() => Linking.openURL(REPO_URL)} />
        <LinkRow
          icon="bug-outline"
          label="Relatar um problema"
          onPress={() => Linking.openURL(`${REPO_URL}/issues/new/choose`)}
        />
        <LinkRow
          icon="linkedin"
          label="Pedro Leda no LinkedIn"
          onPress={() => Linking.openURL('https://www.linkedin.com/in/pedroleda/')}
          last
        />
      </Card>
      <Text
        style={{
          ...theme.type.caption,
          color: theme.colors.textSubtle,
          textAlign: 'center',
          marginTop: theme.spacing.xl,
        }}
      >
        Alfie {version} · MIT
      </Text>
    </Screen>
  );
}

function LinkRow({
  icon,
  label,
  onPress,
  last,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        padding: theme.spacing.lg,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: theme.colors.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon name={icon} color={theme.colors.textMuted} />
      <Text style={{ ...theme.type.body, color: theme.colors.text, flex: 1 }}>{label}</Text>
      <Icon name="open-in-new" size={18} color={theme.colors.textSubtle} />
    </Pressable>
  );
}
