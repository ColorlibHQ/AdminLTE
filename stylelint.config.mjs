import { defineStylistic } from '@stylistic/stylelint-config'

// The base rules below are carried over from stylelint-config-twbs-bootstrap
// 16.1.0 (MIT, The Bootstrap Authors). That preset pins Stylelint 16-era
// configs and blocks Stylelint 18, so it is inlined here on top of the same
// upstream configs it extended. AdminLTE's own rules follow in the SCSS
// override.

// Bootstrap's stylistic settings. @stylistic 6 reads SCSS with its own
// `@stylistic/scss/*` copies of each rule, so these are named for both.
const stylistic = {
  'at-rule-name-space-after': 'always',
  'at-rule-semicolon-space-before': 'never',
  'block-closing-brace-empty-line-before': null,
  'block-closing-brace-newline-after': null,
  'block-opening-brace-space-before': null,
  'declaration-block-semicolon-newline-before': 'never-multi-line',
  'max-empty-lines': 2,
  'max-line-length': null,
  'number-leading-zero': 'never',
  'selector-list-comma-newline-before': 'never-multi-line',
  'selector-list-comma-space-after': 'always-single-line',
  'selector-list-comma-space-before': 'never-single-line',
  'unicode-bom': 'never',
  'value-list-comma-newline-after': 'never-multi-line',
  'value-list-comma-newline-before': 'never-multi-line',
  'value-list-comma-space-after': 'always-single-line'
}

/**
 * @type {import('stylelint').Config}
 */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config'
  ],
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  rules: {
    'alpha-value-notation': null,
    'at-rule-empty-line-before': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'color-named': 'never',
    'custom-property-empty-line-before': null,
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-empty-line-before': null,
    'declaration-no-important': true,
    'font-weight-notation': ['numeric', { ignore: ['relative'] }],
    'function-url-no-scheme-relative': true,
    'media-feature-range-notation': null,
    'media-query-no-invalid': null,
    'no-descending-specificity': null,
    'number-max-precision': null,
    'rule-empty-line-before': null,
    'selector-max-attribute': 2,
    'selector-max-class': 4,
    'selector-max-combinators': 4,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 0,
    'selector-max-specificity': null,
    'selector-max-type': 2,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'selector-not-notation': null,
    ...defineStylistic({ rules: stylistic })
  },
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
      rules: {
        ...defineStylistic({ syntax: 'scss', rules: stylistic }),
        // Bootstrap's SCSS rules
        'no-invalid-position-at-import-rule': null,
        'scss/at-extend-no-missing-placeholder': null,
        'scss/at-function-named-arguments': 'never',
        'scss/at-if-closing-brace-newline-after': null,
        'scss/at-if-closing-brace-space-after': null,
        'scss/at-if-no-null': null,
        'scss/at-mixin-argumentless-call-parentheses': 'always',
        'scss/at-mixin-pattern': null,
        'scss/at-rule-conditional-no-parentheses': null,
        'scss/comment-no-empty': null,
        'scss/dimension-no-non-numeric-values': true,
        'scss/dollar-variable-colon-space-after': 'at-least-one-space',
        'scss/dollar-variable-empty-line-before': null,
        'scss/double-slash-comment-empty-line-before': null,
        'scss/double-slash-comment-whitespace-inside': null,
        'scss/function-quote-no-quoted-strings-inside': null,
        'scss/media-feature-value-dollar-variable': null,
        'scss/no-global-function-names': null,
        'scss/selector-no-redundant-nesting-selector': true,
        // AdminLTE's rules
        'declaration-no-important': null,
        'declaration-property-value-disallowed-list': {
          border: 'none',
          outline: 'none'
        },
        'function-disallowed-list': ['calc', 'lighten', 'darken'],
        'keyframes-name-pattern': null,
        'property-disallowed-list': [
          'border-radius',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-right-radius',
          'border-bottom-left-radius',
          'transition'
        ],
        'scss/dollar-variable-default': [true, { ignore: 'local' }],
        'scss/selector-no-union-class-name': true,
        'selector-max-class': null,
        'selector-max-combinators': null,
        'selector-max-compound-selectors': null,
        'selector-max-id': null,
        'selector-max-specificity': null,
        'selector-max-type': null,
        'selector-no-qualifying-type': null
      }
    },
    {
      // Third-party compatibility themes target class names we don't own
      // (Select2 uses BEM, not kebab-case).
      files: ['src/scss/compat/*.scss'],
      rules: {
        'selector-class-pattern': null
      }
    }
  ]
}
