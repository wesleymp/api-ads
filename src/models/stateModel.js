const mongoose = require('./connection');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
});

(mongoose.connection && mongoose.connection.models['states']) ?
  module.exports = mongoose.connection.models['states'] :
  module.exports = mongoose.model('states', modelSchema);
