/** Erros da IA com mensagem pronta para mostrar ao usuário. */

export type AiErrorKind =
  | 'missing_key'
  | 'invalid_key'
  | 'quota'
  | 'network'
  | 'timeout'
  | 'blocked'
  | 'bad_response'
  | 'model_unavailable'
  | 'server'
  | 'unknown';

const MESSAGES: Record<AiErrorKind, string> = {
  missing_key: 'Configure sua chave do Gemini nos Ajustes para continuar.',
  invalid_key: 'A chave do Gemini não foi aceita. Confira a chave nos Ajustes.',
  quota:
    'O limite de uso da sua chave do Gemini foi atingido. Espere alguns minutos e tente de novo.',
  network: 'Sem conexão com o Gemini. Confira sua internet e tente de novo.',
  timeout: 'O Gemini demorou demais para responder. Tente de novo.',
  blocked: 'O Gemini recusou responder a esse conteúdo. Reformule e tente de novo.',
  bad_response: 'A resposta da IA veio num formato inesperado. Tente de novo.',
  model_unavailable: 'O modelo do Gemini usado pelo app não está mais disponível. Tente de novo.',
  server: 'O Gemini está instável agora. Tente de novo em instantes.',
  unknown: 'Algo deu errado ao falar com a IA. Tente de novo.',
};

export class AiError extends Error {
  readonly kind: AiErrorKind;

  constructor(kind: AiErrorKind, message: string = MESSAGES[kind]) {
    super(message);
    this.name = 'AiError';
    this.kind = kind;
  }

  /** Erros que costumam passar sozinhos e valem nova tentativa. */
  get retryable(): boolean {
    return (
      this.kind === 'network' ||
      this.kind === 'timeout' ||
      this.kind === 'server' ||
      this.kind === 'bad_response'
    );
  }
}

interface ApiErrorBody {
  error?: { status?: string; message?: string };
}

/** Traduz a resposta de erro HTTP da API do Gemini num AiError. */
export function classifyApiError(status: number, body: unknown): AiError {
  const apiStatus = (body as ApiErrorBody | null)?.error?.status ?? '';
  const apiMessage = (body as ApiErrorBody | null)?.error?.message ?? '';

  if (status === 429 || apiStatus === 'RESOURCE_EXHAUSTED') return new AiError('quota');
  if (
    status === 401 ||
    status === 403 ||
    apiStatus === 'PERMISSION_DENIED' ||
    apiStatus === 'UNAUTHENTICATED' ||
    /api key/i.test(apiMessage)
  ) {
    return new AiError('invalid_key');
  }
  if (status === 404 || apiStatus === 'NOT_FOUND') return new AiError('model_unavailable');
  if (status >= 500) return new AiError('server');
  return new AiError('unknown');
}

/** Mensagem amigável para qualquer erro que chegue a uma tela. */
export function errorMessage(error: unknown): string {
  if (error instanceof AiError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return MESSAGES.unknown;
}
