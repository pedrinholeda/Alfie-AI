/** Tipos do domínio do Alfie: vaga, perguntas, avaliações e sessões salvas. */

export type QuestionType = 'technical' | 'behavioral';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface JobRequirements {
  /** Cargo como o app vai mostrar ("Desenvolvedora React Native Pleno"). */
  role: string;
  description: string;
  requirements: string[];
  jobType: string;
  seniority: string;
  mainTechnologies: string[];
}

export interface InterviewQuestion {
  question: string;
  context: string;
  type: QuestionType;
  difficulty: Difficulty;
  expectedTopics: string[];
}

export interface InterviewFeedback {
  feedback: string;
  /** Nota de 0 a 10. */
  score: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface InterviewAnswer {
  question: InterviewQuestion;
  answer: string;
  /** null quando a pergunta foi pulada. */
  feedback: InterviewFeedback | null;
}

export interface FinalAnalysis {
  analysis: string;
  /** Nota de 0 a 10. */
  finalScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: QuestionType;
  difficulty: Difficulty;
  topic: string;
}

export interface QuizAnswer {
  question: QuizQuestion;
  /** Índice escolhido. */
  selected: number;
}

interface SessionBase {
  id: string;
  /** ISO 8601. */
  date: string;
  requirements: JobRequirements;
  /** Texto da vaga como o usuário colou, para praticar de novo. */
  jobText: string;
}

export interface InterviewSession extends SessionBase {
  type: 'interview';
  /** Nota de 0 a 10. */
  score: number;
  answers: InterviewAnswer[];
  analysis: FinalAnalysis | null;
}

export interface QuizSession extends SessionBase {
  type: 'quiz';
  /** Percentual de acertos, de 0 a 100. */
  score: number;
  answers: QuizAnswer[];
}

export type PracticeSession = InterviewSession | QuizSession;
export type PracticeMode = PracticeSession['type'];
