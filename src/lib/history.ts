/** Regras puras do histórico de sessões. */
import type { InterviewAnswer, PracticeSession, QuizAnswer } from '../types/domain';
import { averageScore } from './scoring';

/** Identificador curto e único o bastante para sessões locais. */
export function createId(now: number = Date.now(), random: number = Math.random()): string {
  return `${now.toString(36)}-${Math.floor(random * 1e8).toString(36)}`;
}

/** Põe a sessão no topo, sem repetir o id, e guarda no máximo `max` sessões. */
export function addSession(
  list: PracticeSession[],
  session: PracticeSession,
  max: number,
): PracticeSession[] {
  return [session, ...list.filter((s) => s.id !== session.id)].slice(0, max);
}

/** Nota de 0 a 10 de qualquer sessão (o quiz guarda percentual). */
export function sessionScore10(session: PracticeSession): number {
  return session.type === 'quiz' ? session.score / 10 : session.score;
}

export interface HistoryStats {
  total: number;
  /** Média de 0 a 10, ou null sem sessões. */
  average: number | null;
  /** Diferença da média das 3 últimas para as 3 anteriores, ou null sem dados. */
  trend: number | null;
}

export function historyStats(list: PracticeSession[]): HistoryStats {
  if (list.length === 0) return { total: 0, average: null, trend: null };
  const scores = list.map(sessionScore10);
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const recent = scores.slice(0, 3);
  const before = scores.slice(3, 6);
  return {
    total: list.length,
    average: Math.round(mean(scores) * 10) / 10,
    trend: before.length > 0 ? Math.round((mean(recent) - mean(before)) * 10) / 10 : null,
  };
}

/** Nota da entrevista: a da análise final, se houver; senão, a média das respondidas. */
export function interviewScore(answers: InterviewAnswer[], finalScore?: number | null): number {
  if (typeof finalScore === 'number') return finalScore;
  const answered = answers.filter((a) => a.feedback !== null);
  return (
    Math.round(
      averageScore(answered.map((a) => ({ question: a.question.question, feedback: a.feedback }))) *
        10,
    ) / 10
  );
}

export function quizScore(answers: QuizAnswer[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter((a) => a.selected === a.question.correctAnswer).length;
  return Math.round((correct / answers.length) * 100);
}

/**
 * Converte o histórico da versão 1.0, que só guardava o quiz como "acertos de total" e nunca
 * chegou a salvar entrevistas. Entradas que não dá para aproveitar são descartadas.
 */
export function migrateLegacyHistory(raw: unknown): PracticeSession[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): PracticeSession[] => {
    if (!item || typeof item !== 'object' || item.type !== 'quiz') return [];
    const total = Number(item.totalQuestions);
    const score = Number(item.score);
    if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(score)) return [];
    return [
      {
        id: String(item.id ?? createId()),
        date: String(item.date ?? new Date().toISOString()),
        type: 'quiz',
        score: Math.round((score / total) * 100),
        answers: [],
        jobText: '',
        requirements: {
          role: 'Quiz técnico',
          description: '',
          requirements: [],
          jobType: '',
          seniority: '',
          mainTechnologies: [],
        },
      },
    ];
  });
}
