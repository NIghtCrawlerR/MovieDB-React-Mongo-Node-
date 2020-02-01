const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Collection = new Schema({
    title: String,
    alias: String,
    category: String,
    items: {
        type: Array,
        default: [],
    },
    image: {
        type: String,
        default: "",
    }
})

module.exports = mongoose.model('Collection', Collection)