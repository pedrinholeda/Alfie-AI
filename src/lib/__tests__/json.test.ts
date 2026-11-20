import { ModelJsonError, parseModelJson } from '../json';

describe('parseModelJson', () => {
  it('lê JSON puro', () => {
    expect(parseModelJson('{"a": 1}')).toEqual({ a: 1 });
  });

  it('aceita JSON dentro de cerca de código markdown', () => {
    expect(parseModelJson('```json\n{"questions": []}\n```')).toEqual({ questions: [] });
  });

  it('ignora texto antes e depois do JSON', () => {
    expect(parseModelJson('Claro! Aqui está:\n[1, 2]\nBoa sorte.')).toEqual([1, 2]);
  });

  it('recusa JSON cortado em vez de inventar o fim', () => {
    // A versão antiga tentava fechar chaves sozinha e podia entrar em laço infinito.
    expect(() => parseModelJson('{"questions": [{"question": "O que é')).toThrow(ModelJsonError);
  });

  it('recusa resposta sem JSON', () => {
    expect(() => parseModelJson('Não sei responder.')).toThrow(ModelJsonError);
  });
});
