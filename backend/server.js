const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const routes = express.Router();

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
    console.log(req.body)
    let movie = new Movie(req.body);

    movie.save()
        .then(m => {
            res.status(200).json({ 'movie': 'added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new movie failed');
        })
})

routes.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (!movie) res.status(404).send('data not found')
        else {
            movie.title = req.body.title;
            movie.img = req.body.img;
            movie.genre = req.body.genre;
            movie.liked = req.body.liked;

            movie.save()
                .then(movie => res.json('Movie updated'))
                .catch(err => res.status(400).send('Cant update'))
        }
    })
})

routes.route('/delete/:id').delete((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (!movie) res.status(404).send('data not found')
        else movie.remove()
            .then(movie => res.json('Movie deleted'))
            .catch(err => res.status(400).send(err))
    })
})

app.use('/movies', routes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

