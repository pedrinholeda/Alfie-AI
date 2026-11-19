import { averageScore, quizPercentage } from '../scoring';

describe('averageScore', () => {
  it('faz a média das notas', () => {
    expect(
      averageScore([
        { question: 'a', feedback: { score: 8 } },
        { question: 'b', feedback: { score: 6 } },
      ]),
    ).toBe(7);
  });

  it('conta resposta sem feedback como zero', () => {
    expect(
      averageScore([
        { question: 'a', feedback: { score: 9 } },
        { question: 'b', feedback: null },
      ]),
    ).toBe(4.5);
  });

  it('devolve zero sem respostas, em vez de NaN', () => {
    expect(averageScore([])).toBe(0);
  });
});

describe('quizPercentage', () => {
  it('calcula o percentual de acertos', () => {
    expect(quizPercentage(7, 10)).toBe(70);
  });

  it('não divide por zero', () => {
    expect(quizPercentage(0, 0)).toBe(0);
  });
});
