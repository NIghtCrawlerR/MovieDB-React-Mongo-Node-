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

    // const apiKey = '623fca3e'

    router.get('/', (req, res) => {
        Movie.find((err, movies) => {
            if (err) console.log(err)
            else res.json(movies.reverse())
        })
    })

    router.post('/collection', (req, res) => {
        const { ids } = req.body;
        console.log(ids)
        Movie.find({
            'id': {
                $in: ids,
            },
        }, function (err, docs) {
            return res.send({
                succes: true,
                message: 'Success',
                collection: docs
            })
        });
    })

    router.route('/:id').get((req, res) => {
        let id = req.params.id;
        Movie.findById(id, (err, movie) => {
            res.json(movie)
        })
    })

    router.route('/bugreport').post((req, res) => {
        bot.sendBugReport(req.body)
        res.json({ 'status': 'success', 'text': 'Report was send successfully. Thank you!' })

    })

    return router
})()