const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  slug: String,
});

(mongoose.connection && mongoose.connection.models['categories']) ?
  module.exports = mongoose.connection.models['categories'] :
  module.exports = mongoose.model('categories', modelSchema);
