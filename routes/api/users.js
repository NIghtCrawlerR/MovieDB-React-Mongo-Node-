const express = require('express')
const router = express.Router();
const User = require('../../models/user.model')
const UserSession = require('../../models/user.session.model')
const bot = require('../../bot')

const prepareUser = ({ email, movies, games, tv, books, _id: id, group }) => ({
  email,
  movies,
  games,
  tv,
  books,
  id,
  isAdmin: group === 'admin',
})

router.post('/login', (req, res) => {
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

    const userSession = new UserSession();
    userSession.userId = user._id;

    userSession.save((err, doc) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        })
      }

      req.session.user = doc._id;

      return res.send({
        success: true,
        message: 'Valid sign in',
        token: doc._id,
        user: prepareUser(user),
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
      return res.status(500).json({
        success: false,
        message: err,
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
        return res.status(500).json({
          success: false,
          message: err,
        })
      }

      return res.status(200).json({
        success: true,
        message: 'User registered successfully!',
      })
    })
  })
})

router.get('/logout', (req, res) => {
  const { query: { token } } = req;

  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: {
      isDeleted: true
    }
  }, null, (err, session) => {
    if (err) {
      return res.status(400).json({
        message: err,
        success: false
      })
    }
    return res.status(200).json({
      message: 'Success',
      success: true,
    });
  })
})

router.get('/verify', (req, res) => {
  const { query: { token } } = req;

  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid session'
      });
    } else {
      return res.send({
        success: true,
        message: 'Good',
        id: sessions[0].userId,
      });
    }
  });
})

router.get('/current', (req, res) => {
  const { query: { userId } } = req;

  User.find({ _id: userId }, (err, user) => {
    if (err) {
      return res.send({
        succes: false,
        message: 'Error: Server error. ' + err
      })
    }

    return res.send({
      succes: true,
      message: 'Success',
      data: prepareUser(user[0]),
    })
  })
})

router.route('/access/get').get((req, res) => {
  const email = req.query.email;

  bot.sendMessage({
    text: `Get access request: user ${email} wants to get permission.`,
    email: email
  })
  res.json({ 'status': 'success', 'text': 'Request was send successfully' })
})

module.exports = router;