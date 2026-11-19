import type { InterviewSession, QuizSession } from '../../types/domain';
import { buildShareText } from '../share';

const requirements = {
  role: 'Dev Android',
  description: '',
  requirements: [],
  jobType: '',
  seniority: '',
  mainTechnologies: [],
};

describe('buildShareText', () => {
  it('resume a entrevista com a nota e os pontos fortes', () => {
    const session: InterviewSession = {
      id: '1',
      date: '',
      type: 'interview',
      score: 7.5,
      answers: [],
      jobText: '',
      requirements,
      analysis: {
        analysis: '',
        finalScore: 7.5,
        strengths: ['Kotlin', 'Testes', 'Arquitetura'],
        weaknesses: [],
        improvements: [],
      },
    };
    expect(buildShareText(session)).toBe(
      'Treinei uma entrevista para Dev Android no Alfie: nota 7.5/10.\nPontos fortes: Kotlin; Testes.',
    );
  });

  it('resume o quiz com o percentual', () => {
    const session: QuizSession = {
      id: '2',
      date: '',
      type: 'quiz',
      score: 80,
      answers: [],
      jobText: '',
      requirements,
    };
    expect(buildShareText(session)).toBe(
      'Fiz um quiz técnico para Dev Android no Alfie e acertei 80%.',
    );
  });
});
