import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginVue from 'eslint-plugin-vue'
import typescriptParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
  // Default ignores - including all patterns from .eslintignore
  { 
    ignores: [
      // Project specific ignores
      'src/views/viewData/*',
      'config.ts',
      'stats.html',
      
      // Build outputs
      'dist/**',
      'dist-ssr/**',
      'coverage/**',
      '*.local',
      
      // Logs
      'logs/**',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      'lerna-debug.log*',
      
      // Dependencies
      'node_modules/**',
      '.yarn/**',
      '*.tsbuildinfo',
      '.lila/**',
      
      // System files
      '.DS_Store',
      
      // Editor directories and files
      '.vscode/**',
      '!.vscode/extensions.json',
      '.idea/**',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
      
      // Test files
      '/cypress/videos/',
      '/cypress/screenshots/',
    ] 
  },

  // Base eslint recommended config
  eslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // Common environment settings for all files
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals    : {
        // Browser globals
        console  : 'readonly',
        document : 'readonly',
        window   : 'readonly',
        navigator: 'readonly',
        
        // Timer functions
        setTimeout   : 'readonly',
        clearTimeout : 'readonly',
        setInterval  : 'readonly',
        clearInterval: 'readonly',
        
        // JS objects
        Promise: 'readonly',
        
        // DOM elements and types
        HTMLElement     : 'readonly',
        HTMLInputElement: 'readonly',
        Element         : 'readonly',
        Node            : 'readonly',
        NodeList        : 'readonly',
        Event           : 'readonly',
        MouseEvent      : 'readonly',
        KeyboardEvent   : 'readonly',
        CustomEvent     : 'readonly',
        DOMParser       : 'readonly',
        
        // Web APIs
        localStorage  : 'readonly',
        sessionStorage: 'readonly',
        fetch         : 'readonly',
        XMLHttpRequest: 'readonly'
      }
    }
  },

  // Vue plugin config
  {
    files          : ['**/*.vue'],
    languageOptions: {
      parser       : vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        parser     : typescriptParser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-len'                   : ['warn', {
        code                     : 250,
        template                 : 350,
        tabWidth                 : 2,
        ignoreComments           : true,
        ignoreUrls               : true,
        ignoreStrings            : true,
        ignoreTemplateLiterals   : true,
        ignoreRegExpLiterals     : true,
        ignoreHTMLAttributeValues: false,
        ignoreHTMLTextContents   : false,
      }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': {
          'max': 10
        },      
        'multiline': {
          'max': 1
        }
      }],
      'vue/require-default-prop': 'off',
    }
  },

  // TypeScript files
  {
    files  : ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser       : typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
      }
    },
  },

  // Common config for all files
  {
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      semi               : 'off',
      'brace-style'      : ['error', '1tbs', { allowSingleLine: true }],
      'multiline-ternary': ['error', 'always-multiline'],
      'no-param-reassign': ['error', { props: false }],
      'import/no-cycle'  : 'off',
      'max-len'          : [
        'warn',
        {
          code: 250, // Updated this from 240 to 250 for consistency
        },
      ],
      curly                        : [2, 'multi-line'],
      'prefer-destructuring'       : 'off',
      'no-multiple-empty-lines'    : [1, { max: 1 }],
      'no-multi-spaces'            : ['error', { ignoreEOLComments: false }],
      'arrow-spacing'              : ['error', { 'before': true, 'after': true }],
      'space-before-function-paren': ['error', {
        'anonymous' : 'always',
        'named'     : 'always',
        'asyncArrow': 'always'
      }],
      'newline-after-var'              : ['error', 'always'],
      'one-var'                        : ['error', 'never'],
      'comma-spacing'                  : ['error', { 'before': false, 'after': true }],
      'key-spacing'                    : ['error', { 'afterColon': true, mode: 'strict', 'align': 'colon' }],
      'indent'                         : ['error', 2],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev     : '*',
          next     : [
            'block',
            'block-like',
            'cjs-export',
            'class',
            'const',
            'export',
            'import',
            'let',
            'var',
          ],
        },
        {
          blankLine: 'always',
          prev     : [
            'block',
            'block-like',
            'cjs-export',
            'class',
            'const',
            'export',
            'import',
            'let',
            'var',
          ],
          next: '*',
        },
        {
          blankLine: 'never',
          prev     : ['const', 'let', 'var'],
          next     : ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          prev     : ['export', 'import'],
          next     : ['export', 'import'],
        },
      ],
      quotes            : ['error', 'single'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-const'    : 'error'
    },
  },
];
