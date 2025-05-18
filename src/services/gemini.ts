import { GOOGLE_GEMINI_API_KEY } from '@env';
import axios from 'axios';

export interface JobRequirements {
  description: string;
  requirements: string[];
  jobType: string;
  seniority: string;
  mainTechnologies: string[];
}

interface JobRequirementsResponse {
  description: string;
  requirements: string[];
  jobType: string;
  seniority: string;
  mainTechnologies: string[];
  [key: string]: any;
}

interface QuestionResponse {
  question: string;
  context: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedTopics: string[];
  [key: string]: any;
}

interface FeedbackResponse {
  feedback: string;
  score: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  [key: string]: any;
}

export interface InterviewQuestion {
  question: string;
  context: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedTopics: string[];
}

export interface InterviewFeedback {
  feedback: string;
  score: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface RawQuizQuestion {
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  type?: string;
  difficulty?: string;
  topic?: string;
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  private model = 'gemini-2.0-flash';

  constructor() {
    if (!GOOGLE_GEMINI_API_KEY) {
      console.warn('API key não encontrada no arquivo .env');
    }
    this.apiKey = '';
  }

  getApiKey(): string {
    return this.apiKey;
  }

  setApiKey(key: string) {
    if (!key || key.trim() === '') {
      throw new Error('API key não pode estar vazia');
    }
    this.apiKey = key.trim();
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim() !== '');
  }

