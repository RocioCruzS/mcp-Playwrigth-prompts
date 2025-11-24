import playwright from 'eslint-plugin-playwright';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      playwright,
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn'],
    },
  },
  {
    files: ['tests/**/*.spec.js'],
    rules: {
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-page-pause': 'warn',
    },
  },
];
