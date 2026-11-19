import {
  normalizeDifficulty,
  normalizeFeedback,
  normalizeFinalAnalysis,
  normalizeInterviewQuestions,
  normalizeQuizQuestions,
  normalizeRequirements,
  normalizeScore,
} from '../normalize';

describe('normalizeScore', () => {
  it.each([
    [7, 7],
    ['8', 8],
    ['7,5', 7.5],
    ['6/10', 6],
    [12, 10],
    [-3, 0],
    ['sem nota', 0],
    [7.456, 7.5],
  ])('%p vira %p', (input, expected) => {
    expect(normalizeScore(input)).toBe(expected);
  });
});

describe('normalizeDifficulty', () => {
  it.each([
    ['easy', 'easy'],
    ['Fácil', 'easy'],
    ['MÉDIO', 'medium'],
    ['difícil', 'hard'],
    ['qualquer', 'medium'],
  ])('%p vira %p', (input, expected) => {
    expect(normalizeDifficulty(input)).toBe(expected);
  });
});

describe('normalizeRequirements', () => {
  it('limpa e limita os campos', () => {
    const result = normalizeRequirements({
      role: '  Dev React Native  ',
      description: 'Vaga remota',
      requirements: ['React', '', 'Testes', 42],
      jobType: 'CLT',
      seniority: 'Pleno',
      mainTechnologies: ['React Native', 'TypeScript'],
    });
    expect(result).toEqual({
      role: 'Dev React Native',
      description: 'Vaga remota',
      requirements: ['React', 'Testes', '42'],
      jobType: 'CLT',
      seniority: 'Pleno',
      mainTechnologies: ['React Native', 'TypeScript'],
    });
  });

  it('dá um cargo genérico quando a IA não devolve um', () => {
    expect(normalizeRequirements({ requirements: ['Python'] }).role).toBe('Vaga em tecnologia');
  });

  it('recusa texto que não é vaga', () => {
    expect(() => normalizeRequirements({ requirements: [], mainTechnologies: [] })).toThrow(
      /Não encontrei requisitos/,
    );
  });
});

describe('normalizeInterviewQuestions', () => {
  it('aceita a lista dentro de "questions" e descarta perguntas vazias', () => {
    const result = normalizeInterviewQuestions(
      {
        questions: [
          { question: 'Como você testa um hook?', difficulty: 'medium', expectedTopics: ['RTL'] },
          { question: '   ' },
          'lixo',
        ],
      },
      'technical',
      10,
    );
    expect(result).toEqual([
      {
        question: 'Como você testa um hook?',
        context: '',
        type: 'technical',
        difficulty: 'medium',
        expectedTopics: ['RTL'],
      },
    ]);
  });

  it('não exige uma distribuição exata de dificuldade e corta no máximo pedido', () => {
    // A versão antiga recusava o lote inteiro se não viessem exatamente 2 easy, 2 medium e 2 hard.
    const raw = Array.from({ length: 8 }, (_, i) => ({ question: `P${i}`, difficulty: 'hard' }));
    expect(normalizeInterviewQuestions(raw, 'behavioral', 5)).toHaveLength(5);
  });
});

describe('normalizeQuizQuestions', () => {
  const valid = {
    question: 'Qual hook guarda estado?',
    options: ['useState', 'useMemo', 'useRef', 'useId'],
    correctAnswer: 0,
    explanation: 'useState guarda estado e re-renderiza.',
    difficulty: 'easy',
    topic: 'React',
  };

  it('mantém pergunta válida', () => {
    expect(normalizeQuizQuestions({ questions: [valid] }, 10)).toEqual([
      { ...valid, type: 'technical' },
    ]);
  });

  it('descarta pergunta com resposta certa fora das opções', () => {
    // A versão antiga trocava o índice inválido por 0, marcando como certa uma opção errada.
    expect(normalizeQuizQuestions([{ ...valid, correctAnswer: 7 }], 10)).toEqual([]);
    expect(normalizeQuizQuestions([{ ...valid, correctAnswer: 'B' }], 10)).toEqual([]);
  });

  it('descarta pergunta com menos de duas opções', () => {
    expect(normalizeQuizQuestions([{ ...valid, options: ['só uma'] }], 10)).toEqual([]);
  });

  it('aceita o índice como texto numérico', () => {
    expect(normalizeQuizQuestions([{ ...valid, correctAnswer: '2' }], 10)[0].correctAnswer).toBe(2);
  });
});

describe('normalizeFeedback', () => {
  it('normaliza a nota e as listas', () => {
    expect(
      normalizeFeedback({
        feedback: 'Boa resposta.',
        score: '8/10',
        strengths: ['clareza'],
        weaknesses: [],
        suggestions: ['dê um exemplo'],
      }),
    ).toEqual({
      feedback: 'Boa resposta.',
      score: 8,
      strengths: ['clareza'],
      weaknesses: [],
      suggestions: ['dê um exemplo'],
    });
  });

  it('recusa avaliação vazia', () => {
    expect(() => normalizeFeedback({ score: 5 })).toThrow();
  });
});

describe('normalizeFinalAnalysis', () => {
  it('normaliza a análise final', () => {
    expect(
      normalizeFinalAnalysis({
        analysis: 'Bom desempenho.',
        finalScore: 7.25,
        improvements: ['a'],
      }),
    ).toEqual({
      analysis: 'Bom desempenho.',
      finalScore: 7.3,
      strengths: [],
      weaknesses: [],
      improvements: ['a'],
    });
  });
});
