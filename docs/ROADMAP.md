# Roadmap

Primeiro o que estava quebrado, depois o que faz o Alfie parecer e se comportar como produto,
depois distribuição e, por último, o que deixa o treino mais rico. Cada item vira um ou mais
PRs e uma entrada no [CHANGELOG](../CHANGELOG.md).

Legenda: `[ ]` pendente · `[x]` feito

## Fase 1 — Consertar o que estava quebrado

- [x] **Modelo desligado**: o app exigia o `gemini-2.0-flash`, que saiu do ar em 1º de junho de 2026, e recusava qualquer chave. Agora escolhe entre os disponíveis e troca sozinho se o atual sair do ar.
- [x] **Perguntas de iOS para qualquer vaga**: os prompts tinham "iOS Developer" fixo.
- [x] **Respostas perdidas na entrevista**: só a última chegava ao resultado, e a nota contava as outras como zero.
- [x] **Histórico que nunca gravava**: a tela existia, mas nada salvava sessões, e não havia como chegar nela.
- [x] **Laço infinito ao "consertar" JSON cortado** e quiz marcando como certa uma opção errada quando o índice vinha inválido.
- [x] **Acentos removidos do texto da vaga** ("comunicação" virava "comunica o"; C# e C++ perdiam o símbolo).
- [x] **Chave na URL**, em texto puro no AsyncStorage, e validada com uma chamada à API a cada abertura.
- [x] **Apresentação repetida a cada abertura** e nenhum jeito de trocar a chave ou o nome.
- [x] **`node_modules` versionado** (28 mil arquivos) e dependências não usadas.

## Fase 2 — Cara de produto

- [x] Tema claro e escuro, componentes de interface únicos e layout centralizado na web
- [x] Configuração inicial em dois passos, com instrução para criar a chave
- [x] Ajustes: nome, chave, tamanho das sessões, tema, apagar dados
- [x] Home com progresso, últimas sessões, vaga de exemplo e rascunho salvo
- [x] Resultado com análise final, plano de estudo, revisão e praticar de novo
- [x] Confirmação ao sair no meio de uma sessão e ao apagar dados, também na web
- [x] Lint, formatação, testes, CI e release-please
- [ ] **Teste de ponta a ponta no CI**: Playwright contra o `expo export --platform web`, com o Gemini simulado
- [ ] **Teste de componente das telas** com Testing Library
- [ ] **Revisão de acessibilidade** com leitor de tela no Android e no iOS

## Fase 3 — Distribuição

- [ ] **Conferir no aparelho**: SecureStore, confirmação nativa e o bloqueio de voltar no meio da sessão só foram testados na web
- [ ] **`eas.json` e build de Android e iOS**, com o `projectId` do EAS real (o de hoje é um texto fixo)
- [ ] **Publicar a versão web** (GitHub Pages ou similar) com o export estático
- [ ] **Ícone e splash novos** no tema claro e escuro
- [ ] **Atualizar para o Expo SDK mais novo**
- [ ] **Limpar o `node_modules` do histórico do Git** (`git filter-repo`): hoje ele saiu da árvore, mas o clone ainda baixa os commits antigos

## Fase 4 — Treino mais rico

- [ ] Responder por voz, com transcrição
- [ ] Tempo por resposta, como numa entrevista real
- [ ] Gráfico de evolução por tema ao longo das sessões
- [ ] Exportar o resultado em PDF
- [ ] Entrevista em inglês, com o idioma escolhido nos Ajustes
- [ ] Vagas salvas, para treinar várias candidaturas em paralelo
