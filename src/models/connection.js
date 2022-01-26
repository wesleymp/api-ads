const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dbName: process.env.DB_NAME,
});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', () => {
  console.log('Error');
});

module.exports = mongoose;
