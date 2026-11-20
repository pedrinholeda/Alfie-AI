/** Cálculo de notas usado nas telas de resultado. */

export interface ScoredAnswer {
  question: string;
  feedback: { score: number } | null;
}

/** Média das notas das respostas; resposta sem feedback conta como zero. */
export function averageScore(answers: ScoredAnswer[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((acc, curr) => acc + (curr.feedback?.score || 0), 0);
  return total / answers.length;
}
