import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface FeedbackCardProps {
  feedback: string;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback do Alfie</Text>
      <Text style={styles.feedback}>{feedback}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    marginTop: theme.spacing.md,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  feedback: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
}); 