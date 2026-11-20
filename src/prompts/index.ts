/**
 * Prompts do Alfie. Para mudar o tom, o idioma ou o que a IA avalia, mude só este arquivo.
 *
 * Cada prompt pede JSON num formato fixo; o cliente liga o modo JSON do Gemini e
 * src/lib/normalize.ts confere o resultado. Os prompts nunca citam uma tecnologia ou cargo
 * fixo: tudo vem da vaga que o usuário colou.
 */
import type { InterviewAnswer, JobRequirements, QuestionType } from '../types/domain';

const persona =
  'Você é o Alfie, um entrevistador experiente de vagas de tecnologia. ' +
  'Escreva sempre em português do Brasil, com tom profissional, direto e encorajador.';

const describeJob = (r: JobRequirements) =>
  [
    `Cargo: ${r.role}`,
    `Senioridade: ${r.seniority || 'não informada'}`,
    `Tipo de vaga: ${r.jobType || 'não informado'}`,
    `Tecnologias principais: ${r.mainTechnologies.join(', ') || 'não informadas'}`,
    `Requisitos: ${r.requirements.join('; ')}`,
    `Resumo: ${r.description}`,
  ].join('\n');

export function requirementsPrompt(jobText: string): string {
  return `${persona}

Leia a descrição de vaga abaixo e extraia o que importa para preparar uma entrevista.
Responda só com JSON neste formato:
{
  "role": "cargo curto, como apareceria num título (até 60 caracteres)",
  "description": "resumo da vaga em até 200 caracteres",
  "requirements": ["de 4 a 10 requisitos técnicos e comportamentais"],
  "jobType": "CLT, PJ, estágio, freelance, remoto, híbrido... ou vazio se não houver",
  "seniority": "estágio, júnior, pleno, sênior, especialista... ou a melhor estimativa",
  "mainTechnologies": ["de 1 a 6 tecnologias, ferramentas ou áreas principais"]
}

Se o texto não for uma vaga, devolva listas vazias.

Descrição da vaga:
"""
${jobText}
"""`;
}

export function interviewQuestionsPrompt(
  r: JobRequirements,
  type: QuestionType,
  count: number,
): string {
  const kind =
    type === 'technical'
      ? `técnicas, sobre as tecnologias e requisitos da vaga, práticas e baseadas em problemas
reais (arquitetura, depuração, decisões e trocas), sem perguntas de decoreba`
      : `comportamentais, sobre situações reais de trabalho (equipe, conflito, prazos,
comunicação, erros e aprendizado), que pedem uma resposta no formato STAR`;

  return `${persona}

Crie ${count} perguntas ${kind}, adequadas ao nível de senioridade da vaga.
Varie a dificuldade entre easy, medium e hard, começando pelas mais fáceis.
Responda só com JSON neste formato:
{
  "questions": [
    {
      "question": "a pergunta, como você falaria ao candidato",
      "context": "uma frase dizendo o que a pergunta quer avaliar",
      "type": "${type}",
      "difficulty": "easy | medium | hard",
      "expectedTopics": ["pontos que uma boa resposta cobre"]
    }
  ]
}

Vaga:
${describeJob(r)}`;
}

export function answerFeedbackPrompt(
  r: JobRequirements,
  question: string,
  expectedTopics: string[],
  answer: string,
): string {
  return `${persona}

Avalie a resposta do candidato à pergunta abaixo, considerando a senioridade da vaga.
Seja justo: resposta vazia, evasiva ou fora do tema recebe nota baixa.
Responda só com JSON neste formato:
{
  "feedback": "2 a 4 frases sobre a resposta, falando direto com o candidato",
  "score": número de 0 a 10,
  "strengths": ["o que a resposta fez bem"],
  "weaknesses": ["o que faltou ou estava errado"],
  "suggestions": ["como responder melhor, de forma prática"]
}

Vaga:
${describeJob(r)}

Pergunta: ${question}
Pontos esperados: ${expectedTopics.join(', ') || 'não informados'}

Resposta do candidato:
"""
${answer}
"""`;
}

export function finalAnalysisPrompt(r: JobRequirements, answers: InterviewAnswer[]): string {
  const transcript = answers
    .map((a, i) => {
      const tipo = a.question.type === 'technical' ? 'técnica' : 'comportamental';
      const resultado = a.feedback ? `nota ${a.feedback.score}/10` : 'pulada pelo candidato';
      return `${i + 1}. [${tipo}] ${a.question.question}\nResposta: ${a.answer || '(sem resposta)'}\nAvaliação: ${resultado}`;
    })
    .join('\n\n');

  return `${persona}

Faça a análise final desta entrevista simulada, como um feedback de recrutador.
Considere as perguntas puladas como pontos a desenvolver.
Responda só com JSON neste formato:
{
  "analysis": "3 a 5 frases sobre o desempenho geral e a aderência à vaga",
  "finalScore": número de 0 a 10,
  "strengths": ["principais pontos fortes"],
  "weaknesses": ["principais pontos a desenvolver"],
  "improvements": ["plano de estudo e prática, em passos concretos"]
}

Vaga:
${describeJob(r)}

Entrevista:
${transcript}`;
}

export function quizPrompt(r: JobRequirements, count: number): string {
  return `${persona}

Crie ${count} perguntas de múltipla escolha para testar o conhecimento exigido pela vaga.
Use as tecnologias e requisitos da vaga, adequadas à senioridade. Cerca de 80% técnicas e
20% comportamentais (boas práticas de trabalho em equipe e processo). Varie a dificuldade.
Cada pergunta tem 4 opções plausíveis e só uma correta; varie a posição da correta.
Responda só com JSON neste formato:
{
  "questions": [
    {
      "question": "enunciado",
      "options": ["opção A", "opção B", "opção C", "opção D"],
      "correctAnswer": índice da opção correta, de 0 a 3,
      "explanation": "por que a correta está certa, em até 2 frases",
      "type": "technical | behavioral",
      "difficulty": "easy | medium | hard",
      "topic": "tema curto da pergunta"
    }
  ]
}

Vaga:
${describeJob(r)}`;
}
