/** Escolha do modelo do Gemini a partir da lista que a API devolve para a chave. */

export interface ApiModel {
  /** Nome completo, como "models/gemini-2.5-flash". */
  name: string;
  supportedGenerationMethods?: string[];
}

const shortName = (name: string) => name.replace(/^models\//, '');

/** Extrai a versão numérica do nome ("gemini-2.5-flash" vira [2, 5]). */
function version(name: string): number[] {
  const match = shortName(name).match(/gemini-(\d+)(?:\.(\d+))?/);
  if (!match) return [0, 0];
  return [Number(match[1]), Number(match[2] ?? 0)];
}

function compareVersionDesc(a: string, b: string): number {
  const [a1, a2] = version(a);
  const [b1, b2] = version(b);
  return b1 - a1 || b2 - a2;
}

/**
 * Devolve o nome curto do modelo a usar, ou null se a chave não enxerga nenhum modelo que
 * gere texto. Ordem: o primeiro da lista de preferência que estiver disponível; senão, o
 * Flash estável mais novo; senão, qualquer Gemini que gere conteúdo.
 */
export function pickModel(available: ApiModel[], preferred: readonly string[]): string | null {
  const usable = available.filter((m) =>
    (m.supportedGenerationMethods ?? ['generateContent']).includes('generateContent'),
  );
  const names = usable.map((m) => shortName(m.name));

  for (const wanted of preferred) {
    if (names.includes(wanted)) return wanted;
  }

  const gemini = names.filter((n) => n.startsWith('gemini-'));
  const stable = (n: string) => !/(preview|exp|experimental|tts|image|live|embedding)/.test(n);

  const flash = gemini.filter((n) => n.includes('flash') && stable(n)).sort(compareVersionDesc);
  if (flash.length > 0) return flash[0];

  const any = gemini.filter(stable).sort(compareVersionDesc);
  return any[0] ?? null;
}
