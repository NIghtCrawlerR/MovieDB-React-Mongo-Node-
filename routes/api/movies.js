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

    // const apiKey = '623fca3e'

    // function checkAccess(req, res, next) {
    //     let groupsPermissions = {}
    //     process.env.USER_GROUPS.split('///').map(group => {
    //         groupsPermissions[group.split('//')[0]] = group.split('//')[1]
    //     })

    //     const { userId, action } = req.query

    //     User.find({ _id: userId }, (err, user) => {
    //         if (err) {
    //             res.status(500).json({ 'status': 'error', 'text': 'Error: Server error' })
    //         }
    //         if (!groupsPermissions) res.status(500).json({ 'status': 'error', 'text': 'Error: Data not found' })
    //         const userGroup = user[0].group
    //         const hasAccess = groupsPermissions[userGroup] && groupsPermissions[userGroup].includes(action)
    //         console.log('check access')
    //         if (hasAccess) next()
    //         else res.status(403).json({ 'status': 'error', 'text': 'Error: You have no permission.', 'accessError': true })
    //     })
    // }

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

    router.route('/bugreport').post((req, res) => {
        bot.sendBugReport(req.body)
        res.json({ 'status': 'success', 'text': 'Report was send successfully. Thank you!' })

    })

    return router
})()