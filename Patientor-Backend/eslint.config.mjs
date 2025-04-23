import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      '@/semi': ['error'],
      '@/explicit-function-return-type': 'off',
      '@/explicit-module-boundary-types': 'off',
      '@/restrict-template-expressions': 'off',
      '@/restrict-plus-operands': 'off',
      '@/no-unsafe-member-access': 'off',
      '@/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-case-declarations': 'off'
    },
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  }
]
