const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  state: String,
  token: String,
});

const modelName = 'userModel';

if (mongoose.connection && mongoose.connection.model[modelName]) {
  module.exports = mongoose.connection.model[modelName];
  return;
}

module.exports = mongoose.model(modelName, modelSchema);
