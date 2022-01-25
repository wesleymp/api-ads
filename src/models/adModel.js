const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = mongoose.Schema({
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

const modelName = 'adModel';

if (mongoose.connection && mongoose.connection.model[modelName]) {
  module.exports = mongoose.connection.model[modelName];
  return;
}

module.exports = mongoose.model(modelName, modelSchema);
