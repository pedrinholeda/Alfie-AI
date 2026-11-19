# Política de segurança

## Como relatar uma vulnerabilidade

**Não abra issue pública.** Use a aba **Security** do repositório e clique em
**Report a vulnerability**.

Inclua:

- a descrição do problema;
- os passos para reproduzir;
- as versões afetadas;
- um contorno ou mitigação, se você conhecer.

## O que acontece depois

1. Confirmamos o recebimento assim que possível.
2. Avaliamos e confirmamos o problema.
3. Mandamos atualizações sobre a correção.
4. Publicamos a correção ou o contorno.

Por favor, não divulgue a vulnerabilidade antes de a correção estar disponível.

## Escopo

O Alfie não tem servidor. O que mais importa aqui é a chave do Gemini do usuário: qualquer
caminho que a exponha (log, URL, armazenamento sem proteção no celular, envio para outro
endereço que não a API do Google) é uma vulnerabilidade.
