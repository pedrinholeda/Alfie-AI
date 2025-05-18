import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Pergunta {questionNumber} de {totalQuestions}
      </Text>
      <Text style={styles.question}>{question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  progress: {
    color: theme.colors.primary,
    fontSize: 14,
    marginBottom: theme.spacing.sm,
  },
  question: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
}); 