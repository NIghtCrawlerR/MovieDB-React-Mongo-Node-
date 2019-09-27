const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movie = new Schema({
    title: {
        type: String
    },
    img: {
        type: String
    },
    genre: {
        type: String
    },
    liked: {
        type: Boolean,
        default: false
    },
    watched: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Movie', Movie)