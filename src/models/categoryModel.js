const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = mongoose.Schema({
  name: String,
  slug: String,
});

const modelName = 'categoryModel';

if (mongoose.connection && mongoose.connection.model[modelName]) {
  module.exports = mongoose.connection.model[modelName];
  return;
}

module.exports = mongoose.model(modelName, modelSchema);
