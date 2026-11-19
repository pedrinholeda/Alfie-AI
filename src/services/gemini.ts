/**
 * Cliente da API do Gemini. Só faz HTTP: os prompts estão em src/prompts, a configuração em
 * src/config/ai.ts e a conferência das respostas em src/lib/normalize.ts.
 *
 * A chave vai no cabeçalho x-goog-api-key, não na URL, para não aparecer em logs.
 */
import { aiConfig } from '../config/ai';
import { AiError, classifyApiError } from '../lib/errors';
import { ModelJsonError, parseModelJson } from '../lib/json';
import { pickModel, type ApiModel } from '../lib/models';
import {
  normalizeFeedback,
  normalizeFinalAnalysis,
  normalizeInterviewQuestions,
  normalizeQuizQuestions,
  normalizeRequirements,
} from '../lib/normalize';
import {
  answerFeedbackPrompt,
  finalAnalysisPrompt,
  interviewQuestionsPrompt,
  quizPrompt,
  requirementsPrompt,
} from '../prompts';
import type {
  FinalAnalysis,
  InterviewAnswer,
  InterviewFeedback,
  InterviewQuestion,
  JobRequirements,
  QuizQuestion,
} from '../types/domain';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path: string, apiKey: string, init: RequestInit = {}): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), aiConfig.timeoutMs);
  let response: Response;
  try {
    response = await fetch(`${aiConfig.baseUrl}/${path}`, {
      ...init,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    });
  } catch (error) {
    throw new AiError((error as Error)?.name === 'AbortError' ? 'timeout' : 'network');
  } finally {
    clearTimeout(timer);
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) throw classifyApiError(response.status, body);
  return body;
}

interface GenerateResponse {
  candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
}

export class GeminiClient {
  private apiKey = '';
  private model: string = aiConfig.preferredModels[0];
  private repicked = false;

  /** Chamado quando o cliente troca de modelo sozinho, para o app guardar a escolha. */
  onModelChange?: (model: string) => void;

  get configured(): boolean {
    return this.apiKey.length > 0;
  }

  get modelName(): string {
    return this.model;
  }

  setApiKey(key: string, model?: string) {
    this.apiKey = key.trim();
    this.repicked = false;
    if (model) this.model = model;
  }

  clear() {
    this.apiKey = '';
    this.model = aiConfig.preferredModels[0];
  }

  /**
   * Confere a chave listando os modelos que ela enxerga e devolve o modelo escolhido.
   * Lança AiError('invalid_key') se a chave for recusada.
   */
  async validateKey(key: string): Promise<string> {
    const trimmed = key.trim();
    if (!trimmed) throw new AiError('missing_key');
    const body = (await request('models?pageSize=200', trimmed)) as { models?: ApiModel[] };
    const model = pickModel(body.models ?? [], aiConfig.preferredModels);
    if (!model) {
      throw new AiError(
        'invalid_key',
        'Esta chave não tem acesso a nenhum modelo Gemini. Confira no Google AI Studio.',
      );
    }
    return model;
  }

  /** Gera JSON a partir de um prompt, com novas tentativas em erro temporário. */
  private async generateJson(prompt: string): Promise<unknown> {
    if (!this.configured) throw new AiError('missing_key');

    let lastError: AiError = new AiError('unknown');
    for (let attempt = 0; attempt <= aiConfig.retries; attempt++) {
      if (attempt > 0) await wait(1500 * attempt);
      try {
        const body = (await request(`models/${this.model}:generateContent`, this.apiKey, {
          method: 'POST',
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: aiConfig.temperature,
              maxOutputTokens: aiConfig.maxOutputTokens,
              responseMimeType: 'application/json',
            },
          }),
        })) as GenerateResponse;

        if (body.promptFeedback?.blockReason) throw new AiError('blocked');
        const candidate = body.candidates?.[0];
        if (candidate?.finishReason === 'SAFETY') throw new AiError('blocked');
        const text = candidate?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
        if (!text) throw new AiError('bad_response');
        return parseModelJson(text);
      } catch (error) {
        lastError =
          error instanceof AiError
            ? error
            : error instanceof ModelJsonError
              ? new AiError('bad_response')
              : new AiError('unknown');
        // Modelo desligado pelo Google: escolhe outro entre os disponíveis e tenta de novo.
        if (lastError.kind === 'model_unavailable' && !this.repicked) {
          this.repicked = true;
          this.model = await this.validateKey(this.apiKey);
          this.onModelChange?.(this.model);
          continue;
        }
        if (!lastError.retryable) throw lastError;
      }
    }
    throw lastError;
  }

  async extractRequirements(jobText: string): Promise<JobRequirements> {
    return normalizeRequirements(await this.generateJson(requirementsPrompt(jobText)));
  }

  async generateInterviewQuestions(
    requirements: JobRequirements,
    counts: { technical: number; behavioral: number },
  ): Promise<InterviewQuestion[]> {
    const [technical, behavioral] = await Promise.all([
      this.generateJson(interviewQuestionsPrompt(requirements, 'technical', counts.technical)),
      this.generateJson(interviewQuestionsPrompt(requirements, 'behavioral', counts.behavioral)),
    ]);
    const questions = [
      ...normalizeInterviewQuestions(technical, 'technical', counts.technical),
      ...normalizeInterviewQuestions(behavioral, 'behavioral', counts.behavioral),
    ];
    if (questions.length === 0) throw new AiError('bad_response');
    return questions;
  }

  async evaluateAnswer(
    requirements: JobRequirements,
    question: InterviewQuestion,
    answer: string,
  ): Promise<InterviewFeedback> {
    const raw = await this.generateJson(
      answerFeedbackPrompt(requirements, question.question, question.expectedTopics, answer),
    );
    return normalizeFeedback(raw);
  }

  async generateFinalAnalysis(
    requirements: JobRequirements,
    answers: InterviewAnswer[],
  ): Promise<FinalAnalysis> {
    return normalizeFinalAnalysis(
      await this.generateJson(finalAnalysisPrompt(requirements, answers)),
    );
  }

  async generateQuiz(requirements: JobRequirements, count: number): Promise<QuizQuestion[]> {
    const questions = normalizeQuizQuestions(
      await this.generateJson(quizPrompt(requirements, count)),
      count,
    );
    if (questions.length === 0) throw new AiError('bad_response');
    return questions;
  }
}

export const gemini = new GeminiClient();
