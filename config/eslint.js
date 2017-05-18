module.exports = {
  "development": {
    "rules":{
      "semi": 2,
      "indent": ["error", 2],
      "comma-dangle": [2, "always-multiline"],
      "no-console": 0,
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
  "production": {
    "rules": {
      "semi": 2,
      "indent": ["error", 2],
      "comma-dangle": [2, "always-multiline"],
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
  "test": {},
};
