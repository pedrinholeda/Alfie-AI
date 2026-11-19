# Contribuindo com o Alfie

O Alfie é usado por quem está nervoso antes de uma entrevista: mensagens claras, nada de tela
quebrada e nenhum dado saindo do aparelho sem motivo importam tanto quanto o código.

## Reportar bug

Abra uma issue com o modelo **Bug**: o que você fez, o que esperava, o que aconteceu, a
versão (em Ajustes, no rodapé) e onde roda (Android, iOS ou navegador). Um print da tela ajuda
muito. **Nunca cole sua chave do Gemini** em issue, print ou log.

## Setup

Node.js 20 ou mais novo.

```bash
npm install
npm start          # Expo: QR code para o Expo Go, "w" abre na web
npm run web        # direto no navegador
```

Opcional: copie `.env.example` para `.env` e preencha `EXPO_PUBLIC_GEMINI_API_KEY` para não
colar a chave a cada instalação.

## Antes de abrir o PR

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
```

O CI roda isso em todo PR, mais o `npx expo install --check`. O CI não abre o app: mudança em
tela precisa ser conferida à mão, na web e, se mexer em algo nativo (cofre seguro, teclado,
voltar do Android), no Expo Go.

## Estilo

- Siga o código em volta. O Prettier decide a formatação.
- Comentário explica **por quê**, não o quê.
- Sem dependência nova sem motivo, e o motivo no PR. Use `npx expo install` para pacotes do
  Expo, para a versão casar com o SDK.
- Cor, espaçamento e tipografia vêm de `useTheme()`; nada de cor fixa em tela.
- Texto de prompt só em `src/prompts`. Número que alguém vai querer ajustar vai em `src/config`.
- Regra de negócio que dá para escrever sem React vai em `src/lib`, com teste.
- Todo texto de interface em português do Brasil, falando direto com a pessoa.

## Docs

Mudou comportamento ou config? Atualize no mesmo PR o README, o `docs/DESENVOLVIMENTO.md`, o
`AGENTS.md` (se a estrutura mudou) e marque o item no `docs/ROADMAP.md`. Mudança visual leva
print no tema claro e no escuro. O `CHANGELOG.md` é gerado pelo release-please; não edite à mão.

## Commits

Commits pequenos, uma ideia cada, em [Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português:

```
feat(quiz): mostra os temas errados no resultado
fix(ia): chave no cabeçalho em vez da URL
docs: README explica onde a chave fica guardada
```

| tipo                                    | quando                                           | entra no changelog |
| --------------------------------------- | ------------------------------------------------ | ------------------ |
| `feat`                                  | algo novo para quem usa                          | sim, sobe a minor  |
| `fix`                                   | correção de bug                                  | sim, sobe a patch  |
| `perf`                                  | mais rápido ou mais barato                       | sim                |
| `docs`                                  | só documentação                                  | sim                |
| `refactor`                              | muda o código, não o comportamento               | sim                |
| `test`, `chore`, `style`, `ci`, `build` | testes, manutenção, formatação, CI, dependências | não                |

Escopos usados: `ia`, `ui`, `home`, `entrevista`, `quiz`, `resultados`, `historico`, `ajustes`,
`vaga`. Quebra de compatibilidade leva `!` e um parágrafo `BREAKING CHANGE:`.

## Branches, merge e releases

- Uma branch por mudança: `feat/...`, `fix/...`, `docs/...`.
- PR para `main`; merge **só com o CI verde no último commit**.
- Merge com **merge commit** e corpo vazio (`gh pr merge N --merge --body ""`): cada commit
  convencional chega à `main` e o release-please não duplica itens.
- O release-please mantém um PR de release aberto; o merge dele cria a tag e a Release.

## Licença

Ao contribuir, você concorda que seu trabalho sai sob a [licença MIT](LICENSE.md).
