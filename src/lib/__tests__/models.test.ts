import { pickModel } from '../models';

const model = (name: string, methods = ['generateContent']) => ({
  name: `models/${name}`,
  supportedGenerationMethods: methods,
});

const preferred = ['gemini-flash-latest', 'gemini-2.5-flash'];

describe('pickModel', () => {
  it('usa o primeiro modelo da lista de preferência que estiver disponível', () => {
    expect(pickModel([model('gemini-2.5-flash'), model('gemini-flash-latest')], preferred)).toBe(
      'gemini-flash-latest',
    );
  });

  it('funciona sem o gemini-2.0-flash, que foi desligado', () => {
    // A versão antiga exigia exatamente o gemini-2.0-flash e recusava qualquer chave.
    expect(pickModel([model('gemini-3.5-flash'), model('gemini-3.5-pro')], preferred)).toBe(
      'gemini-3.5-flash',
    );
  });

  it('prefere o Flash estável mais novo quando nenhum preferido existe', () => {
    expect(
      pickModel(
        [model('gemini-2.0-flash'), model('gemini-3.6-flash-preview'), model('gemini-3.1-flash')],
        preferred,
      ),
    ).toBe('gemini-3.1-flash');
  });

  it('ignora modelos que não geram conteúdo', () => {
    expect(
      pickModel(
        [model('gemini-flash-latest', ['embedContent']), model('gemini-2.5-pro')],
        preferred,
      ),
    ).toBe('gemini-2.5-pro');
  });

  it('devolve null quando a chave não enxerga nenhum Gemini', () => {
    expect(pickModel([model('text-embedding-004', ['embedContent'])], preferred)).toBeNull();
  });
});
