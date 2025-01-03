import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import eslintPluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPrettierConfig from 'eslint-config-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';

export default [
    ...tseslint.config(
        { ignores: ['build'] },
        {
            extends: [js.configs.recommended, ...tseslint.configs.recommended],
            files: ['**/*.{ts,tsx}'],
            languageOptions: {
                globals: {
                    ...globals.browser,
                },
            },
            plugins: {
                react,
                'react-compiler': reactCompiler,
                'react-hooks': reactHooks,
                'react-refresh': reactRefresh,
                eslintPluginReact,
            },
            rules: {
                ...reactHooks.configs.recommended.rules,
                'react-compiler/react-compiler': 'error',
                'react-hooks/rules-of-hooks': 'error',
                'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
                '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
                'react-hooks/exhaustive-deps': 'off',
                '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
                'no-async-promise-executor': 'warn',
            },
        },
        eslintPrettierConfig
    ),
];
