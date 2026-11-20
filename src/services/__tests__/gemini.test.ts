import { AiError } from '../../lib/errors';
import { GeminiClient } from '../gemini';

jest.mock('../../config/ai', () => ({
  aiConfig: {
    baseUrl: 'https://api.test/v1beta',
    preferredModels: ['gemini-flash-latest'],
    temperature: 0.7,
    maxOutputTokens: 100,
    timeoutMs: 1000,
    retries: 2,
  },
}));

const json = (status: number, body: unknown) =>
  Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) } as Response);

const answer = (payload: unknown) =>
  json(200, { candidates: [{ content: { parts: [{ text: JSON.stringify(payload) }] } }] });

const requirements = {
  role: 'Dev',
  description: '',
  requirements: ['React'],
  jobType: '',
  seniority: 'Pleno',
  mainTechnologies: ['React'],
};

describe('GeminiClient', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => jest.useRealTimers());

  it('envia a chave no cabeçalho, nunca na URL', async () => {
    fetchMock.mockReturnValue(json(200, { models: [{ name: 'models/gemini-flash-latest' }] }));
    await new GeminiClient().validateKey(' chave-termina-a91f ');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).not.toContain('chave-termina-a91f');
    expect(init.headers['x-goog-api-key']).toBe('chave-termina-a91f');
  });

  it('valida a chave e devolve o modelo escolhido', async () => {
    fetchMock.mockReturnValue(json(200, { models: [{ name: 'models/gemini-3.5-flash' }] }));
    await expect(new GeminiClient().validateKey('k')).resolves.toBe('gemini-3.5-flash');
  });

  it('reconhece chave recusada', async () => {
    fetchMock.mockReturnValue(json(400, { error: { message: 'API key not valid.' } }));
    await expect(new GeminiClient().validateKey('k')).rejects.toMatchObject({
      kind: 'invalid_key',
    });
  });

  it('não chama a API sem chave', async () => {
    await expect(new GeminiClient().generateQuiz(requirements, 5)).rejects.toBeInstanceOf(AiError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('pede JSON ao modelo e tenta de novo em erro temporário', async () => {
    const client = new GeminiClient();
    client.setApiKey('k', 'gemini-flash-latest');
    fetchMock.mockReturnValueOnce(json(503, {})).mockReturnValueOnce(
      answer({
        questions: [{ question: 'Q', options: ['a', 'b'], correctAnswer: 1, explanation: 'e' }],
      }),
    );

    const promise = client.generateQuiz(requirements, 5);
    await jest.runAllTimersAsync();
    const questions = await promise;

    expect(questions).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const body = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(body.generationConfig.responseMimeType).toBe('application/json');
    expect(fetchMock.mock.calls[1][0]).toContain('models/gemini-flash-latest:generateContent');
  });

  it('não insiste quando a cota acabou', async () => {
    const client = new GeminiClient();
    client.setApiKey('k');
    fetchMock.mockReturnValue(json(429, { error: { status: 'RESOURCE_EXHAUSTED' } }));
    await expect(client.extractRequirements('vaga')).rejects.toMatchObject({ kind: 'quota' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('troca de modelo sozinho quando o atual foi desligado', async () => {
    // Foi o que quebrou o app em junho de 2026, quando o gemini-2.0-flash saiu do ar.
    const client = new GeminiClient();
    const onModelChange = jest.fn();
    client.onModelChange = onModelChange;
    client.setApiKey('k', 'gemini-2.0-flash');
    fetchMock
      .mockReturnValueOnce(json(404, { error: { status: 'NOT_FOUND' } }))
      .mockReturnValueOnce(json(200, { models: [{ name: 'models/gemini-flash-latest' }] }))
      .mockReturnValueOnce(answer({ requirements: ['React'], role: 'Dev' }));

    const promise = client.extractRequirements('vaga');
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(result.role).toBe('Dev');
    expect(client.modelName).toBe('gemini-flash-latest');
    expect(onModelChange).toHaveBeenCalledWith('gemini-flash-latest');
    expect(fetchMock.mock.calls[2][0]).toContain('models/gemini-flash-latest:generateContent');
  });

  it('junta perguntas técnicas e comportamentais da entrevista', async () => {
    const client = new GeminiClient();
    client.setApiKey('k');
    fetchMock
      .mockReturnValueOnce(answer({ questions: [{ question: 'T1' }, { question: 'T2' }] }))
      .mockReturnValueOnce(answer({ questions: [{ question: 'B1' }] }));
    const questions = await client.generateInterviewQuestions(requirements, {
      technical: 2,
      behavioral: 1,
    });
    expect(questions.map((q) => [q.question, q.type])).toEqual([
      ['T1', 'technical'],
      ['T2', 'technical'],
      ['B1', 'behavioral'],
    ]);
  });
});
