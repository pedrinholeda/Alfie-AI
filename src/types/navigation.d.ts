import type {
  InterviewFeedback,
  InterviewQuestion,
  JobRequirements,
  QuizQuestion,
} from '../services/gemini';

export type RootStackParamList = {
  Introduction: undefined;
  Onboarding: undefined;
  Home: undefined;
  Interview: {
    requirements: JobRequirements;
    questions: InterviewQuestion[];
  };
  Quiz: {
    requirements: JobRequirements;
    questions: QuizQuestion[];
  };
  Results: {
    score?: number;
    total?: number;
    questions?: InterviewQuestion[];
    answers?: { question: string; answer: string; feedback: InterviewFeedback | null }[];
    requirements?: JobRequirements;
  };
  History: undefined;
};
