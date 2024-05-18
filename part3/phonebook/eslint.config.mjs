import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    rules: {
      'no-unused-vars': 0,
      indent: ['error', 2],
      quotes: ['error', 'single']
    }
  }
];
