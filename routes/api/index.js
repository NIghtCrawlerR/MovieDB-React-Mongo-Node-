const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/movies', require('./movies'))
router.use('/wishlist', require('./wishlist'))
router.use('/collection', require('./collection'))

module.exports = router;