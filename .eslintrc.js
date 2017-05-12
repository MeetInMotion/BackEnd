var Config = require('./config/environment');

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

  "rules": Config.get('eslint:rules'),

  "env": {
    "node": true,
    "mocha": true
  }
}
