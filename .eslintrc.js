var Config = require('./config');

module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "extends": ["eslint:recommended"]
  "plugins": [
    "mocha",
  ],

  "rules": Config.get('eslint:rules'),

  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  }
}
