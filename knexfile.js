require('babel-register');
var config = require('./config').default;
var db_config = {
  "development": {
    "client": "pg",
    "connection": {
      "host": process.env.DATABASE_HOST,
      "user": process.env.DATABASE_USER,
      "database": process.env.DATABASE,
      "password": process.env.DATABASE_PASSWORD,
    },
    "migrations":{
      "directory": "./db/migrations",
    },
    "seeds": {
      "directory": "./db/seeds/development",
    },
  },
  "test":{
    "client": "pg",
    "connection": {
      "host": "localhost",
      "user": "postgres",
      "database": "meetinmotion_test_db",
      "password": config('database:test:password'),
    },
    "migrations":{
      "directory": "./db/migrations",
    },
    "seeds": {
      "directory": "./db/seeds/test",
    },
  },
};

module.exports = db_config;