  async validateApiKey(key?: string): Promise<boolean> {
    const keyToValidate = key?.trim() || this.apiKey?.trim();
    if (!keyToValidate || keyToValidate === '') return false;

    try {
      // Primeiro, listar os modelos disponíveis
      const modelsResponse = await fetch(
        `${this.baseUrl}/models?key=${keyToValidate}`
      );

      if (!modelsResponse.ok) {
        const errorData = await modelsResponse.json();
        console.error('Erro ao listar modelos:', modelsResponse.status, modelsResponse.statusText);
        console.error('Detalhes do erro:', errorData);
        
        if (errorData.error?.status === 'PERMISSION_DENIED') {
          throw new Error('API key sem permissão. Verifique se a API do Gemini está ativada no console do Google Cloud.');
        }
        return false;
      }

      const modelsData = await modelsResponse.json();
      const availableModels = modelsData.models || [];
      
      // Encontrar o modelo correto
      const model = availableModels.find((m: any) => m.name.includes('gemini-2.0-flash'));
      if (!model) {
        console.error('Modelo gemini-2.0-flash não encontrado. Modelos disponíveis:', availableModels);
        throw new Error('Modelo gemini-2.0-flash não disponível. Por favor, verifique se você tem acesso ao modelo correto.');
      }

      this.model = model.name.split('/').pop();

      // Tentar fazer uma chamada simples para validar a key
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${keyToValidate}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: "Hello" }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1
            }
          })
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao validar API key:', response.status, response.statusText);
        console.error('Detalhes do erro:', errorData);

        if (errorData.error?.status === 'INVALID_ARGUMENT') {
          throw new Error('API key inválida. Por favor, verifique se a chave está correta.');
        }
        if (errorData.error?.status === 'PERMISSION_DENIED') {
          throw new Error('API key sem permissão. Verifique se a API do Gemini está ativada no console do Google Cloud.');
        }
        return false;
      }
      
      const data = await response.json();
      return data.candidates && data.candidates.length > 0;
    } catch (error) {
      console.error('Erro ao validar API key:', error);
      throw error;
    }
  }

  private async generateContent(prompt: string, retryCount = 0): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key não configurada. Configure a API key antes de usar o serviço.');
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
              candidateCount: 1,
              stopSequences: []
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE"
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta da API:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        
        if (errorData.error?.status === 'INVALID_ARGUMENT') {
          throw new Error('API key inválida. Por favor, verifique se a chave está correta.');
        }
        if (errorData.error?.status === 'PERMISSION_DENIED') {
          throw new Error('API key sem permissão. Verifique se a API do Gemini está ativada no console do Google Cloud.');
        }
        
        throw new Error(`Erro na API: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Resposta inválida da API:', data);
        throw new Error('Resposta inválida da API');
      }

      const text = data.candidates[0].content.parts[0].text.trim();
      return text;
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      
      if (retryCount < 2) {
        console.log(`Tentativa ${retryCount + 1} falhou, tentando novamente em ${(retryCount + 1) * 2} segundos...`);
        await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
        return this.generateContent(prompt, retryCount + 1);
      }
      
      throw error;
    }
  }

  private sanitizeJobInfo(jobInfo: string): string {
    // Remove URLs mantendo apenas o texto relevante
    const withoutUrls = jobInfo.replace(/https?:\/\/[^\s]+/g, '');
    
    // Remove caracteres especiais mantendo pontuação básica
    const sanitized = withoutUrls
      .replace(/[^\w\s.,;:()-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return sanitized;
  }

  private isLinkFormat(text: string): boolean {
    return text.toLowerCase().startsWith('http') || text.toLowerCase().startsWith('www.');
  }

  private async validateJobInfo(jobInfo: string): Promise<{
    isValid: boolean;
    error?: string;
  }> {
    const sanitized = this.sanitizeJobInfo(jobInfo);
    
    if (sanitized.length < 30) {
      return {
        isValid: false,
        error: 'O texto fornecido é muito curto. Por favor, forneça mais detalhes sobre a vaga.'
      };
    }

    return { isValid: true };
  }

  private async validateResponse(response: any, expectedFields: string[]): Promise<boolean> {
    if (!response || typeof response !== 'object') return false;
    return expectedFields.every(field => field in response);
  }

  private async extractTextFromUrl(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 10000,
        maxRedirects: 5
      });

      const html = response.data;
      
      // Remove tags HTML mantendo o texto
      let text = html
        .toString()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();

      // Se o texto for muito curto, pode ser um erro
      if (text.length < 100) {
        throw new Error('Conteúdo extraído muito curto ou inválido');
      }

      return text;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        
        if (statusCode === 403 || statusCode === 999) {
          throw new Error('Acesso bloqueado pelo site. Por favor, cole o texto da vaga diretamente.');
        }
        
        throw new Error(`Erro ao acessar a URL (${statusCode}): ${errorMessage}`);
      }
      
      throw new Error('Não foi possível extrair o texto da URL. Por favor, cole o texto da vaga diretamente.');
    }
  }

  private isUrl(text: string): boolean {
    try {
      new URL(text);
      return true;
    } catch {
      return text.toLowerCase().startsWith('www.') || 
             text.toLowerCase().startsWith('http');
    }
  }

  async extractRequirements(jobInfo: string): Promise<JobRequirements> {
    try {
      let jobText = jobInfo;

      if (this.isUrl(jobInfo)) {
        try {
          jobText = await this.extractTextFromUrl(jobInfo);
          console.log('Texto extraído com sucesso, tamanho:', jobText.length);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Erro ao extrair texto da URL:', error.message);
            throw error;
          }
          throw new Error('Erro desconhecido ao extrair texto da URL');
        }
      }

      if (!jobText || jobText.trim().length < 50) {
        throw new Error('O texto fornecido é muito curto. Por favor, forneça mais detalhes sobre a vaga.');
      }

      const sanitizedInfo = this.sanitizeJobInfo(jobText);
      const prompt = `
        Analise o texto a seguir e extraia os principais requisitos da vaga.
        Retorne um objeto JSON com os campos:
        {
          "description": "Um resumo curto da vaga (máximo 200 caracteres)",
          "requirements": ["Lista com 5-10 requisitos principais"],
          "jobType": "Tipo da vaga (ex: Full-time, Contract, etc)",
          "seniority": "Nível de senioridade requerido",
          "mainTechnologies": ["Lista das 3-5 tecnologias principais"]
        }

        IMPORTANTE:
        - Seja específico e direto
        - Foque nos requisitos técnicos e comportamentais
        - Identifique claramente o nível de experiência necessário
        - Liste as tecnologias mais importantes
        - Mantenha o formato JSON exato
        - Use apenas caracteres ASCII nas chaves do JSON
        - Não use acentos ou caracteres especiais nas chaves

        Texto da vaga:
        ${sanitizedInfo}
      `;

      try {
        const response = await this.retryWithStructuredPrompt<JobRequirementsResponse>(prompt);
        
        if (typeof response !== 'object' || response === null) {
          throw new Error('Resposta inválida da API: não é um objeto JSON');
        }

        const requiredFields = ['description', 'requirements', 'jobType', 'seniority', 'mainTechnologies'];
        const missingFields = requiredFields.filter(field => !(field in response));
        
        if (missingFields.length > 0) {
          throw new Error(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
        }

        const requirements: JobRequirements = {
          description: String(response.description || '').slice(0, 200),
          requirements: (Array.isArray(response.requirements) ? response.requirements : [])
            .map((req: any) => String(req).trim())
            .filter((req: string) => req.length > 0)
            .slice(0, 10),
          jobType: String(response.jobType || '').trim(),
          seniority: String(response.seniority || '').trim(),
          mainTechnologies: (Array.isArray(response.mainTechnologies) ? response.mainTechnologies : [])
            .map((tech: any) => String(tech).trim())
            .filter((tech: string) => tech.length > 0)
            .slice(0, 5)
        };

        if (requirements.requirements.length < 3) {
          throw new Error('Não foi possível extrair requisitos suficientes da descrição fornecida.');
        }

        if (requirements.mainTechnologies.length < 1) {
          throw new Error('Não foi possível identificar as tecnologias principais da vaga.');
        }

        return requirements;
      } catch (error) {
        console.error('Erro ao processar resposta da API:', error);
        throw new Error('Não foi possível processar as informações da vaga. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao extrair requisitos:', error);
      throw error;
    }
  }

  private async retryWithStructuredPrompt<T>(prompt: string, attempt: number = 1): Promise<T> {
    const maxAttempts = 3;
    const structuredPrompt = `
      ${prompt}
      
      IMPORTANTE:
      1. Responda APENAS com JSON válido
      2. Mantenha a estrutura exata solicitada
      3. NÃO inclua formatação markdown ou \`\`\`json
      4. NÃO inclua explicações ou texto adicional
      5. Use aspas duplas para strings
      6. Retorne uma resposta completa e bem formada
      7. Não corte ou trunce a resposta
    `;

    try {
      const response = await this.generateContent(structuredPrompt);
      
      // Remove formatação markdown e limpa a resposta
      let cleanedResponse = response
        .trim()
        .replace(/\`\`\`json/g, '') // Remove ```json
        .replace(/\`\`\`/g, '') // Remove ```
        .replace(/^[^[{]*/, '') // Remove qualquer texto antes de [ ou {
        .replace(/[^}\]]*$/, '') // Remove qualquer texto depois de } ou ]
        .trim();

      // Tenta completar arrays ou objetos JSON incompletos
      if (cleanedResponse.startsWith('[') && !cleanedResponse.endsWith(']')) {
        cleanedResponse += ']';
      } else if (cleanedResponse.startsWith('{') && !cleanedResponse.endsWith('}')) {
        cleanedResponse += '}';
      }

      // Verifica se há objetos JSON incompletos dentro de arrays
      cleanedResponse = cleanedResponse.replace(/,\s*(?=[\]}])/g, '');
      
      try {
        console.log('Tentando fazer parse do JSON:', cleanedResponse);
        const parsed = JSON.parse(cleanedResponse);

        // Validação adicional para arrays
        if (Array.isArray(parsed)) {
          // Remove itens incompletos ou inválidos
          const validItems = parsed.filter(item => 
            item && 
            typeof item === 'object' && 
            !Array.isArray(item) &&
            Object.keys(item).length > 0
          );

          return validItems as T;
        }

        return parsed as T;
      } catch (parseError) {
        console.error('Erro ao fazer parse do JSON:', parseError);
        console.error('Resposta original:', response);
        console.error('Resposta limpa:', cleanedResponse);
        
        if (attempt < maxAttempts) {
          console.log(`Tentativa ${attempt} falhou, tentando novamente...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          return this.retryWithStructuredPrompt<T>(prompt, attempt + 1);
        }
        
        throw new Error('Formato de resposta inválido');
      }
    } catch (error) {
      if (attempt < maxAttempts) {
        console.log(`Tentativa ${attempt} falhou, tentando novamente...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return this.retryWithStructuredPrompt<T>(prompt, attempt + 1);
      }
      throw error;
    }
  }

  async generateQuestions(requirements: JobRequirements): Promise<InterviewQuestion[]> {
    try {
      // Gerar perguntas técnicas primeiro
      const technicalPrompt = `
        Você é um especialista em entrevistas técnicas para iOS.
        Gere EXATAMENTE 6 perguntas técnicas para uma entrevista de ${requirements.seniority} iOS Developer.
        
        Formato JSON:
        {
          "questions": [
            {
              "question": "Pergunta técnica específica",
              "context": "Objetivo da pergunta",
              "type": "technical",
              "difficulty": "easy, medium ou hard",
              "expectedTopics": ["Tópicos esperados"]
            }
          ]
        }

        Requisitos:
        - EXATAMENTE 6 perguntas técnicas sobre: ${requirements.mainTechnologies.join(', ')}
        - Distribuição: 2 easy, 2 medium, 2 hard
        - Perguntas devem ser específicas e práticas
        - Foque em problemas reais e casos de uso
        - Inclua perguntas sobre arquitetura e boas práticas
        - Evite perguntas muito teóricas ou conceituais
        - Retorne apenas o JSON, sem formatação adicional

        Descrição da vaga:
        ${JSON.stringify(requirements, null, 2)}
      `;

      // Gerar perguntas comportamentais depois
      const behavioralPrompt = `
        Você é um especialista em entrevistas comportamentais.
        Gere EXATAMENTE 4 perguntas comportamentais para uma entrevista de ${requirements.seniority} iOS Developer.
        
        Formato JSON:
        {
          "questions": [
            {
              "question": "Pergunta comportamental específica",
              "context": "Objetivo da pergunta",
              "type": "behavioral",
              "difficulty": "easy, medium ou hard",
              "expectedTopics": ["Tópicos esperados"]
            }
          ]
        }

        Requisitos:
        - EXATAMENTE 4 perguntas comportamentais
        - Distribuição: 1 easy, 2 medium, 1 hard
        - Foque em situações reais de trabalho
        - Explore soft skills importantes para a vaga
        - Inclua cenários de trabalho em equipe
        - Aborde resolução de conflitos e comunicação
        - Retorne apenas o JSON, sem formatação adicional

        Descrição da vaga:
        ${JSON.stringify(requirements, null, 2)}
      `;

      let technicalQuestions: QuestionResponse[] = [];
      let behavioralQuestions: QuestionResponse[] = [];
      let retryCount = 0;
      const maxRetries = 3;

      // Função auxiliar para validar e processar respostas
      const processResponse = (response: string): QuestionResponse[] => {
        try {
          // Limpar a resposta de qualquer formatação
          const cleanedResponse = response
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

          console.log('Resposta limpa:', cleanedResponse);

          // Tentar fazer parse do JSON
          const parsed = JSON.parse(cleanedResponse);
          
          if (!parsed.questions || !Array.isArray(parsed.questions)) {
            throw new Error('Formato inválido: questions não é um array');
          }

          return parsed.questions;
        } catch (error) {
          console.error('Erro ao processar resposta:', error);
          throw error;
        }
      };

      // Gerar perguntas técnicas
      while (retryCount < maxRetries && !this.isValidTechnicalQuestions(technicalQuestions)) {
        try {
          const response = await this.generateContent(technicalPrompt);
          const processed = processResponse(response);
          
          if (this.isValidTechnicalQuestions(processed)) {
            technicalQuestions = processed;
            break;
          }
          
          retryCount++;
          console.log(`Tentativa ${retryCount} para perguntas técnicas falhou`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        } catch (error) {
          retryCount++;
          console.error(`Erro na tentativa ${retryCount} para perguntas técnicas:`, error);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }

      // Resetar contador para perguntas comportamentais
      retryCount = 0;

      // Gerar perguntas comportamentais
      while (retryCount < maxRetries && !this.isValidBehavioralQuestions(behavioralQuestions)) {
        try {
          const response = await this.generateContent(behavioralPrompt);
          const processed = processResponse(response);
          
          if (this.isValidBehavioralQuestions(processed)) {
            behavioralQuestions = processed;
            break;
          }
          
          retryCount++;
          console.log(`Tentativa ${retryCount} para perguntas comportamentais falhou`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        } catch (error) {
          retryCount++;
          console.error(`Erro na tentativa ${retryCount} para perguntas comportamentais:`, error);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }

      // Validação final
      if (!this.isValidTechnicalQuestions(technicalQuestions)) {
        throw new Error('Não foi possível gerar o conjunto correto de perguntas técnicas');
      }

      if (!this.isValidBehavioralQuestions(behavioralQuestions)) {
        throw new Error('Não foi possível gerar o conjunto correto de perguntas comportamentais');
      }

      // Combinar e processar todas as perguntas
      return [
        ...technicalQuestions.map(q => ({
          question: q.question.trim(),
          context: q.context.trim(),
          type: 'technical' as const,
          difficulty: q.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
          expectedTopics: (q.expectedTopics || []).map(t => t.trim())
        })),
        ...behavioralQuestions.map(q => ({
          question: q.question.trim(),
          context: q.context.trim(),
          type: 'behavioral' as const,
          difficulty: q.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
          expectedTopics: (q.expectedTopics || []).map(t => t.trim())
        }))
      ];
    } catch (error) {
      console.error('Erro ao gerar perguntas:', error);
      throw new Error('Não foi possível gerar as perguntas da entrevista. Por favor, tente novamente.');
    }
  }

  private isValidTechnicalQuestions(questions: QuestionResponse[]): boolean {
    if (!Array.isArray(questions) || questions.length !== 6) {
      return false;
    }

    const validDifficulties = ['easy', 'medium', 'hard'];
    const isValidQuestion = (q: QuestionResponse) => 
      q.question && 
      q.context && 
      q.type === 'technical' && 
      validDifficulties.includes(q.difficulty.toLowerCase()) &&
      Array.isArray(q.expectedTopics) &&
      q.expectedTopics.length > 0;

    if (!questions.every(isValidQuestion)) {
      return false;
    }

    const difficulties = questions.map(q => q.difficulty.toLowerCase());
    return (
      difficulties.filter(d => d === 'easy').length === 2 &&
      difficulties.filter(d => d === 'medium').length === 2 &&
      difficulties.filter(d => d === 'hard').length === 2
    );
  }

  private isValidBehavioralQuestions(questions: QuestionResponse[]): boolean {
    if (!Array.isArray(questions) || questions.length !== 4) {
      return false;
    }

    const validDifficulties = ['easy', 'medium', 'hard'];
    const isValidQuestion = (q: QuestionResponse) => 
      q.question && 
      q.context && 
      q.type === 'behavioral' && 
      validDifficulties.includes(q.difficulty.toLowerCase()) &&
      Array.isArray(q.expectedTopics) &&
      q.expectedTopics.length > 0;

    if (!questions.every(isValidQuestion)) {
      return false;
    }

    const difficulties = questions.map(q => q.difficulty.toLowerCase());
    return (
      difficulties.filter(d => d === 'easy').length === 1 &&
      difficulties.filter(d => d === 'medium').length === 2 &&
      difficulties.filter(d => d === 'hard').length === 1
    );
  }

  async analyzeFeedback(
    question: string,
    answer: string,
    requirements: JobRequirements
  ): Promise<InterviewFeedback> {
    const prompt = `
      Analise a resposta do candidato para a seguinte pergunta de entrevista.
      Retorne um objeto JSON com a seguinte estrutura:
      {
        "feedback": "Feedback detalhado sobre a resposta",
        "score": "Nota de 0 a 10",
        "suggestions": ["Lista de sugestões de melhoria"],
        "strengths": ["Pontos fortes identificados na resposta"],
        "weaknesses": ["Pontos fracos ou aspectos a melhorar"]
      }

      Pergunta: ${question}
      Resposta: ${answer}
      
      Contexto da vaga:
      ${JSON.stringify(requirements, null, 2)}
      
      IMPORTANTE:
      - Seja específico e construtivo no feedback
      - Justifique a nota atribuída
      - Forneça sugestões práticas de melhoria
      - Identifique claramente pontos fortes e fracos
    `;

    try {
      const response = await this.retryWithStructuredPrompt<FeedbackResponse>(prompt);

      const requiredFields = ['feedback', 'score', 'suggestions', 'strengths', 'weaknesses'];
      const isValid = await this.validateResponse(response, requiredFields);

      if (!isValid) {
        throw new Error('Resposta inválida da API');
      }

      return {
        feedback: response.feedback.trim(),
        score: Number(response.score),
        suggestions: response.suggestions.map((s: string) => s.trim()),
        strengths: response.strengths.map((s: string) => s.trim()),
        weaknesses: response.weaknesses.map((s: string) => s.trim())
      };
    } catch (error) {
      console.error('Erro ao analisar feedback:', error);
      throw new Error('Não foi possível analisar a resposta. Por favor, tente novamente.');
    }
  }

  async generateFinalAnalysis(
    interviewHistory: { 
      question: string;
      answer: string;
      feedback: InterviewFeedback;
    }[],
    requirements: JobRequirements
  ) {
    const prompt = `
      Analise o desempenho geral do candidato nesta entrevista.
      Retorne um objeto JSON com a seguinte estrutura:
      {
        "analysis": "Análise geral do desempenho",
        "finalScore": "Nota final de 0 a 10",
        "strengths": ["Lista dos principais pontos fortes demonstrados"],
        "weaknesses": ["Lista dos principais pontos a melhorar"],
        "improvements": ["Sugestões práticas para desenvolvimento"]
      }

      Histórico da entrevista:
      ${JSON.stringify(interviewHistory, null, 2)}

      Requisitos da vaga:
      ${JSON.stringify(requirements, null, 2)}

      IMPORTANTE:
      - Considere tanto aspectos técnicos quanto comportamentais
      - Avalie a adequação ao nível de senioridade: ${requirements.seniority}
      - Considere as tecnologias principais: ${requirements.mainTechnologies.join(', ')}
      - Forneça feedback construtivo e acionável
      - Mantenha um tom profissional e encorajador
    `;

    try {
      const response = await this.retryWithStructuredPrompt<{
        analysis: string;
        finalScore: number;
        strengths: string[];
        weaknesses: string[];
        improvements: string[];
      }>(prompt);

      const requiredFields = ['analysis', 'finalScore', 'strengths', 'weaknesses', 'improvements'];
      const isValid = await this.validateResponse(response, requiredFields);

      if (!isValid) {
        throw new Error('Resposta inválida da API');
      }

      return {
        analysis: response.analysis.trim(),
        finalScore: Number(response.finalScore),
        strengths: response.strengths.map((s: string) => s.trim()),
        weaknesses: response.weaknesses.map((s: string) => s.trim()),
        improvements: response.improvements.map((s: string) => s.trim())
      };
    } catch (error) {
      console.error('Erro ao gerar análise final:', error);
      throw new Error('Não foi possível gerar a análise final. Por favor, tente novamente.');
    }
  }

  private fixTruncatedJson(json: string): string {
    let result = json;
    
    // Remove markdown
    result = result.replace(/```json/g, '').replace(/```/g, '');
    
    // Remove tudo antes do primeiro {
    result = result.replace(/^[^{]*/, '');
    
    // Verifica se o JSON está completo
    try {
      JSON.parse(result);
      return result;
    } catch (e) {
      // Se não está completo, tenta consertar
      const openBraces = (result.match(/{/g) || []).length;
      const closeBraces = (result.match(/}/g) || []).length;
      const openBrackets = (result.match(/\[/g) || []).length;
      const closeBrackets = (result.match(/\]/g) || []).length;
      
      // Adiciona chaves/colchetes faltantes
      while (openBraces > closeBraces) {
        result += '}';
      }
      while (openBrackets > closeBrackets) {
        result += ']';
      }
      
      // Remove vírgulas extras antes de fechamentos
      result = result.replace(/,(\s*[}\]])/g, '$1');
      
      return result;
    }
  }

  async generateQuizQuestions(requirements: JobRequirements): Promise<QuizQuestion[]> {
    try {
      const prompt = `
        Você é um especialista em entrevistas técnicas para iOS.
        Gere EXATAMENTE 10 perguntas de múltipla escolha para uma entrevista de ${requirements.seniority} iOS Developer.
        
        REGRAS IMPORTANTES:
        1. Retorne APENAS o JSON abaixo, sem texto adicional
        2. Não quebre linhas dentro das strings
        3. Mantenha o JSON compacto e válido
        4. Não use markdown
        5. Use aspas duplas para strings
        6. Números não precisam de aspas
        7. TODAS as perguntas devem estar dentro do array questions
        8. O JSON deve estar completo e bem formado

        {
          "questions": [
            {
              "question": "Pergunta técnica específica sobre iOS",
              "options": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
              "correctAnswer": 0,
              "explanation": "Explicação técnica da resposta correta",
              "type": "technical",
              "difficulty": "easy",
              "topic": "UIKit"
            }
          ]
        }

        DISTRIBUIÇÃO OBRIGATÓRIA:
        - Total: EXATAMENTE 10 perguntas
        - Técnicas: 8 perguntas
        - Comportamentais: 2 perguntas
        - Dificuldade: 4 easy, 4 medium, 2 hard
        - Cada pergunta DEVE ter 4 opções de resposta
        - correctAnswer DEVE ser 0, 1, 2 ou 3

        TEMAS PRINCIPAIS:
        ${requirements.mainTechnologies.join(', ')}

        NÍVEL: ${requirements.seniority}
      `;

      const maxRetries = 3;
      let lastError: Error | null = null;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const response = await this.generateContent(prompt);
          const cleanedResponse = this.fixTruncatedJson(response);
          
          console.log('Resposta limpa:', cleanedResponse);

          try {
            const parsed = JSON.parse(cleanedResponse);

            if (!parsed.questions || !Array.isArray(parsed.questions)) {
              throw new Error('Formato inválido: questions não é um array');
            }

            // Validar e processar cada pergunta
            const questions = parsed.questions.map((q: RawQuizQuestion, index: number) => {
              if (!q || typeof q !== 'object') {
                throw new Error(`Pergunta ${index + 1} inválida`);
              }

              // Garantir valores padrão seguros
              const processedQuestion = {
                question: String(q.question || '').trim() || `Pergunta ${index + 1}`,
                options: Array.isArray(q.options) ? 
                  q.options.map((o: any) => String(o || '').trim()) : 
                  ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
                correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3 ? 
                  q.correctAnswer : 0,
                explanation: String(q.explanation || '').trim() || 'Explicação não fornecida',
                type: ['technical', 'behavioral'].includes(String(q.type || '').toLowerCase()) ?
                  (q.type?.toLowerCase() as 'technical' | 'behavioral') || 'technical' : 'technical',
                difficulty: ['easy', 'medium', 'hard'].includes(String(q.difficulty || '').toLowerCase()) ?
                  (q.difficulty?.toLowerCase() as 'easy' | 'medium' | 'hard') || 'medium' : 'medium',
                topic: String(q.topic || '').trim() || requirements.mainTechnologies[0]
              };

              // Garantir que temos exatamente 4 opções
              while (processedQuestion.options.length < 4) {
                processedQuestion.options.push(`Opção ${processedQuestion.options.length + 1}`);
              }
              processedQuestion.options = processedQuestion.options.slice(0, 4);

              return processedQuestion;
            });

            // Validar a distribuição
            if (questions.length === 10) {
              return questions;
            }

            throw new Error(`Número incorreto de perguntas: ${questions.length}`);
          } catch (parseError) {
            console.error('Erro ao fazer parse do JSON:', parseError);
            throw parseError;
          }
        } catch (error) {
          console.error(`Tentativa ${attempt + 1} falhou:`, error);
          lastError = error as Error;
          await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
        }
      }

      throw lastError || new Error('Não foi possível gerar perguntas válidas após várias tentativas');
    } catch (error) {
      console.error('Erro ao gerar perguntas do quiz:', error);
      throw new Error('Não foi possível gerar as perguntas do quiz. Por favor, tente novamente.');
    }
  }
}

export const geminiService = new GeminiService(); 