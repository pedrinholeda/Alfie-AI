/** Histórico de sessões, com filtro por modo. */
import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { SessionRow } from '../components/SessionRow';
import { AppHeader, Button, EmptyState, IconButton, Screen, Segmented } from '../components/ui';
import { confirm } from '../lib/confirm';
import { historyStats } from '../lib/history';
import { useHistory } from '../state/history';
import { useTheme } from '../theme';
import type { PracticeMode } from '../types/domain';
import type { ScreenProps } from '../types/navigation';

type Filter = 'all' | PracticeMode;

export default function HistoryScreen({ navigation }: ScreenProps<'History'>) {
  const theme = useTheme();
  const { sessions, clear } = useHistory();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? sessions : sessions.filter((s) => s.type === filter)),
    [filter, sessions],
  );
  const stats = historyStats(visible);

  const clearAll = async () => {
    const ok = await confirm({
      title: 'Apagar todo o histórico?',
      message: `${sessions.length} sessões serão apagadas deste aparelho. Não dá para desfazer.`,
      confirmLabel: 'Apagar tudo',
      destructive: true,
    });
    if (ok) await clear();
  };

  return (
    <Screen
      scroll={false}
      contentStyle={{ paddingTop: 0, paddingBottom: 0 }}
      header={
        <AppHeader
          title="Histórico"
          onBack={() => navigation.goBack()}
          right={
            sessions.length > 0 ? (
              <IconButton
                icon="delete-sweep-outline"
                label="Apagar todo o histórico"
                onPress={clearAll}
                color={theme.colors.danger}
              />
            ) : undefined
          }
        />
      }
    >
      {sessions.length === 0 ? (
        <EmptyState
          icon="history"
          title="Nenhuma sessão ainda"
          message="Quando você terminar uma entrevista ou um quiz, o resultado aparece aqui para você acompanhar a evolução."
          action={<Button title="Começar a praticar" onPress={() => navigation.goBack()} />}
        />
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: theme.spacing.md, paddingBottom: theme.spacing.xxl }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ gap: theme.spacing.md, paddingBottom: theme.spacing.sm }}>
              <Segmented<Filter>
                value={filter}
                onChange={setFilter}
                options={[
                  { value: 'all', label: 'Tudo' },
                  { value: 'interview', label: 'Entrevistas' },
                  { value: 'quiz', label: 'Quizzes' },
                ]}
              />
              <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
                {stats.total} {stats.total === 1 ? 'sessão' : 'sessões'}
                {stats.average !== null ? ` · média ${stats.average.toFixed(1)}` : ''}
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text
              style={{ ...theme.type.body, color: theme.colors.textMuted, textAlign: 'center' }}
            >
              Nenhuma sessão deste tipo.
            </Text>
          }
          renderItem={({ item }) => (
            <SessionRow
              session={item}
              onPress={() => navigation.navigate('Results', { sessionId: item.id })}
            />
          )}
        />
      )}
    </Screen>
  );
}
