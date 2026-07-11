import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/**', '.astro/**', 'public/pagefind/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,ts,mjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
];
