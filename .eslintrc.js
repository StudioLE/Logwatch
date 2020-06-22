module.exports = {
  'extends': [ 'eslint:recommended', 'plugin:node/recommended' ],
  'parserOptions': {
    // Only ESLint 6.2.0 and later support ES2020.
    'ecmaVersion': 2020
  },
  'rules': {
    'array-bracket-newline': [ 'warn', { 'minItems': 3 } ],
    'array-bracket-spacing': [ 'warn', 'always' ],
    'array-element-newline': [ 'warn', { 'minItems': 3 } ],
    'func-style': [ 'warn', 'expression' ],
    'indent': [
      'warn',
      2,
      {
        'ArrayExpression': 1,
        'ObjectExpression': 1,
        'MemberExpression': 0
      }
    ],
    'jsx-quotes': [ 'warn', 'prefer-double' ],
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-tabs': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'no-var': 'warn',
    'no-whitespace-before-property': 'warn',
    'object-curly-newline': [ 'warn', { 'consistent': true }
      // { 'minProperties': 2 }
    ],
    'object-curly-spacing': [ 'warn', 'always' ],
    'object-property-newline': 'warn',
    'object-shorthand': [ 'warn', 'properties' ],
    'semi': [ 'warn', 'never' ],
    'space-before-blocks': 'warn',
    'space-unary-ops': [ 'warn', {
      'words': true,
      'nonwords': false,
      'overrides': {
        '!': true
      }
    } ],
    'quotes': [ 'warn', 'single' ]
  }
}
