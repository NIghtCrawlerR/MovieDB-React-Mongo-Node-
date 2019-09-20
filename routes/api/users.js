const express = require('express')
const router = express.Router();
const User = require('../../models/user.model')
const UserSession = require('../../models/user.session.model')

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
                token: doc._id
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
                message: 'Good'
            });
        }
    });
})

module.exports = router;
// const mongoose = require('mongoose');
// const passport = require('passport');
// const router = require('express').Router();
// const auth = require('../auth');
// const Users = mongoose.model('Users');

// //POST new user route (optional, everyone has access)
// router.post('/', auth.optional, (req, res, next) => {
//     const { body: { user } } = req;

//     if (!user.email) {
//         return res.status(422).json({
//             errors: {
//                 email: 'is required',
//             },
//         });
//     }

//     if (!user.password) {
//         return res.status(422).json({
//             errors: {
//                 password: 'is required',
//             },
//         });
//     }

//     const finalUser = new Users(user);

//     finalUser.setPassword(user.password);
//     console.log('------finalUser-------')
//     console.log(finalUser)
//     console.log('------finalUser-------')
//     return finalUser.save()
//         .then((res) => {
//             console.log('------res-------')
//             console.log(res)
//             console.log('------res-------')
//             res.json({ user: finalUser.toAuthJSON() })
//         })
//         .catch(err => {
//             console.log('------err-------')
//             console.log(err)
//             console.log('------err-------')
//             res.json({ error: err })
//         })
// });

// //POST login route (optional, everyone has access)
// router.post('/login', auth.optional, (req, res, next) => {
//     const { body: { user } } = req;

//     if (!user.email) {
//         return res.status(422).json({
//             errors: {
//                 email: 'is required',
//             },
//         });
//     }

//     if (!user.password) {
//         return res.status(422).json({
//             errors: {
//                 password: 'is required',
//             },
//         });
//     }

//     return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//         console.log('------passportUser-------')
//         console.log(passportUser)
//         if (err) {
//             return next(err);
//         }

//         if (passportUser) {
//             const user = passportUser;
//             user.token = passportUser.generateJWT();

//             return res.json({ user: user.toAuthJSON() });
//         }

//         return status(400).info;
//         // if (err) { return next(err); }
//         // if (!user) { return res.redirect('/login'); }
//         // req.logIn(user, function (err) {
//         //     if (err) { return next(err); }
//         //     return res.redirect('/users/' + user.username);
//         //     // return res.json({ user: user.toAuthJSON() });
//         // });
//     })(req, res, next);
// });

// //GET current route (required, only authenticated users have access)
// router.get('/current', auth.required, (req, res, next) => {
//     const { payload: { id } } = req;

//     return Users.findById(id)
//         .then((user) => {
//             if (!user) {
//                 return res.sendStatus(400);
//             }

//             return res.json({ user: user.toAuthJSON() });
//         });
// });

// module.exports = router;