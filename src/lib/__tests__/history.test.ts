import type {
  InterviewAnswer,
  InterviewSession,
  PracticeSession,
  QuizAnswer,
  QuizQuestion,
} from '../../types/domain';
import {
  addSession,
  createId,
  historyStats,
  interviewScore,
  migrateLegacyHistory,
  quizScore,
  sessionScore10,
} from '../history';

const requirements = {
  role: 'Dev',
  description: '',
  requirements: [],
  jobType: '',
  seniority: '',
  mainTechnologies: [],
};

const interview = (id: string, score: number): InterviewSession => ({
  id,
  date: '2026-11-19T10:00:00.000Z',
  type: 'interview',
  score,
  answers: [],
  analysis: null,
  requirements,
  jobText: '',
});

const question = (q: string) => ({
  question: q,
  context: '',
  type: 'technical' as const,
  difficulty: 'easy' as const,
  expectedTopics: [],
});

const feedback = (score: number) => ({
  feedback: 'ok',
  score,
  strengths: [],
  weaknesses: [],
  suggestions: [],
});

describe('createId', () => {
  it('gera ids diferentes para momentos diferentes', () => {
    expect(createId(1, 0.5)).not.toBe(createId(2, 0.5));
  });
});

describe('addSession', () => {
  it('põe a sessão no topo e respeita o limite', () => {
    const list = [interview('a', 5), interview('b', 6)];
    expect(addSession(list, interview('c', 7), 2).map((s) => s.id)).toEqual(['c', 'a']);
  });

  it('não duplica a mesma sessão', () => {
    const list = [interview('a', 5)];
    expect(addSession(list, interview('a', 9), 10)).toHaveLength(1);
  });
});

describe('interviewScore', () => {
  const answers: InterviewAnswer[] = [
    { question: question('1'), answer: 'x', feedback: feedback(8) },
    { question: question('2'), answer: '', feedback: null },
    { question: question('3'), answer: 'y', feedback: feedback(6) },
  ];

  it('usa a nota da análise final quando existe', () => {
    expect(interviewScore(answers, 5.5)).toBe(5.5);
  });

  it('faz a média só das perguntas respondidas', () => {
    // Antes, as respostas anteriores à última eram perdidas e contavam como zero.
    expect(interviewScore(answers)).toBe(7);
  });
});

describe('quizScore', () => {
  const q: QuizQuestion = {
    question: 'q',
    options: ['a', 'b'],
    correctAnswer: 1,
    explanation: '',
    type: 'technical',
    difficulty: 'easy',
    topic: '',
  };
  it('devolve o percentual de acertos', () => {
    const answers: QuizAnswer[] = [
      { question: q, selected: 1 },
      { question: q, selected: 0 },
      { question: q, selected: 1 },
      { question: q, selected: 1 },
    ];
    expect(quizScore(answers)).toBe(75);
  });
});

describe('historyStats', () => {
  it('sem sessões não tem média', () => {
    expect(historyStats([])).toEqual({ total: 0, average: null, trend: null });
  });

  it('põe quiz e entrevista na mesma escala de 0 a 10', () => {
    const quiz = { ...interview('q', 0), type: 'quiz', score: 80, answers: [] } as PracticeSession;
    expect(sessionScore10(quiz)).toBe(8);
    expect(historyStats([quiz, interview('i', 6)]).average).toBe(7);
  });

  it('compara as 3 últimas sessões com as 3 anteriores', () => {
    const list = [9, 9, 9, 6, 6, 6].map((n, i) => interview(String(i), n));
    expect(historyStats(list).trend).toBe(3);
  });
});

describe('migrateLegacyHistory', () => {
  it('aproveita os quizzes da versão 1.0 e descarta o resto', () => {
    const result = migrateLegacyHistory([
      { id: 'x', date: '2025-05-01T00:00:00.000Z', type: 'quiz', score: 7, totalQuestions: 10 },
      { id: 'y', type: 'interview', score: 5 },
      { type: 'quiz', score: 3, totalQuestions: 0 },
      null,
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'x', type: 'quiz', score: 70 });
  });

  it('ignora dado que não é lista', () => {
    expect(migrateLegacyHistory({ foo: 1 })).toEqual([]);
  });
});
