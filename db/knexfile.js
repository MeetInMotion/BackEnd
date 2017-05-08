module.exports = {
  "development":{
    "client": "pg",
    "connection": {
      "host": process.env.DATABASE_HOST, 
      "user": process.env.DATABASE_USER,
      "database": process.env.DATABASE_NAME,
      "password": process.env.DATABASE_PASSWORD,
      },
    "migrations":{
      "directory": "./db/migrations",
    },
  },
};

