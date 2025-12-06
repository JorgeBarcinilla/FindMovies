// @ts-check
import eslint from '@eslint/js';
import ngrx from '@ngrx/eslint-plugin/v9';
import rxjs from '@smarttools/eslint-plugin-rxjs';
import stylistic from '@stylistic/eslint-plugin';
import { configs, templateParser, templatePlugin } from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    ignores: ['.angular/**', 'dist/**', 'node_modules/**', 'out/**', 'coverage/**'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname
          }
        }
      },
      ...tseslint.configs.stylistic,
      prettier,
      jsdoc.configs['flat/recommended'],
      perfectionist.configs['recommended-natural'],
      rxjs.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      ...configs.tsRecommended,
      ...ngrx.configs.all
    ],
    plugins: {
      rxjs,
      jsdoc,
      '@stylistic': stylistic
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'prefer-arrow-callback': 'warn',

      'jsdoc/require-description': 'warn',
      'jsdoc/require-hyphen-before-param-description': 'warn',
      'jsdoc/require-throws': 'warn',
      'jsdoc/check-syntax': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/no-undefined-types': ['warn', { definedTypes: ['T', 'K', 'T.K'] }],
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: [
            'FunctionDeclaration',
            'FunctionExpression',
            'ClassDeclaration',
            "MethodDefinition[kind='method']:not([key.name=/^ng(?:OnInit|OnDestroy|OnChanges|AfterViewInit|AfterViewChecked|AfterContentInit|AfterContentChecked|AfterRender|AfterNextRender)$/])"
          ],
          checkConstructors: false
        }
      ],

      'rxjs/throw-error': 'error',
      'rxjs/no-unsafe-catch': ['error', { observable: '[Aa]ction(s|s\\$|\\$)$' }],
      'rxjs/no-implicit-any-catch': 'off',
      'rxjs/finnish': [
        'error',
        {
          functions: true,
          methods: true,
          names: {
            '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate|store)$': false
          },
          parameters: true,
          properties: true,
          strict: false,
          types: { '^EventEmitter$': false },
          variables: true
        }
      ],

      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'classProperty',
          filter: { regex: '^store$', match: true },
          format: null,
          leadingUnderscore: 'allow'
        },
        {
          selector: ['property'],
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require'
        }
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],

      'no-unused-vars': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'import/no-unresolved': [0, { ignore: ['src/.*$'] }],

      'perfectionist/sort-classes': [
        'error',
        {
          type: 'natural',
          newlinesBetween: 1,
          groups: [
            'index-signature',
            'static-property',
            'static-block',

            'injections',

            ['protected-property', 'protected-accessor-property'],
            ['private-property', 'private-accessor-property'],
            ['property', 'accessor-property'],

            'computed',

            'constructor',
            'lifecycle',
            'effects',
            'static-method',
            ['get-method', 'set-method'],
            ['protected-method', 'protected-function-property'],
            ['private-method', 'private-function-property'],
            ['method', 'function-property'],

            'unknown'
          ],
          customGroups: [
            {
              groupName: 'computed',
              selector: 'property',
              elementValuePattern: { pattern: '^\\s*computed\\s*\\(', flags: '' }
            },
            {
              groupName: 'injections',
              selector: 'property',
              elementValuePattern: { pattern: '^\\s*inject\\s*\\(', flags: '' }
            },
            {
              groupName: 'effects',
              selector: 'property',
              elementValuePattern: { pattern: '^\\s*createEffect\\s*\\(', flags: '' }
            },
            {
                groupName: 'function-property',
                selector: 'property',
                elementValuePattern: {
                    pattern: '^(?:async\\s*)?\\([^)]*\\)\\s*=>',
                    flags: ''
                }
            },
            {
              groupName: 'lifecycle',
              selector: 'method',
              elementNamePattern: {
                pattern: '^ng(?:OnChanges|OnInit|DoCheck|AfterContentInit|AfterContentChecked|AfterViewInit|AfterViewChecked|OnDestroy)$',
                flags: ''
              }
            },
            {
              groupName: 'lifecycle',
              selector: 'property',
              elementNamePattern: {
                pattern: '^ng(?:OnChanges|OnInit|DoCheck|AfterContentInit|AfterContentChecked|AfterViewInit|AfterViewChecked|OnDestroy)$',
                flags: ''
              }
            }
          ]
        }
      ]
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
      },
      jsdoc: { mode: 'typescript' }
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.html'],
    ignores: ['.angular/**', 'dist/**', 'node_modules/**', 'out/**', 'coverage/**'],
    languageOptions: {
      parser: templateParser
    },
    plugins: {
      '@angular-eslint/template': templatePlugin
    },
    extends: [
      prettier
    ],
    rules: {
      "@angular-eslint/template/alt-text": "error",
      "@angular-eslint/template/elements-content": "error",
      "@angular-eslint/template/interactive-supports-focus": "error",
      "@angular-eslint/template/label-has-associated-control": "error",
      "@angular-eslint/template/mouse-events-have-key-events": "error",
      "@angular-eslint/template/no-autofocus": "error",
      "@angular-eslint/template/no-distracting-elements": "error",
      "@angular-eslint/template/role-has-required-aria": "error",
      "@angular-eslint/template/table-scope": "error",
      "@angular-eslint/template/valid-aria": "error",

      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/eqeqeq": "error",
      "@angular-eslint/template/no-negated-async": "error",
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-call-expression': [
        'error',
        {
          allowList: ['prepareRoute']
        }
      ],
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/conditional-complexity': [
        'error',
        {
          maxComplexity: 10
        }
      ]
    }
  }
);
