const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(provess.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', () => {
  console.log('Error: ', error.message);
});
