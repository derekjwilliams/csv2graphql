module.exports = {
  parser: "babel-eslint",
  rules: {
    semi: ["error", "never"],
    "graphql/template-strings": ['error', {
      env: 'literal',
      // tagName: 'FirstGQL',
      schemaJson: require('./schema.json'),
      validators: 'all',
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'literal'
      //env: 'literal'
      // no need to specify schema here, it will be automatically determined using .graphqlconfig
    }]
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],

  plugins: [
    'import',
    'jest',
    'graphql'
  ],
  env: {
    node: true,
    'jest/globals': true,
  },
};
