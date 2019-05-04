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
        type: Boolean
    },
    watched: {
        type: Number
    }
})

module.exports = mongoose.model('Movie', Movie)