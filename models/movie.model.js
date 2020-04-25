const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movie = new Schema({
    id: Number,
    title: String,
    poster: String,
    genre_ids: Array,
    genres: Array,
    vote_average: String,
    rating: String,
    slug: String,
    itemType: String
})

module.exports = mongoose.model('Movie', Movie)