/** Funções puras sobre o texto da vaga que o usuário cola na Home. */

/**
 * Remove URLs e símbolos soltos, mantendo letras de qualquer idioma (acentos inclusos),
 * números, pontuação básica e os caracteres de nomes de tecnologia (C#, C++, Node.js, CI/CD).
 */
export function sanitizeJobInfo(jobInfo: string): string {
  const withoutUrls = jobInfo.replace(/https?:\/\/[^\s]+/g, '');
  return withoutUrls
    .replace(/[^\p{L}\p{N}\s.,;:()/+#_-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Diz se o texto é um link (http, https ou www). */
export function isUrl(text: string): boolean {
  try {
    new URL(text);
    return true;
  } catch {
    return text.toLowerCase().startsWith('www.') || text.toLowerCase().startsWith('http');
  }
}
