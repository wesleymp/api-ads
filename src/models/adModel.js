const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    images: [Object],
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String,
    dateCreated: Date,
    id_user: String,
    category: String,
    state: String,
});

(mongoose.connection && mongoose.connection.models['ads']) ?
  module.exports = mongoose.connection.models['ads'] :
  module.exports = mongoose.model('ads', modelSchema);
