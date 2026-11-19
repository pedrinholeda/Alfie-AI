/**
 * Configuração da IA. Tudo o que alguém pode querer ajustar sem ler o resto do código:
 * modelos, limites de tempo e de tamanho das respostas.
 */
export const aiConfig = {
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',

  /**
   * Modelos em ordem de preferência. Os aliases "-latest" acompanham a versão estável mais
   * nova, então o app não quebra quando o Google desliga uma versão antiga (foi o que
   * aconteceu com o gemini-2.0-flash em junho de 2026). Se nenhum estiver disponível para a
   * chave, o app escolhe o Flash mais novo que a chave enxergar.
   */
  preferredModels: ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-flash-lite-latest'],

  temperature: 0.7,
  maxOutputTokens: 8192,

  /** Tempo máximo de uma chamada, em milissegundos. */
  timeoutMs: 60_000,

  /** Novas tentativas em erro temporário (rede, 429, 5xx). */
  retries: 2,
} as const;
