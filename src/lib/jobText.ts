/** Funções puras sobre o texto da vaga que o usuário cola na Home. */

/** Remove URLs e caracteres especiais, mantendo pontuação básica. */
export function sanitizeJobInfo(jobInfo: string): string {
  const withoutUrls = jobInfo.replace(/https?:\/\/[^\s]+/g, '');
  return withoutUrls
    .replace(/[^\w\s.,;:()-]/g, ' ')
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
