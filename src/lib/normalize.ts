/**
 * Normalização das respostas do modelo. O modelo segue o esquema pedido quase sempre, mas
 * não sempre: aqui cada campo é conferido, limpo e limitado, e o que não dá para usar é
 * descartado em vez de virar uma pergunta com resposta errada.
 */
import type {
  Difficulty,
  FinalAnalysis,
  InterviewFeedback,
  InterviewQuestion,
  JobRequirements,
  QuestionType,
  QuizQuestion,
} from '../types/domain';

type Raw = Record<string, unknown>;

const isObject = (value: unknown): value is Raw =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const text = (value: unknown): string =>
  typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';

const list = (value: unknown, max = 20): string[] =>
  (Array.isArray(value) ? value : [])
    .map(text)
    .filter((item) => item.length > 0)
    .slice(0, max);

/** Lista que vem dentro de um objeto ({ questions: [...] }) ou solta. */
const items = (value: unknown, key: string): unknown[] => {
  if (Array.isArray(value)) return value;
  if (isObject(value) && Array.isArray(value[key])) return value[key] as unknown[];
  return [];
};

const stripAccents = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '');

const DIFFICULTY_ALIASES: Record<string, Difficulty> = {
  easy: 'easy',
  facil: 'easy',
  medium: 'medium',
  medio: 'medium',
  media: 'medium',
  hard: 'hard',
  dificil: 'hard',
};

export function normalizeDifficulty(value: unknown): Difficulty {
  return DIFFICULTY_ALIASES[stripAccents(text(value).toLowerCase())] ?? 'medium';
}

function normalizeType(value: unknown, fallback: QuestionType): QuestionType {
  const t = stripAccents(text(value).toLowerCase());
  if (t.startsWith('tech') || t.startsWith('tec')) return 'technical';
  if (t.startsWith('behav') || t.startsWith('comport')) return 'behavioral';
  return fallback;
}

/** Nota de 0 a 10, com uma casa decimal. Aceita 7, "7", "7.5", "7,5" e "7/10". */
export function normalizeScore(value: unknown): number {
  let n: number;
  if (typeof value === 'number') {
    n = value;
  } else {
    const match = text(value)
      .replace(',', '.')
      .match(/-?\d+(\.\d+)?/);
    n = match ? Number(match[0]) : NaN;
  }
  if (!Number.isFinite(n)) return 0;
  return Math.round(Math.min(10, Math.max(0, n)) * 10) / 10;
}

export function normalizeRequirements(raw: unknown): JobRequirements {
  if (!isObject(raw)) throw new Error('Não consegui ler os requisitos da vaga.');
  const requirements: JobRequirements = {
    role: text(raw.role).slice(0, 80),
    description: text(raw.description).slice(0, 300),
    requirements: list(raw.requirements, 10),
    jobType: text(raw.jobType),
    seniority: text(raw.seniority),
    mainTechnologies: list(raw.mainTechnologies, 6),
  };
  if (requirements.requirements.length === 0 && requirements.mainTechnologies.length === 0) {
    throw new Error(
      'Não encontrei requisitos nesse texto. Cole a descrição completa da vaga e tente de novo.',
    );
  }
  if (!requirements.role) requirements.role = 'Vaga em tecnologia';
  return requirements;
}

/** Perguntas abertas válidas, até `max`. Pergunta sem enunciado é descartada. */
export function normalizeInterviewQuestions(
  raw: unknown,
  fallbackType: QuestionType,
  max: number,
): InterviewQuestion[] {
  return items(raw, 'questions')
    .filter(isObject)
    .map((q) => ({
      question: text(q.question),
      context: text(q.context),
      type: normalizeType(q.type, fallbackType),
      difficulty: normalizeDifficulty(q.difficulty),
      expectedTopics: list(q.expectedTopics, 8),
    }))
    .filter((q) => q.question.length > 0)
    .slice(0, max);
}

/**
 * Perguntas de múltipla escolha válidas, até `max`. Descarta a pergunta sem enunciado, com
 * menos de duas opções ou com o índice da resposta certa fora das opções. A versão antiga
 * trocava o índice inválido por 0, marcando como certa uma opção que podia estar errada.
 */
export function normalizeQuizQuestions(raw: unknown, max: number): QuizQuestion[] {
  return items(raw, 'questions')
    .filter(isObject)
    .map((q) => {
      const options = list(q.options, 5);
      const correct = Number(q.correctAnswer);
      return {
        question: text(q.question),
        options,
        correctAnswer: Number.isInteger(correct) ? correct : -1,
        explanation: text(q.explanation),
        type: normalizeType(q.type, 'technical'),
        difficulty: normalizeDifficulty(q.difficulty),
        topic: text(q.topic),
      };
    })
    .filter(
      (q) =>
        q.question.length > 0 &&
        q.options.length >= 2 &&
        q.correctAnswer >= 0 &&
        q.correctAnswer < q.options.length,
    )
    .slice(0, max);
}

export function normalizeFeedback(raw: unknown): InterviewFeedback {
  if (!isObject(raw)) throw new Error('Não consegui ler a avaliação da resposta.');
  const feedback = text(raw.feedback);
  if (!feedback) throw new Error('A avaliação da resposta veio vazia.');
  return {
    feedback,
    score: normalizeScore(raw.score),
    suggestions: list(raw.suggestions, 6),
    strengths: list(raw.strengths, 6),
    weaknesses: list(raw.weaknesses, 6),
  };
}

export function normalizeFinalAnalysis(raw: unknown): FinalAnalysis {
  if (!isObject(raw)) throw new Error('Não consegui ler a análise final.');
  const analysis = text(raw.analysis);
  if (!analysis) throw new Error('A análise final veio vazia.');
  return {
    analysis,
    finalScore: normalizeScore(raw.finalScore),
    strengths: list(raw.strengths, 6),
    weaknesses: list(raw.weaknesses, 6),
    improvements: list(raw.improvements, 8),
  };
}
