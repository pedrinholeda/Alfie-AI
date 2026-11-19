/** Tamanhos das sessões de prática que o usuário escolhe nos Ajustes. */

export type SessionLength = 'short' | 'standard' | 'long';

export interface LengthOption {
  label: string;
  /** Perguntas técnicas e comportamentais da entrevista. */
  interview: { technical: number; behavioral: number };
  /** Perguntas do quiz. */
  quiz: number;
}

export const sessionLengths: Record<SessionLength, LengthOption> = {
  short: { label: 'Curta', interview: { technical: 3, behavioral: 2 }, quiz: 5 },
  standard: { label: 'Padrão', interview: { technical: 5, behavioral: 3 }, quiz: 10 },
  long: { label: 'Longa', interview: { technical: 7, behavioral: 3 }, quiz: 15 },
};

export const defaultSessionLength: SessionLength = 'standard';

/** Texto mínimo da vaga, em caracteres, para a IA ter o que analisar. */
export const minJobTextLength = 60;

/** Sessões guardadas no histórico do aparelho. */
export const maxHistoryItems = 50;
