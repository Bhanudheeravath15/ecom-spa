const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String
});

module.exports = mongoose.model('Item', itemSchema);
