module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['@stylistic/js'],
  extends: 'eslint:recommended',
  rules: {
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/quotes': ['error', 'single'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-unused-vars': 'off',
    'no-console': 0
  }
};
