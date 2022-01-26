require('dotenv').config();

const database = {
  databaseUrl: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'test') {
  database.databaseUrl = process.env.DB_NAME_TEST;
}

module.exports = database;
