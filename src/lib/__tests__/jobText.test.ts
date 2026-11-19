import { isUrl, sanitizeJobInfo } from '../jobText';

describe('sanitizeJobInfo', () => {
  it('remove URLs e espaços repetidos', () => {
    expect(sanitizeJobInfo('Vaga React   em https://exemplo.com/vaga  remota')).toBe(
      'Vaga React em remota',
    );
  });

  it('mantém pontuação básica', () => {
    expect(sanitizeJobInfo('Requisitos: React, TypeScript; testes (Jest).')).toBe(
      'Requisitos: React, TypeScript; testes (Jest).',
    );
  });

  it('limite conhecido: troca letras acentuadas por espaço', () => {
    // \w do JavaScript não casa com "ç" nem "ã": a vaga em português chega quebrada à IA.
    expect(sanitizeJobInfo('Experiência com comunicação')).toBe('Experi ncia com comunica o');
  });
});

describe('isUrl', () => {
  it.each(['https://exemplo.com/vaga', 'http://exemplo.com', 'www.exemplo.com'])(
    'reconhece %s como link',
    (text) => expect(isUrl(text)).toBe(true),
  );

  it('não trata texto de vaga como link', () => {
    expect(isUrl('Desenvolvedor React pleno com experiência em testes')).toBe(false);
  });
});
