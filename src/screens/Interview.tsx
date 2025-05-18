import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../styles/theme';
import SafeLayout from '../components/SafeLayout';
import AlfieAvatar from '../components/AlfieAvatar';
import Toast from '../components/Toast';
import { geminiService } from '../services/gemini';
import type { InterviewQuestion, JobRequirements } from '../services/gemini';
import KeyboardAwareView from '../components/KeyboardAwareView';

const { width } = Dimensions.get('window');

interface InterviewScreenProps {
  navigation: any;
  route: {
    params: {
      questions: InterviewQuestion[];
      requirements: JobRequirements;
    };
  };
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  navigation,
  route,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { questions, requirements } = route.params;

  const getAlfieExpression = () => {
    if (loading) return 'thinking';
    if (!feedback) return 'neutral';
    if (feedback.score >= 7) return 'excited';
    if (feedback.score >= 5) return 'neutral';
    return 'thinking';
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      Toast.show('Por favor, forneça uma resposta antes de continuar.', 'error');
      return;
    }

    setLoading(true);
    try {
      const feedback = await geminiService.analyzeFeedback(
        questions[currentQuestion].question,
        answer,
        requirements
      );
      setFeedback(feedback);
    } catch (error) {
      console.error('Erro ao analisar resposta:', error);
      Toast.show('Erro ao analisar sua resposta. Por favor, tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer('');
      setFeedback(null);
    } else {
      navigation.replace('Results', {
        questions,
        answers: [
          ...questions.slice(0, currentQuestion).map((q: InterviewQuestion, i: number) => ({
            question: q.question,
            answer: '',
            feedback: null,
          })),
          {
            question: questions[currentQuestion].question,
            answer,
            feedback,
          },
        ],
        requirements,
      });
    }
  };

  const getProgressColor = () => {
    const progress = (currentQuestion + 1) / questions.length;
    if (progress < 0.4) return theme.colors.error;
    if (progress < 0.7) return theme.colors.warning;
    return theme.colors.success;
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  backgroundColor: getProgressColor(),
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Pergunta {currentQuestion + 1} de {questions.length}
          </Text>
        </View>

        <View style={styles.avatarContainer}>
          <AlfieAvatar
            expression={getAlfieExpression()}
            style={styles.avatar}
          />
        </View>

        <KeyboardAwareView style={styles.content}>
          <View style={styles.questionCard}>
            <Text style={styles.questionType}>
              {questions[currentQuestion].type === 'technical' ? 'Técnica' : 'Comportamental'}
              {' • '}
              {questions[currentQuestion].difficulty}
            </Text>
            <Text style={styles.question}>{questions[currentQuestion].question}</Text>
            <Text style={styles.context}>{questions[currentQuestion].context}</Text>
          </View>

          <View style={styles.answerContainer}>
            <TextInput
              style={styles.answerInput}
              placeholder="Digite sua resposta aqui..."
              placeholderTextColor={theme.colors.text + '80'}
              multiline
              value={answer}
              onChangeText={setAnswer}
              editable={!feedback}
            />
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loadingText}>Analisando sua resposta...</Text>
            </View>
          )}

          {feedback && (
            <View style={styles.feedbackContainer}>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Pontuação</Text>
                <Text style={[
                  styles.scoreValue,
                  { color: feedback.score >= 7 ? theme.colors.success : feedback.score >= 5 ? theme.colors.warning : theme.colors.error }
                ]}>
                  {feedback.score.toFixed(1)}
                </Text>
              </View>

              <Text style={styles.feedbackTitle}>Feedback</Text>
              <Text style={styles.feedbackText}>{feedback.feedback}</Text>

              <Text style={styles.feedbackTitle}>Pontos Fortes</Text>
              {feedback.strengths.map((strength: string, index: number) => (
                <Text key={index} style={styles.bulletPoint}>• {strength}</Text>
              ))}

              <Text style={styles.feedbackTitle}>Pontos a Melhorar</Text>
              {feedback.weaknesses.map((weakness: string, index: number) => (
                <Text key={index} style={styles.bulletPoint}>• {weakness}</Text>
              ))}

              <Text style={styles.feedbackTitle}>Sugestões</Text>
              {feedback.suggestions.map((suggestion: string, index: number) => (
                <Text key={index} style={styles.bulletPoint}>• {suggestion}</Text>
              ))}
            </View>
          )}
        </KeyboardAwareView>

        {!feedback ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmitAnswer}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Enviar Resposta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getProgressColor() }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Entrevista'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  progressContainer: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    color: theme.colors.text,
    fontSize: 14,
    textAlign: 'center',
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
  questionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  questionType: {
    color: theme.colors.primary,
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  question: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 10,
    lineHeight: 24,
  },
  context: {
    fontSize: 14,
    color: theme.colors.text + 'CC',
    lineHeight: 20,
  },
  answerContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  answerInput: {
    color: theme.colors.text,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    color: theme.colors.text,
    marginTop: 10,
  },
  feedbackContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 14,
    color: theme.colors.text + 'CC',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    marginTop: 15,
  },
  feedbackText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 5,
    paddingLeft: 10,
  },
  button: {
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

export default InterviewScreen; 