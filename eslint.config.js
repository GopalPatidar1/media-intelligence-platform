import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
  js.configs.recommended,

  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  {
    ignores: ['apps/nuxt-app/.nuxt', '.output', 'dist', 'node_modules'],
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,

      parserOptions: {
        parser: tseslint.parser, // TS inside <script>
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },

      globals: {
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        useFetch: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        navigateTo: 'readonly',
        useApi: 'readonly',
        onMounted: 'readonly',
        defineEventHandler: 'readonly',
        console: 'readonly',
        sendRedirect: 'readonly',
        getHeader: 'readonly',
        defineNuxtConfig: 'readonly',
        useRoute: 'readonly',
        localStorage: 'readonly',
        useRouter: 'readonly',
        setTimeout: 'readonly',
        clearTimeout:'readonly',

        File: 'readonly',
        FormData: 'readonly',
        Event: 'readonly',
        HTMLInputElement: 'readonly',
        alert: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  prettier,
];
