const path = require('path');
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', 'db', 'database.sqlite')
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE
      ? path.resolve(process.env.DB_STORAGE)
      : path.resolve(__dirname, '..', 'db', 'database.sqlite')
  }
};
