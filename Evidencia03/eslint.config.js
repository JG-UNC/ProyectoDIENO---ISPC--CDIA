import js from '@eslint/js'

import globals from 'globals'

import reactHooks from 'eslint-plugin-react-hooks'

import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  
  {
    files: ['**/*.{js,jsx}'],
    
    languageOptions: {
      ecmaVersion: 2020,
      
      globals: globals.browser,
      
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
    },
  },
]

// Este archivo configura las reglas de calidad de código con ESLint.
// Se conecta al editor VS Code para resaltar errores mientras programás.
