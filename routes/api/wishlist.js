const express = require('express')
const router = express.Router();
const User = require('../../models/user.model')
const Movie = require('../../models/movie.model')

// get items from user's wishlist
router.post('/get', (req, res) => {
    const { items, itemType } = req.body;

    Movie.find({
        'id': {
            $in: items,
        },
        'itemType': itemType

    }, function (err, docs) {
        return res.send({
            succes: true,
            message: 'Success',
            wishlist: {
                [itemType]: docs.reverse()
            }
        })
    });
})


// update user's wishlist
router.post('/update', (req, res) => {
    const { collection, action, itemId, userId, value } = req.body;

    User.findOneAndUpdate({
        _id: userId,
        [collection]: {$elemMatch: {
            id: itemId 
        }}
    }, {
        $set: {
            [`${collection}.$.${action}`]: value
        }
    }, null, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err,
            });
        }
        return res.send({
            success: true,
            message: 'Movie added to collection successfully'
        });
    })
})

// add item to user's wishlist
router.post('/add', (req, res) => {
    const { collection, item, userId } = req.body

    const newItem = new Movie(req.body.item);
    Movie.find({ id: item.id }, (err, movie) => {

        if (movie.length === 0) {
            newItem.save()
                .then(m => res.status(200).json({ 'status': 'success', 'text': 'Movie added successfully', 'movie': m }))
                .catch(err => res.status(500).json({ 'status': 'error', 'text': err.message }))

            addToWishlist()
        } else {
            addToWishlist()
        }

        function addToWishlist() {
            const wishlistItem = {
                id: item.id,
                liked: false,
                watched: false
            }
            User.findOneAndUpdate({
                _id: userId
            }, {
                $push: {
                    [collection]: wishlistItem
                }
            }, null, (err, user) => {
                if (err) {
                    console.log(err)
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
        }
    })
})

// delete item from user's wishlist
router.post('/delete', (req, res) => {
    const { itemId, userId, collection } = req.body

    User.findOneAndUpdate({
        _id: userId
    }, {
        $pull: {
            [collection]: { id: itemId }
        }
    }, null, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err,
            });
        }
        return res.send({
            success: true,
            message: 'Movie deleted from collection successfully'
        });
    })
})

module.exports = router;