/** Leitura do JSON que o modelo devolve. */

export class ModelJsonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModelJsonError';
  }
}

/**
 * Faz o parse da resposta do modelo. Com responseMimeType JSON o texto já vem limpo, mas
 * modelos às vezes embrulham em cercas de código markdown ou acrescentam uma frase: aceita
 * esses casos e falha com ModelJsonError quando não há JSON completo. Nunca tenta
 * "consertar" um JSON cortado: a versão antiga fazia isso e podia entrar em laço infinito.
 */
export function parseModelJson<T = unknown>(text: string): T {
  const trimmed = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // Tenta o trecho entre o primeiro { ou [ e o último } ou ].
  }

  const start = trimmed.search(/[[{]/);
  const end = Math.max(trimmed.lastIndexOf('}'), trimmed.lastIndexOf(']'));
  if (start === -1 || end <= start) {
    throw new ModelJsonError('A resposta da IA não trouxe JSON.');
  }

  try {
    return JSON.parse(trimmed.slice(start, end + 1)) as T;
  } catch {
    throw new ModelJsonError('A resposta da IA veio incompleta.');
  }
}
