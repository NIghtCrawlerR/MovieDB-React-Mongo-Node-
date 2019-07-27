module.exports = (function(){
    const express = require('express')
    const router = express.Router();
    const imdb = require('imdb-api');
    const Movie = require('../models/movie.model')
    
    router.route('/').get((req, res) => {
    
        Movie.find((err, movies) => {
            if (err) console.log(err)
            else res.json(movies)
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