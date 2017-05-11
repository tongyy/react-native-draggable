const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
      parser: 'babel-eslint',

      plugins: [
              'react',
            ],

      parserOptions: {
              ecmaVersion: 6,
              sourceType: 'module',
              ecmaFeatures: {
                        jsx: true,
                      },
            },

      env: {
              browser: true,
              node: true,
              jasmine: true,
              es6: true,
            },

      globals: {
              jest: false,
            },

      rules: {
              'strict': OFF,
              'block-scoped-var': ERROR,
              'semi': [WARNING, 'always'],
              'space-before-blocks': [WARNING, 'always'],
              'space-in-parens': [OFF, 'never'],
              'comma-dangle': [ERROR, 'only-multiline'],
              'no-underscore-dangle': 0,
              'no-delete-var': ERROR,
              'react/jsx-uses-react': 1,
              'no-mixed-spaces-and-tabs':ERROR,
              'indent': ['error', 'tab']
            }
};
