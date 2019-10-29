module.exports = (function () {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
        require('dotenv').config()
    }
    const express = require('express')
    const router = express.Router();
    const imdb = require('imdb-api');
    const Movie = require('../../models/movie.model')
    const User = require('../../models/user.model')
    const bot = require('../../bot')
    // const checkAccess = require('./checkAccess')

    const apiKey = '623fca3e'

    function checkAccess(req, res, next) {
        let groupsPermissions = {}
        process.env.USER_GROUPS.split('///').map(group => {
            groupsPermissions[group.split('//')[0]] = group.split('//')[1]
        })

        const { userId, action } = req.query

        User.find({ _id: userId }, (err, user) => {
            if (err) {
                res.status(500).json({ 'status': 'error', 'text': 'Error: Server error' })
            }
            if (!groupsPermissions) res.status(500).json({ 'status': 'error', 'text': 'Error: Data not found' })
            const userGroup = user[0].group
            const hasAccess = groupsPermissions[userGroup] && groupsPermissions[userGroup].includes(action)
            console.log('check access')
            if (hasAccess) next()
            else res.status(403).json({ 'status': 'error', 'text': 'Error: You have no permission.', 'accessError': true })
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

    router.route('/add').post(checkAccess, (req, res) => {
        let movie = new Movie(req.body);
        console.log(movie)
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
                .then(m => res.status(200).json({ 'status': 'success', 'text': 'Movie added successfully', 'movie': movie }))
                .catch(err => res.status(500).json({ 'status': 'error', 'text': err.message }))
        }
    })

    router.route('/update/:id').post(checkAccess, (req, res) => {
        Movie.findById(req.params.id, (err, movie) => {
            if (!movie) res.status(404).send('data not found')
            else {
                movie.title = req.body.title;
                movie.img = req.body.img;
                movie.genre = req.body.genre;
                movie.liked = req.body.liked;
                movie.watched = req.body.watched;

                movie.save()
                    .then(movie => res.json({ 'status': 'success', 'text': 'Movie updated successfully', 'movie': movie }))
                    .catch(err => res.status(500).json({ 'status': 'error', 'text': err.message }))
            }
        })
    })

    router.route('/delete/:id').delete(checkAccess, (req, res, next) => {
        Movie.findById(req.params.id, (err, movie) => {
            if (!movie) res.status(404).send('data not found')
            else movie.remove()
                .then(movie => res.json({ 'status': 'success', 'text': 'Movie deleted successfully' }))
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ 'status': 'error', 'text': err.message })
                })
        })
    })

    router.route('/bugreport').post((req, res) => {
        bot.sendBugReport(req.body)
        res.json({ 'status': 'success', 'text': 'Report was send successfully. Thank you!' })

    })

    return router
})()