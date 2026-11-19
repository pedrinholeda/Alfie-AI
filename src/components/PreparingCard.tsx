/** Cartão de progresso enquanto a IA lê a vaga e monta as perguntas. */
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import type { StarterStep } from '../hooks/usePracticeStarter';
import { useTheme } from '../theme';
import { Button, Card, Icon } from './ui';

const steps: { key: Exclude<StarterStep, 'idle'>; label: string }[] = [
  { key: 'reading', label: 'Lendo a vaga e os requisitos' },
  { key: 'questions', label: 'Montando as perguntas' },
];

export function PreparingCard({ step, onCancel }: { step: StarterStep; onCancel: () => void }) {
  const theme = useTheme();
  const current = steps.findIndex((s) => s.key === step);

  return (
    <Card style={{ gap: theme.spacing.lg }}>
      <Text style={{ ...theme.type.heading, color: theme.colors.text }}>Preparando sua sessão</Text>
      <View style={{ gap: theme.spacing.md }}>
        {steps.map((s, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <View key={s.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 24, alignItems: 'center' }}>
                {active ? (
                  <ActivityIndicator color={theme.colors.primary} />
                ) : (
                  <Icon
                    name={done ? 'check-circle' : 'circle-outline'}
                    size={22}
                    color={done ? theme.colors.success : theme.colors.textSubtle}
                  />
                )}
              </View>
              <Text
                style={{
                  ...theme.type.body,
                  color: active || done ? theme.colors.text : theme.colors.textSubtle,
                }}
              >
                {s.label}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
        Leva de 10 a 30 segundos, dependendo do Gemini.
      </Text>
      <Button title="Cancelar" variant="secondary" onPress={onCancel} />
    </Card>
  );
}
