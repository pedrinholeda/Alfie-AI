declare module '@env' {
  export const GOOGLE_GEMINI_API_KEY: string;
}

declare module '@react-navigation/native' {
  import { RootStackParamList } from './navigation';
  export function useNavigation<T extends keyof RootStackParamList>(): {
    navigate: (screen: T, params?: RootStackParamList[T]) => void;
    replace: (screen: T, params?: RootStackParamList[T]) => void;
  };
} 