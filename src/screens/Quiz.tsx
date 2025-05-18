import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../styles/theme';
import SafeLayout from '../components/SafeLayout';
import AlfieAvatar from '../components/AlfieAvatar';
import Toast from '../components/Toast';

const { width } = Dimensions.get('window');

const QuizScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const { questions } = route.params;

  const getAlfieExpression = () => {
    if (selectedAnswer === null) return 'thinking';
    if (isAnswerCorrect === null) return 'neutral';
    return isAnswerCorrect ? 'excited' : 'thinking';
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      navigation.replace('Results', { score, total: questions.length });
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
            Questão {currentQuestion + 1} de {questions.length}
          </Text>
        </View>

        <View style={styles.avatarContainer}>
          <AlfieAvatar
            expression={getAlfieExpression()}
            style={styles.avatar}
          />
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>

          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && styles.correctOption,
                  selectedAnswer === index && selectedAnswer !== questions[currentQuestion].correctAnswer && styles.wrongOption,
                ]}
                onPress={() => selectedAnswer === null && handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedAnswer !== null && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationText}>
                {questions[currentQuestion].explanation}
              </Text>
            </View>
          )}
        </ScrollView>

        {selectedAnswer !== null && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: getProgressColor() }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
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
  question: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}20`,
  },
  correctOption: {
    borderColor: theme.colors.success,
    backgroundColor: `${theme.colors.success}20`,
  },
  wrongOption: {
    borderColor: theme.colors.error,
    backgroundColor: `${theme.colors.error}20`,
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  selectedOptionText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  explanationContainer: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  explanationText: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizScreen; 