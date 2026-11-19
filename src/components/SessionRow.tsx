/** Linha de uma sessão salva, usada na Home e no Histórico. */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { Text, View } from 'react-native';

import { sessionScore10 } from '../lib/history';
import { useTheme } from '../theme';
import type { PracticeSession } from '../types/domain';
import { Card, Icon, ScoreBadge } from './ui';

export function formatSessionDate(iso: string): string {
  try {
    return format(new Date(iso), "d 'de' MMM, HH:mm", { locale: ptBR });
  } catch {
    return '';
  }
}

export function scoreLabel(session: PracticeSession): string {
  return session.type === 'quiz' ? `${Math.round(session.score)}%` : session.score.toFixed(1);
}

export function SessionRow({
  session,
  onPress,
}: {
  session: PracticeSession;
  onPress: () => void;
}) {
  const theme = useTheme();
  const isQuiz = session.type === 'quiz';
  const detail = isQuiz
    ? `Quiz · ${session.answers.length || '—'} questões`
    : `Entrevista · ${session.answers.filter((a) => a.feedback).length} de ${session.answers.length} respondidas`;

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${session.requirements.role}, ${detail}, nota ${scoreLabel(session)}`}
      style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}
    >
      <ScoreBadge score={sessionScore10(session)} size={48} display={scoreLabel(session)} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ ...theme.type.label, color: theme.colors.text }} numberOfLines={1}>
          {session.requirements.role}
        </Text>
        <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }} numberOfLines={1}>
          {detail}
        </Text>
        <Text style={{ ...theme.type.caption, color: theme.colors.textSubtle }}>
          {formatSessionDate(session.date)}
        </Text>
      </View>
      <Icon name="chevron-right" color={theme.colors.textSubtle} />
    </Card>
  );
}
