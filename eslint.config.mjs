import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: [
      '**/.next',
      '**/.cache',
      '**/package-lock.json',
      '**/public',
      '**/node_modules',
      '**/next-env.d.ts',
      '**/yarn.lock',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'next/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    plugins: {
      prettier,
      '@typescript-eslint': typescriptEslint,
      'react-compiler': reactCompiler,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'react/react-in-jsx-scope': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],
      'react-compiler/react-compiler': 'error',
    },
  },
];

export default config;
