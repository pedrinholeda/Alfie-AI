import { JobRequirements, InterviewQuestion } from '../services/gemini';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Interview: {
    requirements: JobRequirements;
    questions: InterviewQuestion[];
  };
  Results: {
    finalAnalysis: {
      analysis: string;
      finalScore: number;
      strengths: string[];
      improvements: string[];
    };
  };
}; 