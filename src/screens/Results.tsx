/** Resultado de uma sessão, vindo do fim da prática ou do histórico. */
import React, { useState } from 'react';
import { Pressable, Share, Text, View } from 'react-native';

import AlfieAvatar from '../components/AlfieAvatar';
import { PreparingCard } from '../components/PreparingCard';
import { formatSessionDate, scoreLabel } from '../components/SessionRow';
import {
  AppHeader,
  Button,
  Card,
  EmptyState,
  ErrorBox,
  Icon,
  IconButton,
  Pill,
  ScoreBadge,
  Screen,
  SectionTitle,
} from '../components/ui';
import { usePracticeStarter } from '../hooks/usePracticeStarter';
import { confirm } from '../lib/confirm';
import { sessionScore10 } from '../lib/history';
import { buildShareText } from '../lib/share';
import { useHistory } from '../state/history';
import { scoreColors, useTheme } from '../theme';
import type { InterviewSession, QuizSession } from '../types/domain';
import type { ScreenProps } from '../types/navigation';
import { FeedbackBlock, difficultyLabel } from './Interview';

function verdict(score10: number): string {
  if (score10 >= 8.5) return 'Excelente! Você está pronto para essa vaga.';
  if (score10 >= 7) return 'Muito bom. Alguns ajustes e você chega lá.';
  if (score10 >= 5) return 'Bom começo. Vale reforçar os pontos abaixo.';
  return 'Ainda dá para evoluir bastante. Use o plano abaixo e tente de novo.';
}

export default function ResultsScreen({ navigation, route }: ScreenProps<'Results'>) {
  const theme = useTheme();
  const history = useHistory();
  const starter = usePracticeStarter();
  const session = history.sessions.find((s) => s.id === route.params.sessionId);

  const goHome = () => (route.params.fresh ? navigation.popToTop() : navigation.goBack());

  if (!session) {
    return (
      <Screen header={<AppHeader title="Resultado" onBack={goHome} />}>
        <EmptyState
          icon="file-question-outline"
          title="Sessão não encontrada"
          message="Ela pode ter sido apagada do histórico."
          action={<Button title="Voltar ao início" onPress={() => navigation.popToTop()} />}
        />
      </Screen>
    );
  }

  const score10 = sessionScore10(session);
  const tone = scoreColors(theme, score10);

  const remove = async () => {
    const ok = await confirm({
      title: 'Apagar esta sessão?',
      message: 'Ela sai do histórico e não dá para desfazer.',
      confirmLabel: 'Apagar',
      destructive: true,
    });
    if (!ok) return;
    await history.removeSession(session.id);
    goHome();
  };

  const canRetry = session.requirements.requirements.length > 0 || session.jobText.length > 0;

  return (
    <Screen
      header={
        <AppHeader
          title={session.type === 'quiz' ? 'Resultado do quiz' : 'Resultado da entrevista'}
          onBack={goHome}
          right={
            <View style={{ flexDirection: 'row' }}>
              <IconButton
                icon="share-variant-outline"
                label="Compartilhar"
                onPress={() => void Share.share({ message: buildShareText(session) })}
              />
              <IconButton
                icon="trash-can-outline"
                label="Apagar sessão"
                onPress={remove}
                color={theme.colors.danger}
              />
            </View>
          }
        />
      }
      footer={
        starter.busy ? null : (
          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <Button
              title="Início"
              variant="secondary"
              onPress={() => navigation.popToTop()}
              style={{ flex: 1 }}
            />
            {canRetry ? (
              <Button
                title="Praticar de novo"
                icon="refresh"
                onPress={() =>
                  void starter.start(
                    session.type,
                    session.jobText,
                    session.requirements.requirements.length > 0 ? session.requirements : undefined,
                  )
                }
                style={{ flex: 2 }}
              />
            ) : null}
          </View>
        )
      }
    >
      <View style={{ alignItems: 'center', gap: theme.spacing.md }}>
        <AlfieAvatar
          size={80}
          expression={score10 >= 7 ? 'excited' : score10 >= 5 ? 'happy' : 'thinking'}
        />
        <Text style={{ ...theme.type.caption, color: theme.colors.textMuted, textAlign: 'center' }}>
          {session.requirements.role} · {formatSessionDate(session.date)}
        </Text>
        <View
          style={{
            backgroundColor: tone.bg,
            borderRadius: theme.radius.xl,
            paddingHorizontal: theme.spacing.xxl,
            paddingVertical: theme.spacing.lg,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 48, fontWeight: '800', color: tone.fg }}>
            {scoreLabel(session)}
          </Text>
          <Text style={{ ...theme.type.label, color: tone.fg }}>
            {session.type === 'quiz'
              ? `${session.answers.filter((a) => a.selected === a.question.correctAnswer).length} de ${session.answers.length} corretas`
              : 'nota de 0 a 10'}
          </Text>
        </View>
        <Text style={{ ...theme.type.heading, color: theme.colors.text, textAlign: 'center' }}>
          {verdict(score10)}
        </Text>
      </View>

      {starter.busy ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <PreparingCard step={starter.step} onCancel={starter.cancel} />
        </View>
      ) : starter.error ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <ErrorBox message={starter.error} />
        </View>
      ) : null}

      {session.type === 'interview' ? (
        <InterviewDetails session={session} />
      ) : (
        <QuizDetails session={session} />
      )}
    </Screen>
  );
}

