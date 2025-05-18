import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { theme } from '../styles/theme';
import SafeLayout from '../components/SafeLayout';
import AlfieAvatar from '../components/AlfieAvatar';
import type { InterviewQuestion, JobRequirements } from '../services/gemini';

const { width } = Dimensions.get('window');

interface ResultsScreenProps {
  navigation: any;
  route: {
    params: {
      // Para resultados do Quiz
      score?: number;
      total?: number;
      // Para resultados da Entrevista
      questions?: InterviewQuestion[];
      answers?: Array<{
        question: string;
        answer: string;
        feedback: any;
      }>;
      requirements?: JobRequirements;
    };
  };
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ navigation, route }) => {
  const { score, total, questions, answers, requirements } = route.params;

  const isQuizResult = typeof score !== 'undefined' && typeof total !== 'undefined';
  
  const calculateInterviewScore = () => {
    if (!answers) return 0;
    const totalScore = answers.reduce((acc, curr) => acc + (curr.feedback?.score || 0), 0);
    return totalScore / answers.length;
  };

  const aggregateFeedback = () => {
    if (!answers) return null;

    const allStrengths = new Set<string>();
    const allWeaknesses = new Set<string>();
    const allSuggestions = new Set<string>();
    let overallFeedback = '';

    answers.forEach(answer => {
      if (answer.feedback) {
        answer.feedback.strengths.forEach((s: string) => allStrengths.add(s));
        answer.feedback.weaknesses.forEach((w: string) => allWeaknesses.add(w));
        answer.feedback.suggestions.forEach((s: string) => allSuggestions.add(s));
      }
    });

    // Análise técnica vs comportamental
    const technicalAnswers = answers.filter(a => questions?.find(q => q.question === a.question)?.type === 'technical');
    const behavioralAnswers = answers.filter(a => questions?.find(q => q.question === a.question)?.type === 'behavioral');

    const technicalScore = technicalAnswers.reduce((acc, curr) => acc + (curr.feedback?.score || 0), 0) / technicalAnswers.length;
    const behavioralScore = behavioralAnswers.reduce((acc, curr) => acc + (curr.feedback?.score || 0), 0) / behavioralAnswers.length;

    overallFeedback = `Seu desempenho foi ${technicalScore > behavioralScore ? 'melhor em questões técnicas' : 'melhor em questões comportamentais'}. `;
    overallFeedback += technicalScore > 7 ? 'Você demonstrou excelente conhecimento técnico. ' : 
                       technicalScore > 5 ? 'Seu conhecimento técnico está adequado, mas pode melhorar. ' :
                       'Você precisa fortalecer seus conhecimentos técnicos. ';
    
    overallFeedback += behavioralScore > 7 ? 'Suas habilidades comportamentais são excelentes. ' :
                       behavioralScore > 5 ? 'Suas habilidades comportamentais são boas, mas há espaço para desenvolvimento. ' :
                       'Você precisa desenvolver melhor suas habilidades comportamentais. ';

    return {
      strengths: Array.from(allStrengths),
      weaknesses: Array.from(allWeaknesses),
      suggestions: Array.from(allSuggestions),
      overallFeedback,
    };
  };

  const getAlfieExpression = () => {
    if (isQuizResult) {
      const percentage = ((score || 0) / (total || 1)) * 100;
      if (percentage >= 70) return 'excited';
      if (percentage >= 50) return 'neutral';
      return 'thinking';
    } else {
      const finalScore = calculateInterviewScore();
      if (finalScore >= 7) return 'excited';
      if (finalScore >= 5) return 'neutral';
      return 'thinking';
    }
  };

  const renderQuizResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.scoreTitle}>Resultado do Quiz</Text>
      <Text style={[
        styles.scoreValue,
        { 
          color: (score || 0) >= ((total || 0) * 0.7) 
            ? theme.colors.success 
            : (score || 0) >= ((total || 0) * 0.5) 
              ? theme.colors.warning 
              : theme.colors.error 
        }
      ]}>
        {(((score || 0) / (total || 1)) * 100).toFixed(1)}%
      </Text>
      <Text style={styles.scoreSubtitle}>
        {score || 0} de {total || 0} questões corretas
      </Text>
    </View>
  );

  const renderInterviewResults = () => {
    const finalScore = calculateInterviewScore();
    const feedback = aggregateFeedback();

    if (!feedback || !answers) return null;

    return (
      <ScrollView style={styles.content}>
        <View style={styles.resultsContainer}>
          <Text style={styles.scoreTitle}>Resultado da Entrevista</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Pontuação Final</Text>
            <Text style={[
              styles.scoreValue,
              { 
                color: finalScore >= 7 
                  ? theme.colors.success 
                  : finalScore >= 5 
                    ? theme.colors.warning 
                    : theme.colors.error 
              }
            ]}>
              {finalScore.toFixed(1)}
            </Text>
          </View>

          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>Análise Geral</Text>
            <Text style={styles.feedbackText}>{feedback.overallFeedback}</Text>
          </View>

          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>Pontos Fortes</Text>
            {feedback.strengths.map((strength, index) => (
              <Text key={index} style={styles.bulletPoint}>• {strength}</Text>
            ))}
          </View>

          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>Pontos a Desenvolver</Text>
            {feedback.weaknesses.map((weakness, index) => (
              <Text key={index} style={styles.bulletPoint}>• {weakness}</Text>
            ))}
          </View>

          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>Plano de Ação</Text>
            {feedback.suggestions.map((suggestion, index) => (
              <View key={index} style={styles.actionItem}>
                <Text style={styles.actionNumber}>{index + 1}</Text>
                <Text style={styles.actionText}>{suggestion}</Text>
              </View>
            ))}
          </View>

          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>Respostas</Text>
            {answers.map((answer, index) => (
              <View key={index} style={styles.answerCard}>
                <Text style={styles.questionText}>
                  {index + 1}. {answer.question}
                </Text>
                <Text style={styles.answerText}>{answer.answer}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <AlfieAvatar
            expression={getAlfieExpression()}
            style={styles.avatar}
          />
        </View>

        {isQuizResult ? renderQuizResults() : renderInterviewResults()}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
  },
  content: {
    flex: 1,
  },
  resultsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  scoreLabel: {
    fontSize: 16,
    color: theme.colors.text + 'CC',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreSubtitle: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 5,
  },
  feedbackSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 15,
  },
  feedbackText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 15,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingLeft: 15,
  },
  actionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  answerCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  questionText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultsScreen; 