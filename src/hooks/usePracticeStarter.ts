/**
 * Prepara uma sessão: lê a vaga, gera as perguntas e abre a tela da prática. Usado pela Home
 * e pelo "praticar de novo" dos resultados, que reaproveita os requisitos já extraídos.
 */
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';

import { sessionLengths } from '../config/practice';
import { errorMessage } from '../lib/errors';
import { sanitizeJobInfo } from '../lib/jobText';
import { gemini } from '../services/gemini';
import { useApp } from '../state/app';
import type { JobRequirements, PracticeMode } from '../types/domain';
import type { RootStackParamList } from '../types/navigation';

export type StarterStep = 'idle' | 'reading' | 'questions';

export function usePracticeStarter() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { settings } = useApp();
  const [step, setStep] = useState<StarterStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const run = useRef(0);

  const start = useCallback(
    async (mode: PracticeMode, jobText: string, known?: JobRequirements) => {
      const id = ++run.current;
      const stale = () => id !== run.current;
      setError(null);
      try {
        let requirements = known;
        if (!requirements) {
          setStep('reading');
          requirements = await gemini.extractRequirements(sanitizeJobInfo(jobText));
          if (stale()) return;
        }

        setStep('questions');
        const length = sessionLengths[settings.sessionLength];
        if (mode === 'interview') {
          const questions = await gemini.generateInterviewQuestions(requirements, length.interview);
          if (stale()) return;
          navigation.navigate('Interview', { requirements, questions, jobText });
        } else {
          const questions = await gemini.generateQuiz(requirements, length.quiz);
          if (stale()) return;
          navigation.navigate('Quiz', { requirements, questions, jobText });
        }
      } catch (e) {
        if (!stale()) setError(errorMessage(e));
      } finally {
        if (!stale()) setStep('idle');
      }
    },
    [navigation, settings.sessionLength],
  );

  /** Abandona a preparação em andamento (a resposta que chegar depois é ignorada). */
  const cancel = useCallback(() => {
    run.current++;
    setStep('idle');
  }, []);

  return { start, cancel, step, busy: step !== 'idle', error, clearError: () => setError(null) };
}
