// Lint do Alfie: base do Expo (React, hooks, imports) e Prettier cuidando do estilo.
// O Prettier vem por último para desligar regras de formatação que brigariam com ele.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    // '@env' é gerado pelo babel (react-native-dotenv) e não existe em disco.
    settings: { 'import/core-modules': ['@env'] },
    rules: {
      // Carregar dados do AsyncStorage ao montar chama setState depois de um await: é o
      // caso que esta regra existe para evitar em código síncrono, não neste.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    ignores: ['dist/*', 'web-build/*', '.expo/*', 'coverage/*', 'node_modules/*'],
  },
]);
