const development = {
    "username": null,
    "password": null,
    "database": "koa_api",
    "host": "127.0.0.1",
    "dialect": "postgres"
  };

const test = {
  "username": null,
  "password": null,
  "database": "koa_api_test",
  "host": "127.0.0.1",
  "dialect": "postgres"
  };
const production = {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  };

  const dbConfig = {
    development,
    test,
    production
  }
  module.exports = dbConfig;