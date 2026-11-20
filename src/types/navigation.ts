import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { InterviewQuestion, JobRequirements, QuizQuestion } from './domain';

export type RootStackParamList = {
  Introduction: undefined;
  Onboarding: undefined;
  Home: undefined;
  Interview: { requirements: JobRequirements; questions: InterviewQuestion[]; jobText: string };
  Quiz: { requirements: JobRequirements; questions: QuizQuestion[]; jobText: string };
  Results: { sessionId: string; fresh?: boolean };
  History: undefined;
  Settings: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
