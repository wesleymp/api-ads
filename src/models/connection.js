const mongoose = require('mongoose');

const database = require('../config/database');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dbName: database.databaseUrl,
});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', () => {
  console.log('Error');
});

module.exports = mongoose;
