const express = require('express')
const router = express.Router();
const User = require('../../models/user.model')
const Movie = require('../../models/movie.model')
const UserSession = require('../../models/user.session.model')
const mongoose = require('mongoose')

router.post('/movies/add', (req, res) => {
    console.log(req.body.movies)
    User.findOneAndUpdate({
        _id: req.body.userId
    }, {
            $set: {
                movies: req.body.movies
            }
        }, null, (err, user) => {
            // console.log(user)
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Movie added to collection successfully'
            });
        })
})

router.post('/movies/get', (req, res) => {
    const userId = req.body.userId
    User.find({ _id: userId }, (err, user) => {
        console.log(user)
        if (err) {
            return res.send({
                succes: false,
                message: 'Error: Server error. ' + err
            })
        }
        if (req.body.getIds) {
            return res.send({
                succes: true,
                message: 'Success',
                movies: user[0].movies
            })
        } else {
            let arr = user[0].movies.map(movie => mongoose.Types.ObjectId(movie))
            Movie.find({
                '_id': {
                    $in: arr
                }
            }, function (err, docs) {
                return res.send({
                    succes: true,
                    message: 'Success',
                    movies: docs
                })
            });
        }
    })
    console.log(req.body)
})

router.post('/login', (req, res) => {
    console.log('-----LOGIN----')
    let { email, password } = req.body

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: No email provided'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: No password provided'
        })
    }

    email = email.toLowerCase().trim();

    User.find({ email: email }, (err, users) => {
        if (err) {
            console.log('error: ', err)
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'User does not exist'
            })
        }

        const user = users[0]
        console.log('-----user-----')
        console.log(user)
        if (!user.validatePassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid password'
            })
        }

        const userSession = new UserSession()
        userSession.userId = user._id
        userSession.save((err, doc) => {
            if (err) {
                console.log('error: ', err)
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }

            req.session.user = doc._id
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id,
                userId: user._id,
                movies: user.movies
            })
        })

    })
})

router.post('/register', (req, res) => {
    let { email, password } = req.body

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: No email provided'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: No password provided'
        })
    }

    email = email.toLowerCase().trim();

    User.find({ email: email }, (err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        } else if (user.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            })
        }

        const newUser = new User()

        newUser.email = email;
        newUser.password = newUser.generateHash(password)

        newUser.save((err, next) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }

            return res.send({
                success: true,
                message: 'Signed in'
            })
        })
    })
})

router.get('/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
            $set: {
                isDeleted: true
            }
        }, null, (err, session) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Good'
            });
        })
})

router.get('/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        } else {
            // DO ACTION
            return res.send({
                success: true,
                message: 'Good',
                userData: sessions[0]
            });
        }
    });
})

module.exports = router;