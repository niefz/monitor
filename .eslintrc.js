/**
 * Created by NieFZ on 2017/3/6.
 */
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  rules: {
    'eol-last': 0,
    'linebreak-style': 0,
    'import/extensions': ['off', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-undef': 0,
    'global-require': 0,
  }
};