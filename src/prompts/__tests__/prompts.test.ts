import type { JobRequirements } from '../../types/domain';
import {
  answerFeedbackPrompt,
  finalAnalysisPrompt,
  interviewQuestionsPrompt,
  quizPrompt,
} from '../index';

const dataJob: JobRequirements = {
  role: 'Cientista de Dados Sênior',
  description: 'Modelos de churn em produção',
  requirements: ['Python', 'SQL', 'MLOps'],
  jobType: 'Remoto',
  seniority: 'Sênior',
  mainTechnologies: ['Python', 'Spark'],
};

describe('prompts', () => {
  const prompts = [
    interviewQuestionsPrompt(dataJob, 'technical', 5),
    interviewQuestionsPrompt(dataJob, 'behavioral', 3),
    quizPrompt(dataJob, 10),
    answerFeedbackPrompt(dataJob, 'Como você evita data leakage?', ['validação'], 'Separo...'),
    finalAnalysisPrompt(dataJob, []),
  ];

  it('seguem a vaga em vez de um cargo fixo', () => {
    // A versão antiga pedia perguntas de "iOS Developer" para qualquer vaga.
    for (const prompt of prompts) {
      expect(prompt).not.toMatch(/iOS/);
      expect(prompt).toContain('Cientista de Dados Sênior');
      expect(prompt).toContain('Python');
    }
  });

  it('pedem a quantidade configurada', () => {
    expect(interviewQuestionsPrompt(dataJob, 'technical', 7)).toContain('Crie 7 perguntas');
    expect(quizPrompt(dataJob, 15)).toContain('Crie 15 perguntas');
  });

  it('marcam perguntas puladas na análise final', () => {
    const prompt = finalAnalysisPrompt(dataJob, [
      {
        question: {
          question: 'Fale de um conflito no time',
          context: '',
          type: 'behavioral',
          difficulty: 'medium',
          expectedTopics: [],
        },
        answer: '',
        feedback: null,
      },
    ]);
    expect(prompt).toContain('pulada pelo candidato');
    expect(prompt).toContain('[comportamental]');
  });
});
