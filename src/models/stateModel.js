const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = mongoose.Schema({
  name: String,
});

const modelName = 'stateModel';

if (mongoose.connection && mongoose.connection.model[modelName]) {
  module.exports = mongoose.connection.model[modelName];
  return;
}

module.exports = mongoose.model(modelName, modelSchema);
