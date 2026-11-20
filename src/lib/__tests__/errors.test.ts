import { AiError, classifyApiError, errorMessage } from '../errors';

describe('classifyApiError', () => {
  it.each([
    [429, {}, 'quota'],
    [400, { error: { status: 'RESOURCE_EXHAUSTED' } }, 'quota'],
    [400, { error: { status: 'INVALID_ARGUMENT', message: 'API key not valid.' } }, 'invalid_key'],
    [403, { error: { status: 'PERMISSION_DENIED' } }, 'invalid_key'],
    [404, { error: { status: 'NOT_FOUND' } }, 'model_unavailable'],
    [503, null, 'server'],
    [400, { error: { status: 'INVALID_ARGUMENT', message: 'bad field' } }, 'unknown'],
  ])('HTTP %p %j vira %p', (status, body, kind) => {
    expect(classifyApiError(status, body).kind).toBe(kind);
  });
});

describe('AiError', () => {
  it('só tenta de novo em erro temporário', () => {
    expect(new AiError('server').retryable).toBe(true);
    expect(new AiError('network').retryable).toBe(true);
    expect(new AiError('invalid_key').retryable).toBe(false);
    expect(new AiError('quota').retryable).toBe(false);
  });
});

describe('errorMessage', () => {
  it('usa a mensagem do erro ou uma genérica', () => {
    expect(errorMessage(new AiError('quota'))).toMatch(/limite de uso/);
    expect(errorMessage(new Error('falhou'))).toBe('falhou');
    expect(errorMessage('???')).toMatch(/Algo deu errado/);
  });
});
