const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  state: String,
  token: String,
});

(mongoose.connection && mongoose.connection.models['users']) ?
  module.exports = mongoose.connection.models['users']:
  module.exports = mongoose.model('users', modelSchema);
