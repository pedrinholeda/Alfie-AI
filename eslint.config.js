// Lint do Alfie: base do Expo (React, hooks, imports) e Prettier cuidando do estilo.
// O Prettier vem por último para desligar regras de formatação que brigariam com ele.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ['dist/*', 'web-build/*', '.expo/*', 'coverage/*', 'node_modules/*'],
  },
]);
