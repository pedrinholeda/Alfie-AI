# AGENTS.md

Orientação para agentes de IA e contribuidores do **Alfie**: app Expo (Android, iOS e web) que
treina entrevistas de tecnologia com o Gemini, sob medida para a vaga colada pelo usuário.

## Layout

```
App.tsx              provedores e rotas por estado (apresentação → configuração → app)
src/
  screens/           uma tela por arquivo
  components/        ui.tsx (base), Toast, AlfieAvatar, SessionRow, PreparingCard
  hooks/             usePracticeStarter: vaga → perguntas → navegação
  services/          gemini.ts: só HTTP
  prompts/           todos os prompts
  lib/               regras puras, cada uma com teste em lib/__tests__
  state/             app.tsx (perfil, ajustes, chave) e history.tsx (sessões)
  storage/           AsyncStorage e SecureStore
  theme/             tokens de cor claro/escuro, useTheme, useStyles
  config/            ajustes sem ler código: modelos, tamanhos de sessão, vaga de exemplo
  types/             domain.ts (vaga, perguntas, sessões) e navigation.ts
docs/                DESENVOLVIMENTO.md, ROADMAP.md, images/
```

## Stack

- **Expo SDK 53** com React Native 0.79 e React 19. Pacote nativo novo entra com `npx expo install`, nunca `npm install` puro: o CI roda `expo install --check`.
- **TypeScript estrito**. Navegação tipada por `RootStackParamList` em `src/types/navigation.ts`.
- **React Navigation 7** (native stack). As rotas mudam conforme o estado em `useApp()`; não navegue para `Home` ou `Onboarding` à mão.
- **Gemini via fetch**, modo JSON. Sem SDK do Google.
- **Jest** com `jest-expo`; **ESLint** (`eslint-config-expo`) e **Prettier**.

## Convenções

- Cor, espaço e tipografia saem de `useTheme()`. Nada de hex em tela.
- Componentes de interface comuns ficam em `src/components/ui.tsx`; use antes de criar outro.
- Prompt só em `src/prompts/index.ts`, sem cargo nem tecnologia fixos: tudo vem da vaga.
- Toda resposta do modelo passa por uma função de `src/lib/normalize.ts` antes de chegar à tela.
- Erro que chega ao usuário é `AiError` ou passa por `errorMessage()`.
- Confirmação usa `confirm()` de `src/lib/confirm.ts` (o `Alert` com botões não funciona na web).
- Texto de interface em português do Brasil. Comentário explica por quê.

## Adicionando uma tela

1. Crie `src/screens/Nome.tsx` usando `Screen` e `AppHeader`.
2. Declare a rota e os parâmetros em `RootStackParamList` e registre em `App.tsx`.
3. Lógica que não depende de React vai para `src/lib`, com teste.
4. Atualize a tabela de módulos em `docs/DESENVOLVIMENTO.md` e o README se a pessoa usuária vê algo novo.
5. Rode `npm run lint`, `npm run typecheck`, `npm test` e confira a tela com `npm run web` nos dois temas.

## Comandos

```bash
npm install
npm start               # Expo Go / web
npm run web
npm test
npm run lint
npm run typecheck
npm run format          # ou format:check
npx expo export --platform web
```

## Faça / Não faça

| Faça                                               | Não faça                                            |
| -------------------------------------------------- | --------------------------------------------------- |
| Chave no cabeçalho `x-goog-api-key`                | Chave em URL, log, print ou commit                  |
| `npx expo install pacote`                          | `npm install` de pacote nativo                      |
| Ler o resultado do histórico pelo `sessionId`      | Passar a sessão inteira por parâmetro de rota       |
| Guardar estado atual em ref para gravar no storage | Confiar no valor de dentro do updater do `setState` |
| Teste em `src/lib/__tests__` para regra nova       | Lógica de negócio dentro da tela                    |

## Armadilhas

- Tela não troca depois de salvar a chave → as rotas dependem de `hasApiKey`; confira se `saveApiKey` terminou sem erro.
- `Alert.alert` com botões não faz nada na web → use `confirm()`.
- `npx expo install --check` falha no CI → alguma dependência fora da versão do SDK 53; rode `npx expo install --fix`.
- `app.json` e `.release-please-manifest.json` ficam fora do Prettier → o release-please reescreve os dois a cada versão com a formatação dele; mantenha o `app.json` legível à mão.
- O Google desliga modelos com frequência → não fixe nome de modelo no código; ajuste `preferredModels` em `src/config/ai.ts`.
- Com a janela do navegador do app escondida, prints falham → use Playwright headless.

## Workflow

- Commits em Conventional Commits, em português, uma ideia por commit.
- Uma branch e um PR por mudança; docs atualizadas no mesmo PR.
- Antes de dizer que terminou: lint, tipos, testes, e diga o que não foi verificado (aparelho real, Gemini real).
- Mudou a estrutura, um comando ou uma convenção? Atualize este arquivo.
