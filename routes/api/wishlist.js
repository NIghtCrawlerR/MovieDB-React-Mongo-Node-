const express = require('express')
const router = express.Router();
const User = require('../../models/user.model')
const Movie = require('../../models/movie.model')

router.post('/get', (req, res) => {
    const { items, itemType } = req.body;
    console.log(items, itemType)
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
                [itemType]: docs
            }
        })
    });
})

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
            User.findOneAndUpdate({
                _id: userId
            }, {
                $push: {
                    [collection]: item.id
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

router.post('/delete', (req, res) => {
    const { itemId, userId, collection } = req.body
    console.log(itemId, userId, collection)
    User.findOneAndUpdate({
        _id: userId
    }, {
        $pull: {
            [collection]: itemId
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
            message: 'Movie deleted from collection successfully'
        });
    })
})

module.exports = router;