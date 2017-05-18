require('babel-register');
var config = require('./config').default;

module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "extends": ["eslint:recommended"],
  "plugins": [
    "mocha",
  ],

  "rules": config('eslint:rules'),

  "env": {
    "node": true,
    "mocha": true
  }
}
