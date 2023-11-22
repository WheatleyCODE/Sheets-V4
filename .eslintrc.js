module.exports = {
  env: { browser: true, es2020: true, jest: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'prettier', 'i18next', 'react-hooks', 'wheatley-code'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    quotes: [2, 'single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'i18next/no-literal-string': 2,
    'no-prototype-builtins': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ESLint Plugin
    'wheatley-code/path-checker': ['error', { alias: '@' }],
    'wheatley-code/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
      },
    ],
    'wheatley-code/layer-imports': [
        'error',
        {
          alias: '@',
          ignoreImportPatterns: ['**/store-provider', '**/testing'],
        },
    ],
  },

  overrides: [
    {
      files: ['src/**/*.stories.tsx', 'src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/**/*.test.ts', '.vscode/*'],
      rules: {
        'i18next/no-literal-string': 'off',
      }
    }
  ],
};
