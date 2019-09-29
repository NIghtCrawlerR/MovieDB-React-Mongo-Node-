module.exports = (function () {
    const express = require('express')
    const session = require('express-session')
    const router = express.Router();
    const imdb = require('imdb-api');
    const Movie = require('../models/movie.model')
    const UserSession = require('../models/user.session.model')

    const apiKey = '623fca3e'

    function ensureAuth(req, res, next) {
        console.log('ensureAuth')
        next()
    }

    router.get('/', ensureAuth, (req, res) => {
        Movie.find((err, movies) => {
            if (err) console.log(err)
            else res.json(movies.reverse())
        })
    })

    router.route('/:id').get((req, res) => {
        let id = req.params.id;
        Movie.findById(id, (err, movie) => {
            res.json(movie)
        })
    })

    router.route('/add').post((req, res) => {
        let movie = new Movie(req.body);
        
        const title = req.body.title.toLowerCase()
        Movie.find({ title: title }, (err, movie) => {
            
            if (err) {
                return res.status(500).json({ 'status': 'error', 'text': 'Error: Server error' })
            } else if(movie.length > 0) {
                return res.status(200).json({ 'status': 'error', 'text': 'Error: Movie is already exists' })
            }

            if (!req.body.img) imdb.get({ name: title }, { apiKey: apiKey }).then((data) => {
                movie.img = data.poster
                saveMovie();
            }).catch((err) => {
                console.log(err)
                movie.img = 'https://uoslab.com/images/tovary/no_image.jpg'
                saveMovie();
            });
            else {
                saveMovie();
            }
        })

        function saveMovie() {
            movie.save()
                .then(m => res.status(200).json({ 'status': 'success', 'text': 'Movie added successfully' }))
                .catch(err => res.status(400).send('Adding new movie failed'))
        }

    })

    router.route('/update/:id').post((req, res) => {
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

    router.route('/delete/:id').delete((req, res) => {
        Movie.findById(req.params.id, (err, movie) => {
            if (!movie) res.status(404).send('data not found')
            else movie.remove()
                .then(movie => res.json({ 'status': 'success', 'text': 'Movie deleted successfully' }))
                .catch(err => res.status(400).send(err))
        })
    })

    return router
})()