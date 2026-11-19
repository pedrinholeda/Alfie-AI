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

  it('mantém letras acentuadas', () => {
    expect(sanitizeJobInfo('Experiência com comunicação e gestão')).toBe(
      'Experiência com comunicação e gestão',
    );
  });

  it('mantém nomes de tecnologia com símbolos', () => {
    expect(sanitizeJobInfo('C#, C++, Node.js e CI/CD')).toBe('C#, C++, Node.js e CI/CD');
  });

  it('remove emojis e símbolos soltos', () => {
    expect(sanitizeJobInfo('🚀 Vaga ★ remota')).toBe('Vaga remota');
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
