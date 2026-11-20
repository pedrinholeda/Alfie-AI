/** Quiz de múltipla escolha com explicação após cada resposta. */
import { usePreventRemove } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AppHeader, Button, Card, Icon, Pill, ProgressBar, Screen } from '../components/ui';
import { confirm } from '../lib/confirm';
import { createId, quizScore } from '../lib/history';
import { useHistory } from '../state/history';
import { useTheme } from '../theme';
import type { QuizAnswer } from '../types/domain';
import type { ScreenProps } from '../types/navigation';
import { difficultyLabel } from './Interview';

const letters = ['A', 'B', 'C', 'D', 'E'];

export default function QuizScreen({ navigation, route }: ScreenProps<'Quiz'>) {
  const theme = useTheme();
  const history = useHistory();
  const { questions, requirements, jobText } = route.params;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const done = useRef(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const answered = selected !== null;
  const correctSoFar = answers.filter((a) => a.selected === a.question.correctAnswer).length;

  usePreventRemove(!done.current && (answers.length > 0 || answered), ({ data }) => {
    void confirm({
      title: 'Sair do quiz?',
      message: 'O progresso desta sessão será perdido.',
      confirmLabel: 'Sair',
      destructive: true,
    }).then((ok) => ok && navigation.dispatch(data.action));
  });

  const next = async () => {
    if (selected === null) return;
    const all = [...answers, { question, selected }];
    if (!isLast) {
      setAnswers(all);
      setSelected(null);
      setIndex(index + 1);
      return;
    }
    const id = createId();
    await history.add({
      id,
      date: new Date().toISOString(),
      type: 'quiz',
      score: quizScore(all),
      answers: all,
      requirements,
      jobText,
    });
    done.current = true;
    navigation.replace('Results', { sessionId: id, fresh: true });
  };

  return (
    <Screen
      header={
        <AppHeader
          title={`Questão ${index + 1} de ${questions.length}`}
          onBack={() => navigation.goBack()}
          right={
            <Text style={{ ...theme.type.label, color: theme.colors.success, paddingRight: 8 }}>
              {correctSoFar} ✓
            </Text>
          }
        />
      }
      footer={
        answered ? (
          <Button
            title={isLast ? 'Ver resultado' : 'Próxima questão'}
            icon={isLast ? 'flag-checkered' : 'arrow-right'}
            onPress={next}
          />
        ) : null
      }
    >
      <ProgressBar progress={(index + (answered ? 1 : 0)) / questions.length} />

      <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
          {question.topic ? <Pill label={question.topic} tone="primary" /> : null}
          <Pill label={difficultyLabel[question.difficulty]} />
        </View>
        <Text
          style={{ ...theme.type.heading, fontSize: 19, lineHeight: 27, color: theme.colors.text }}
        >
          {question.question}
        </Text>
      </View>

      <View
        style={{ marginTop: theme.spacing.xl, gap: theme.spacing.md }}
        accessibilityRole="radiogroup"
      >
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctAnswer;
          const isPicked = i === selected;
          let border = theme.colors.border;
          let background = theme.colors.surface;
          let icon: 'check-circle' | 'close-circle' | null = null;
          if (answered && isCorrect) {
            border = theme.colors.success;
            background = theme.colors.successSoft;
            icon = 'check-circle';
          } else if (answered && isPicked) {
            border = theme.colors.danger;
            background = theme.colors.dangerSoft;
            icon = 'close-circle';
          }
          return (
            <Pressable
              key={`${index}-${i}`}
              onPress={() => !answered && setSelected(i)}
              disabled={answered}
              accessibilityRole="radio"
              accessibilityState={{ checked: isPicked, disabled: answered }}
              accessibilityLabel={`${letters[i]}: ${option}${answered && isCorrect ? ', correta' : ''}`}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.md,
                padding: theme.spacing.lg,
                borderRadius: theme.radius.md,
                borderWidth: 1.5,
                borderColor: border,
                backgroundColor: background,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: theme.colors.surfaceAlt,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ ...theme.type.label, color: theme.colors.textMuted }}>
                  {letters[i]}
                </Text>
              </View>
              <Text style={{ ...theme.type.body, color: theme.colors.text, flex: 1 }}>
                {option}
              </Text>
              {icon ? (
                <Icon
                  name={icon}
                  color={icon === 'check-circle' ? theme.colors.success : theme.colors.danger}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {answered ? (
        <Card style={{ marginTop: theme.spacing.xl, gap: theme.spacing.sm }}>
          <Text
            style={{
              ...theme.type.label,
              color:
                selected === question.correctAnswer ? theme.colors.success : theme.colors.danger,
            }}
          >
            {selected === question.correctAnswer ? 'Você acertou!' : 'Não foi dessa vez'}
          </Text>
          <Text style={{ ...theme.type.body, color: theme.colors.text }}>
            {question.explanation || 'Sem explicação para esta questão.'}
          </Text>
        </Card>
      ) : null}
    </Screen>
  );
}
