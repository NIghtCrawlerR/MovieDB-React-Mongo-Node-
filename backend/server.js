const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const routes = express.Router();
const imdb = require('imdb-api');
const path = require('path')

const Movie = require('./movie.model')

const dbUrl = 'mongodb://NightCrawler:F9V6U0XxMmOZEVeA@ds155714.mlab.com:55714/movies'

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbUrl, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB successfully connected");
})


routes.route('/').get((req, res) => {

    Movie.find((err, movies) => {
        if (err) console.log(err)
        else res.json(movies)
    })
})

routes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
        res.json(movie)
    })
})

routes.route('/add').post((req, res) => {
    let movie = new Movie(req.body);
    if (!req.body.img) imdb.get({ name: req.body.title }, { apiKey: '623fca3e' }).then((data) => {
        movie.img = data.poster
        saveMovie();
    }).catch((err) => {
        res.status(200).json({ 'status': 'error', 'text': 'Cant find image. Please put custom link or provide english title' })
        console.log
    });
    else {
        saveMovie();
    }

    function saveMovie() {
        movie.save()
            .then(m => res.status(200).json({ 'status': 'success', 'text': 'Movie added successfully' }))
            .catch(err => res.status(400).send('Adding new movie failed'))
    }

})

routes.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (!movie) res.status(404).send('data not found')
        else {
            movie.title = req.body.title;
            movie.img = req.body.img;
            movie.genre = req.body.genre;
            movie.liked = req.body.liked;
            movie.watched = req.body.watched;

            movie.save()
                .then(movie => res.json({ 'status': 'success', 'text': 'Movie updated successfully' }))
                .catch(err => res.status(400).send('Cant update'))
        }
    })
})

routes.route('/delete/:id').delete((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (!movie) res.status(404).send('data not found')
        else movie.remove()
            .then(movie => res.json({ 'status': 'success', 'text': 'Movie deleted successfully' }))
            .catch(err => res.status(400).send(err))
    })
})

app.use('/movies', routes);



app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

