var Config = require('./config/environment');

module.exports = {
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
      "password": Config.get('DATABASE:TEST:PASSWORD'),
    },
    "migrations":{
      "directory": "./db/migrations",
    },
    "seeds": {
      "directory": "./db/seeds/test",
    },
  },
}

