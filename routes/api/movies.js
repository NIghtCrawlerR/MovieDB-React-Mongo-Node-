module.exports = (function () {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
        require('dotenv').config()
    }
    const express = require('express')
    const session = require('express-session')
    const router = express.Router();
    const imdb = require('imdb-api');
    const Movie = require('../../models/movie.model')
    const UserSession = require('../../models/user.session.model')
    const User = require('../../models/user.model')
    // const checkAccess = require('./checkAccess')

    const apiKey = '623fca3e'

    function checkAccess(req, res, next) {
        const groupsPermissions = JSON.parse(process.env.USER_GROUPS)
        const { userId, action } = req.query
        console.log(req.query)
        console.log(req.body)
        User.find({ _id: userId }, (err, user) => {
            if (err) {
                res.status(500).json({ 'status': 'error', 'text': 'Error: Server error' })
            }
            const userGroup = user[0].group
            const hasAccess = groupsPermissions[userGroup].includes(action)
            console.log('hasAccess', hasAccess)
            // return hasAccess
            if (hasAccess) next()
            else res.status(500).json({ 'status': 'error', 'text': 'Error: You have no permission' })
        })
    }

    router.get('/', (req, res) => {
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

    router.route('/check').post((req, res) => {
        const title = req.body.title
        console.log(title)
        imdb.get({ name: title }, { apiKey: apiKey }).then((data) => {
            return res.status(200).json({ 'status': 'success', 'image': data.poster })
        }).catch((err) => {
            return res.status(500).json({ 'status': 'error', 'text': err.message })
        });
    })

    router.post('/add', checkAccess, (req, res) => {
        let movie = new Movie(req.body);

        const title = req.body.title.toLowerCase()
        Movie.find({ title: title }, (err, movie) => {

            if (err) {
                return res.status(500).json({ 'status': 'error', 'text': 'Error: Server error' })
            } else if (movie.length > 0) {
                return res.status(200).json({ 'status': 'error', 'text': 'Error: Movie is already exists' })
            }

            saveMovie();
        })

        function saveMovie() {
            movie.save()
                .then(m => res.status(200).json({ 'status': 'success', 'text': 'Movie added successfully' }))
                .catch(err => res.status(400).send('Adding new movie failed'))
        }
    })

    router.post('/update/:id', checkAccess, (req, res) => {
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

    router.delete('/delete/:id', checkAccess, (req, res, next) => {

        // const hasAccess = checkAccess(req.query.userId, 'root')
        // console.log('hasAccess', hasAccess)
        Movie.findById(req.params.id, (err, movie) => {
            if (!movie) res.status(404).send('data not found')
            else movie.remove()
                .then(movie => res.json({ 'status': 'success', 'text': 'Movie deleted successfully' }))
                .catch(err => res.status(400).send(err))
        })


    })

    return router
})()