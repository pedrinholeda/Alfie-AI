/** Texto para compartilhar o resultado de uma sessão. */
import type { PracticeSession } from '../types/domain';

export function buildShareText(session: PracticeSession): string {
  const role = session.requirements.role;
  if (session.type === 'quiz') {
    const correct = session.answers.filter((a) => a.selected === a.question.correctAnswer).length;
    const detail = session.answers.length > 0 ? ` (${correct} de ${session.answers.length})` : '';
    return `Fiz um quiz técnico para ${role} no Alfie e acertei ${Math.round(session.score)}%${detail}.`;
  }
  const lines = [
    `Treinei uma entrevista para ${role} no Alfie: nota ${session.score.toFixed(1)}/10.`,
  ];
  const strengths = session.analysis?.strengths.slice(0, 2) ?? [];
  if (strengths.length > 0) lines.push(`Pontos fortes: ${strengths.join('; ')}.`);
  return lines.join('\n');
}
