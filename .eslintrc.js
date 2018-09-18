module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  rules: {
    semi: ["error", "never"]
  },
  plugins: [
    'import',
    'jest',
  ],
  env: {
    node: true,
    'jest/globals': true,
  },
};
