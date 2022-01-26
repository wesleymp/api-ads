const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  slug: String,
});

(mongoose.connection && mongoose.connection.models['categorys']) ?
  module.exports = mongoose.connection.models['categorys'] :
  module.exports = mongoose.model('categorys', modelSchema);
