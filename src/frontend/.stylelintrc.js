/**
 * Stylelint configuration
 */
module.exports = {
  /**
   * @see https://stylelint.io/user-guide/configure/#extends
   */
  extends: [
    /**
     * @see https://github.com/stylelint/stylelint-config-standard
     */
    'stylelint-config-standard',

    /**
     * @see https://github.com/stylelint-scss/stylelint-config-standard-scss
     */
    'stylelint-config-standard-scss',

    /**
     * @see https://github.com/prettier/stylelint-config-prettier
     */
    'stylelint-config-prettier',
  ],

  /**
   * @see https://stylelint.io/user-guide/configure/#plugins
   */
  plugins: [
    /**
     * @see https://github.com/stylelint-scss/stylelint-scss
     */
    'stylelint-scss',

    /**
     * @see https://github.com/prettier/stylelint-prettier
     */
    'stylelint-prettier',
  ],

  /**
   * @see https://stylelint.io/user-guide/configure/#ignorefiles
   */
  ignoreFiles: ['**/*.js', '**/*.jsx'],

  /**
   * @see https://stylelint.io/user-guide/rules/list
   */
  rules: {
    'annotation-no-unknown': null, // bootstrap_variables.scss have too many issue,disable it here
    'alpha-value-notation': 'number', // https://stylelint.io/user-guide/rules/list/alpha-value-notation/
    'color-function-notation': 'legacy', // https://stylelint.io/user-guide/rules/list/color-function-notation/
    'no-empty-source': null, // https://stylelint.io/user-guide/rules/list/no-empty-source
    'shorthand-property-no-redundant-values': null, // https://stylelint.io/user-guide/rules/list/shorthand-property-no-redundant-values/
    'string-quotes': 'single', // https://stylelint.io/user-guide/rules/list/string-quotes/
    'scss/comment-no-empty': null, // https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/comment-no-empty
    'scss/double-slash-comment-empty-line-before': null, // https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/double-slash-comment-empty-line-before
    'prettier/prettier': [true, { severity: 'warning' }], // https://github.com/prettier/stylelint-prettier#installation
    'scss/operator-no-newline-after': null,
    'at-rule-empty-line-before': [
      // https://stylelint.io/user-guide/rules/list/at-rule-empty-line-before/
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'at-rule-no-unknown': [
      // https://stylelint.io/user-guide/rules/list/at-rule-no-unknown/
      true,
      {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
          'tailwind',
          'apply',
          'responsive',
          'variants',
          'screen',
        ],
      },
    ],
  },
};