function InterviewDetails({ session }: { session: InterviewSession }) {
  const theme = useTheme();
  const { analysis } = session;
  return (
    <>
      {analysis ? (
        <>
          <SectionTitle>Análise do Alfie</SectionTitle>
          <Card style={{ gap: theme.spacing.lg }}>
            <Text style={{ ...theme.type.body, color: theme.colors.text }}>
              {analysis.analysis}
            </Text>
            <FeedbackBlock title="Pontos fortes" items={analysis.strengths} tone="good" />
            <FeedbackBlock title="Pontos a desenvolver" items={analysis.weaknesses} tone="bad" />
          </Card>
          {analysis.improvements.length > 0 ? (
            <>
              <SectionTitle>Plano de estudo</SectionTitle>
              <Card style={{ gap: theme.spacing.md }}>
                {analysis.improvements.map((item, i) => (
                  <View key={item} style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: theme.colors.primarySoft,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          ...theme.type.caption,
                          fontWeight: '700',
                          color: theme.colors.primary,
                        }}
                      >
                        {i + 1}
                      </Text>
                    </View>
                    <Text style={{ ...theme.type.body, color: theme.colors.text, flex: 1 }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </Card>
            </>
          ) : null}
        </>
      ) : null}

      <SectionTitle>Pergunta a pergunta</SectionTitle>
      <View style={{ gap: theme.spacing.md }}>
        {session.answers.map((a, i) => (
          <AnswerCard key={`${i}-${a.question.question}`} index={i} entry={a} />
        ))}
      </View>
    </>
  );
}

function AnswerCard({
  index,
  entry,
}: {
  index: number;
  entry: InterviewSession['answers'][number];
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { feedback } = entry;
  return (
    <Card style={{ gap: theme.spacing.md }}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={{ flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' }}
      >
        {feedback ? (
          <ScoreBadge score={feedback.score} size={40} />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.surfaceAlt,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="skip-next" size={18} color={theme.colors.textMuted} />
          </View>
        )}
        <Text
          style={{ ...theme.type.label, color: theme.colors.text, flex: 1 }}
          numberOfLines={open ? undefined : 2}
        >
          {index + 1}. {entry.question.question}
        </Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} color={theme.colors.textSubtle} />
      </Pressable>
      {open ? (
        <View style={{ gap: theme.spacing.md }}>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <Pill
              label={entry.question.type === 'technical' ? 'Técnica' : 'Comportamental'}
              tone="primary"
            />
            <Pill label={difficultyLabel[entry.question.difficulty]} />
          </View>
          {feedback ? (
            <>
              <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
                Sua resposta
              </Text>
              <Text style={{ ...theme.type.body, color: theme.colors.text }}>{entry.answer}</Text>
              <Text style={{ ...theme.type.body, color: theme.colors.text }}>
                {feedback.feedback}
              </Text>
              <FeedbackBlock title="Como melhorar" items={feedback.suggestions} tone="tip" />
            </>
          ) : (
            <Text style={{ ...theme.type.body, color: theme.colors.textMuted }}>
              Pergunta pulada.
            </Text>
          )}
          {entry.question.expectedTopics.length > 0 ? (
            <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
              Uma boa resposta cobre: {entry.question.expectedTopics.join(', ')}.
            </Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}

function QuizDetails({ session }: { session: QuizSession }) {
  const theme = useTheme();
  if (session.answers.length === 0) {
    return (
      <Card style={{ marginTop: theme.spacing.xl }}>
        <Text style={{ ...theme.type.body, color: theme.colors.textMuted }}>
          Esta sessão veio da versão anterior do app e não guardou as questões.
        </Text>
      </Card>
    );
  }
  const wrong = session.answers.filter((a) => a.selected !== a.question.correctAnswer);
  const topics = [...new Set(wrong.map((a) => a.question.topic).filter(Boolean))];

  return (
    <>
      {topics.length > 0 ? (
        <>
          <SectionTitle>Para revisar</SectionTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            {topics.map((t) => (
              <Pill key={t} label={t} tone="warning" />
            ))}
          </View>
        </>
      ) : null}
      <SectionTitle>Questões</SectionTitle>
      <View style={{ gap: theme.spacing.md }}>
        {session.answers.map((a, i) => {
          const right = a.selected === a.question.correctAnswer;
          return (
            <Card key={`${i}-${a.question.question}`} style={{ gap: theme.spacing.sm }}>
              <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                <Icon
                  name={right ? 'check-circle' : 'close-circle'}
                  color={right ? theme.colors.success : theme.colors.danger}
                />
                <Text style={{ ...theme.type.label, color: theme.colors.text, flex: 1 }}>
                  {i + 1}. {a.question.question}
                </Text>
              </View>
              {!right ? (
                <Text style={{ ...theme.type.caption, color: theme.colors.danger }}>
                  Sua resposta: {a.question.options[a.selected]}
                </Text>
              ) : null}
              <Text style={{ ...theme.type.caption, color: theme.colors.success }}>
                Correta: {a.question.options[a.question.correctAnswer]}
              </Text>
              {a.question.explanation ? (
                <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
                  {a.question.explanation}
                </Text>
              ) : null}
            </Card>
          );
        })}
      </View>
    </>
  );
}
