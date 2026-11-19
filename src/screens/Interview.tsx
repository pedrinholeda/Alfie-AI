/**
 * Entrevista simulada: uma pergunta por vez, avaliação de cada resposta e análise final.
 * Todas as respostas são guardadas (a versão 1.0 só guardava a última) e a sessão vai para o
 * histórico ao terminar.
 */
import { usePreventRemove } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import AlfieAvatar from '../components/AlfieAvatar';
import { useToast } from '../components/Toast';
import {
  AppHeader,
  BulletList,
  Button,
  Card,
  ErrorBox,
  Pill,
  ProgressBar,
  ScoreBadge,
  Screen,
  TextField,
} from '../components/ui';
import { confirm } from '../lib/confirm';
import { errorMessage } from '../lib/errors';
import { createId, interviewScore } from '../lib/history';
import { gemini } from '../services/gemini';
import { useHistory } from '../state/history';
import { useTheme } from '../theme';
import type { Difficulty, FinalAnalysis, InterviewAnswer } from '../types/domain';
import type { ScreenProps } from '../types/navigation';

export const difficultyLabel: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Média',
  hard: 'Difícil',
};

const minAnswerLength = 20;

export default function InterviewScreen({ navigation, route }: ScreenProps<'Interview'>) {
  const theme = useTheme();
  const toast = useToast();
  const history = useHistory();
  const { questions, requirements, jobText } = route.params;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [draft, setDraft] = useState('');
  const [current, setCurrent] = useState<InterviewAnswer | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);
  const done = useRef(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const answeredCount = answers.length + (current ? 1 : 0);

  usePreventRemove(!done.current && answeredCount > 0, ({ data }) => {
    void confirm({
      title: 'Sair da entrevista?',
      message: 'As respostas desta sessão serão perdidas.',
      confirmLabel: 'Sair',
      destructive: true,
    }).then((ok) => ok && navigation.dispatch(data.action));
  });

  const submit = async () => {
    const text = draft.trim();
    if (text.length < minAnswerLength) {
      setError('Desenvolva um pouco mais a resposta: entrevistadores esperam exemplos e contexto.');
      return;
    }
    setError(null);
    setEvaluating(true);
    try {
      const feedback = await gemini.evaluateAnswer(requirements, question, text);
      setCurrent({ question, answer: text, feedback });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setEvaluating(false);
    }
  };

  const finish = async (all: InterviewAnswer[]) => {
    setFinishing(true);
    let analysis: FinalAnalysis | null = null;
    if (all.some((a) => a.feedback)) {
      try {
        analysis = await gemini.generateFinalAnalysis(requirements, all);
      } catch (e) {
        toast(`Não foi possível gerar a análise final. ${errorMessage(e)}`, 'error');
      }
    }
    const id = createId();
    await history.add({
      id,
      date: new Date().toISOString(),
      type: 'interview',
      score: interviewScore(all, analysis?.finalScore),
      answers: all,
      analysis,
      requirements,
      jobText,
    });
    done.current = true;
    navigation.replace('Results', { sessionId: id, fresh: true });
  };

  const advance = (entry: InterviewAnswer) => {
    const all = [...answers, entry];
    if (isLast) {
      void finish(all);
      return;
    }
    setAnswers(all);
    setCurrent(null);
    setDraft('');
    setError(null);
    setIndex(index + 1);
  };

  const skip = () => advance({ question, answer: '', feedback: null });

  if (finishing) {
    return (
      <Screen scroll={false}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <AlfieAvatar size={104} expression="thinking" />
          <ActivityIndicator color={theme.colors.primary} />
          <Text style={{ ...theme.type.heading, color: theme.colors.text, textAlign: 'center' }}>
            Fechando sua avaliação
          </Text>
          <Text style={{ ...theme.type.body, color: theme.colors.textMuted, textAlign: 'center' }}>
            Estou juntando suas respostas numa análise final.
          </Text>
        </View>
      </Screen>
    );
  }

  const footer = current ? (
    <Button
      title={isLast ? 'Ver resultado' : 'Próxima pergunta'}
      icon={isLast ? 'flag-checkered' : 'arrow-right'}
      onPress={() => advance(current)}
    />
  ) : (
    <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
      <Button
        title="Pular"
        variant="secondary"
        onPress={skip}
        disabled={evaluating}
        style={{ flex: 1 }}
      />
      <Button
        title="Enviar resposta"
        icon="send"
        onPress={submit}
        loading={evaluating}
        style={{ flex: 2 }}
      />
    </View>
  );

  return (
    <Screen
      header={
        <AppHeader
          title={`Pergunta ${index + 1} de ${questions.length}`}
          onBack={() => navigation.goBack()}
        />
      }
      footer={footer}
    >
      <ProgressBar progress={(index + (current ? 1 : 0)) / questions.length} />

      <Card style={{ marginTop: theme.spacing.xl, gap: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
          <Pill
            label={question.type === 'technical' ? 'Técnica' : 'Comportamental'}
            tone="primary"
            icon={question.type === 'technical' ? 'code-tags' : 'account-group-outline'}
          />
          <Pill label={difficultyLabel[question.difficulty]} />
        </View>
        <Text
          style={{ ...theme.type.heading, fontSize: 19, lineHeight: 27, color: theme.colors.text }}
        >
          {question.question}
        </Text>
        {question.context ? (
          <Text style={{ ...theme.type.caption, color: theme.colors.textMuted }}>
            {question.context}
          </Text>
        ) : null}
      </Card>

      {current?.feedback ? (
        <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.lg }}>
          <Card style={{ gap: theme.spacing.sm }}>
            <Text style={{ ...theme.type.label, color: theme.colors.textMuted }}>Sua resposta</Text>
            <Text style={{ ...theme.type.body, color: theme.colors.text }}>{current.answer}</Text>
          </Card>
          <Card style={{ gap: theme.spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg }}>
              <ScoreBadge score={current.feedback.score} />
              <Text style={{ ...theme.type.body, color: theme.colors.text, flex: 1 }}>
                {current.feedback.feedback}
              </Text>
            </View>
            <FeedbackBlock title="O que funcionou" items={current.feedback.strengths} tone="good" />
            <FeedbackBlock title="O que faltou" items={current.feedback.weaknesses} tone="bad" />
            <FeedbackBlock title="Como melhorar" items={current.feedback.suggestions} tone="tip" />
          </Card>
        </View>
      ) : (
        <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.md }}>
          <TextField
            label="Sua resposta"
            placeholder={
              question.type === 'behavioral'
                ? 'Conte a situação, a tarefa, o que você fez e o resultado.'
                : 'Explique seu raciocínio como faria na entrevista.'
            }
            value={draft}
            onChangeText={(t) => {
              setDraft(t);
              setError(null);
            }}
            multiline
            editable={!evaluating}
            style={{ minHeight: 180 }}
            hint={evaluating ? 'Avaliando sua resposta…' : `${draft.trim().length} caracteres`}
          />
          {error ? <ErrorBox message={error} /> : null}
        </View>
      )}
    </Screen>
  );
}

export function FeedbackBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'good' | 'bad' | 'tip';
}) {
  const theme = useTheme();
  if (items.length === 0) return null;
  const look = {
    good: { icon: 'check' as const, color: theme.colors.success },
    bad: { icon: 'alert-outline' as const, color: theme.colors.warning },
    tip: { icon: 'lightbulb-on-outline' as const, color: theme.colors.primary },
  }[tone];
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text style={{ ...theme.type.label, color: theme.colors.text }}>{title}</Text>
      <BulletList items={items} icon={look.icon} color={look.color} />
    </View>
  );
}
