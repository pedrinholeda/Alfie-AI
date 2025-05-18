import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { InterviewQuestion, JobRequirements } from '../services/gemini';

interface FeedbackHistory {
  id: string;
  date: string;
  type: 'quiz' | 'interview';
  score: number;
  // Para Quiz
  totalQuestions?: number;
  // Para Entrevista
  questions?: InterviewQuestion[];
  answers?: Array<{
    question: string;
    answer: string;
    feedback: any;
  }>;
  requirements?: JobRequirements;
}

interface FeedbackHistoryContextData {
  history: FeedbackHistory[];
  addFeedback: (feedback: Omit<FeedbackHistory, 'id' | 'date'>) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const FeedbackHistoryContext = createContext<FeedbackHistoryContextData>({} as FeedbackHistoryContextData);

export const useFeedbackHistory = () => {
  const context = useContext(FeedbackHistoryContext);
  if (!context) {
    throw new Error('useFeedbackHistory must be used within a FeedbackHistoryProvider');
  }
  return context;
};

export const FeedbackHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<FeedbackHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('@AlfieApp:feedbackHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const saveHistory = async (newHistory: FeedbackHistory[]) => {
    try {
      await AsyncStorage.setItem('@AlfieApp:feedbackHistory', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  };

  const addFeedback = async (feedback: Omit<FeedbackHistory, 'id' | 'date'>) => {
    const newFeedback: FeedbackHistory = {
      ...feedback,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    const newHistory = [newFeedback, ...history].slice(0, 10); // Mantém apenas os 10 últimos
    await saveHistory(newHistory);
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('@AlfieApp:feedbackHistory');
      setHistory([]);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  };

  return (
    <FeedbackHistoryContext.Provider
      value={{
        history,
        addFeedback,
        clearHistory,
      }}
    >
      {children}
    </FeedbackHistoryContext.Provider>
  );
}; 