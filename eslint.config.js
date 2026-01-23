import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import astroPlugin from 'eslint-plugin-astro'

export default [
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".cache/",
      ".astro/",
      "**/*.min.js",
      "**/plugins/",
      "/.temp/",
      "src/html/docs/",
      "docs_html/",
      "src/html/public/"
    ]
  },
  ...tseslint.config(
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended
  ),
  {
    ...pluginUnicorn.configs['flat/recommended']
  },
  ...astroPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,astro}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'arrow-body-style': 'off',
      'capitalized-comments': 'off',
      'comma-dangle': ['error', 'never'],
      'indent': ['error', 2, { 'MemberExpression': 'off', 'SwitchCase': 1 }],
      'max-params': ['warn', 5],
      'multiline-ternary': ['error', 'always-multiline'],
      'new-cap': 'off',
      'no-console': 'off',
      'no-negated-condition': 'off',
      'object-curly-spacing': ['error', 'always'],
      'operator-linebreak': ['error', 'after'],
      'no-unused-vars': 'warn',
      'no-new': 'off',
      'semi': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-method-this-argument': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-unused-properties': 'off',
      'unicorn/prefer-array-flat': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'astro/no-set-html-directive': 'off'
    }
  },
  {
    files: ['src/config/**'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'unicorn/prefer-top-level-await': 'off'
    }
  }
] 