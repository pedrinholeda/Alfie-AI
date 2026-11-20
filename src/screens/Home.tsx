/** Início: escolher o modo, colar a vaga e começar. Mostra também o progresso recente. */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import AlfieAvatar from '../components/AlfieAvatar';
import { PreparingCard } from '../components/PreparingCard';
import { SessionRow } from '../components/SessionRow';
import {
  Button,
  Card,
  ErrorBox,
  Icon,
  IconButton,
  Screen,
  SectionTitle,
  TextField,
  type IconName,
} from '../components/ui';
import { minJobTextLength, sessionLengths } from '../config/practice';
import { sampleJob } from '../config/sampleJob';
import { usePracticeStarter } from '../hooks/usePracticeStarter';
import { historyStats } from '../lib/history';
import { isUrl } from '../lib/jobText';
import { keys } from '../storage';
import { useApp } from '../state/app';
import { useHistory } from '../state/history';
import { useTheme } from '../theme';
import type { PracticeMode } from '../types/domain';
import type { ScreenProps } from '../types/navigation';

const modes: { value: PracticeMode; title: string; text: string; icon: IconName }[] = [
  {
    value: 'interview',
    title: 'Entrevista simulada',
    text: 'Responda com suas palavras e receba nota e feedback.',
    icon: 'account-tie-voice-outline',
  },
  {
    value: 'quiz',
    title: 'Quiz técnico',
    text: 'Múltipla escolha com a explicação de cada resposta.',
    icon: 'checkbox-marked-circle-outline',
  },
];

function greeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const theme = useTheme();
  const { name, settings } = useApp();
  const { sessions } = useHistory();
  const starter = usePracticeStarter();
  const [mode, setMode] = useState<PracticeMode>('interview');
  const [jobText, setJobText] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const draftLoaded = useRef(false);

  // Rascunho da vaga: quem volta ao app não precisa colar de novo.
  useEffect(() => {
    AsyncStorage.getItem(keys.draft)
      .then((draft) => {
        if (draft) setJobText(draft);
      })
      .finally(() => {
        draftLoaded.current = true;
      });
  }, []);

  useEffect(() => {
    if (!draftLoaded.current) return;
    const timer = setTimeout(() => void AsyncStorage.setItem(keys.draft, jobText), 400);
    return () => clearTimeout(timer);
  }, [jobText]);

  const stats = historyStats(sessions);
  const length = sessionLengths[settings.sessionLength];
  const count =
    mode === 'interview' ? length.interview.technical + length.interview.behavioral : length.quiz;
  const chars = jobText.trim().length;

  const start = () => {
    const text = jobText.trim();
    if (isUrl(text)) {
      setInputError('Cole o texto da vaga, não o link: a maioria dos sites bloqueia a leitura.');
      return;
    }
    if (text.length < minJobTextLength) {
      setInputError(
        `Escreva um pouco mais sobre a vaga (pelo menos ${minJobTextLength} caracteres) para as perguntas saírem sob medida.`,
      );
      return;
    }
    setInputError(null);
    void starter.start(mode, text);
  };

  return (
    <Screen
      footer={
        starter.busy ? null : (
          <Button
            title={`Começar ${mode === 'interview' ? 'entrevista' : 'quiz'} · ${count} perguntas`}
            icon="play"
            onPress={start}
          />
        )
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
        <AlfieAvatar size={56} expression={starter.busy ? 'thinking' : 'happy'} />
        <View style={{ flex: 1 }}>
          <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
            {greeting()}
            {name ? `, ${name}` : ''}
          </Text>
          <Text
            style={{ ...theme.type.title, color: theme.colors.text }}
            accessibilityRole="header"
          >
            Vamos praticar?
          </Text>
        </View>
        <IconButton
          icon="history"
          label="Histórico"
          onPress={() => navigation.navigate('History')}
        />
        <IconButton
          icon="cog-outline"
          label="Ajustes"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      {stats.total > 0 ? (
        <View style={{ flexDirection: 'row', gap: theme.spacing.md, marginTop: theme.spacing.xl }}>
          <Stat label="Sessões" value={String(stats.total)} icon="calendar-check-outline" />
          <Stat
            label="Média"
            value={stats.average !== null ? stats.average.toFixed(1) : '–'}
            icon="star-outline"
          />
          <Stat
            label="Tendência"
            value={
              stats.trend === null ? '–' : `${stats.trend > 0 ? '+' : ''}${stats.trend.toFixed(1)}`
            }
            icon={stats.trend !== null && stats.trend < 0 ? 'trending-down' : 'trending-up'}
          />
        </View>
      ) : null}

      {starter.busy ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <PreparingCard step={starter.step} onCancel={starter.cancel} />
        </View>
      ) : (
        <>
          <SectionTitle>Como você quer praticar?</SectionTitle>
          <View style={{ gap: theme.spacing.md }} accessibilityRole="radiogroup">
            {modes.map((m) => {
              const active = m.value === mode;
              return (
                <Pressable
                  key={m.value}
                  onPress={() => setMode(m.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: active }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                    padding: theme.spacing.lg,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1.5,
                    borderColor: active ? theme.colors.primary : theme.colors.border,
                    backgroundColor: active ? theme.colors.primarySoft : theme.colors.surface,
                  }}
                >
                  <Icon
                    name={m.icon}
                    size={28}
                    color={active ? theme.colors.primary : theme.colors.textMuted}
                  />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={{ ...theme.type.heading, color: theme.colors.text }}>
                      {m.title}
                    </Text>
                    <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
                      {m.text}
                    </Text>
                  </View>
                  <Icon
                    name={active ? 'radiobox-marked' : 'radiobox-blank'}
                    color={active ? theme.colors.primary : theme.colors.textSubtle}
                  />
                </Pressable>
              );
            })}
          </View>

          <SectionTitle
            action={
              jobText ? (
                <Pressable onPress={() => setJobText('')} accessibilityRole="button" hitSlop={8}>
                  <Text style={{ ...theme.type.label, color: theme.colors.primary }}>Limpar</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    setJobText(sampleJob);
                    setInputError(null);
                  }}
                  accessibilityRole="button"
                  hitSlop={8}
                >
                  <Text style={{ ...theme.type.label, color: theme.colors.primary }}>
                    Usar um exemplo
                  </Text>
                </Pressable>
              )
            }
          >
            Descrição da vaga
          </SectionTitle>
          <TextField
            placeholder="Cole aqui a descrição da vaga: cargo, responsabilidades, requisitos e nível de experiência."
            value={jobText}
            onChangeText={(t) => {
              setJobText(t);
              setInputError(null);
            }}
            multiline
            error={inputError}
            hint={`${chars} caracteres${chars < minJobTextLength ? ` · mínimo ${minJobTextLength}` : ''}`}
            accessibilityLabel="Descrição da vaga"
          />
          {starter.error ? (
            <View style={{ marginTop: theme.spacing.lg }}>
              <ErrorBox message={starter.error} onRetry={start} />
            </View>
          ) : null}
        </>
      )}

      {sessions.length > 0 && !starter.busy ? (
        <>
          <SectionTitle
            action={
              <Pressable
                onPress={() => navigation.navigate('History')}
                accessibilityRole="button"
                hitSlop={8}
              >
                <Text style={{ ...theme.type.label, color: theme.colors.primary }}>Ver tudo</Text>
              </Pressable>
            }
          >
            Últimas sessões
          </SectionTitle>
          <View style={{ gap: theme.spacing.md }}>
            {sessions.slice(0, 3).map((s) => (
              <SessionRow
                key={s.id}
                session={s}
                onPress={() => navigation.navigate('Results', { sessionId: s.id })}
              />
            ))}
          </View>
        </>
      ) : null}
    </Screen>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: IconName }) {
  const theme = useTheme();
  return (
    <Card style={{ flex: 1, padding: theme.spacing.md, gap: 4 }}>
      <Icon name={icon} size={18} color={theme.colors.primary} />
      <Text style={{ ...theme.type.title, color: theme.colors.text }}>{value}</Text>
      <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>{label}</Text>
    </Card>
  );
}
