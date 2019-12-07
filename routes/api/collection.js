const express = require('express')
const router = express.Router();
const Collection = require('../../models/collection.model')
const Movie = require('../../models/movie.model')

const checkAccess = require('../checkAccess')

router.post('/create', checkAccess, (req, res) => {
    const { collection } = req.body
    const newCollection = new Collection(collection)

    Collection.find({ alias: collection.alias }, (err, collection) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        } else if (collection.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Collection already exist.'
            })
        }

        newCollection.save()
            .then(() => res.status(200).json({ message: "Collection creaed successfuly", success: true }))
            .catch(err => {
                res.status(500).json({ message: "Error: Server error", success: false })
            })
    })
})

router.get('/get', (req, res) => {
    Collection.find((err, collections) => {
        if (err) {
            res.status(500).json({ message: "Error: Server error", success: false })
        }
        else res.json(collections)
    })
})

router.get('/get/:category', (req, res) => {
    const { category } = req.params;
    Collection.find({ category: category }, (err, collections) => {
        if (err) {
            res.status(500).json({ message: "Error: Server error", success: false })
        }
        else res.json(collections)
    })
})

router.post('/add', (req, res) => {
    const { alias, itemId, itemData } = req.body

    const newItem = new Movie(itemData);
    Movie.find({ id: itemId }, (err, movie) => {

        if (movie.length === 0) {
            newItem.save()
                .then(m => res.status(200).json({ 'status': 'success', 'text': 'Movie added successfully', 'movie': m }))
                .catch(err => res.status(500).json({ 'status': 'error', 'text': err.message }))

            addToCollection()
        } else {
            addToCollection()
        }

        function addToCollection() {
            Collection.findOneAndUpdate({
                alias: alias
            }, {
                $push: {
                    items: itemId
                }
            }, null, (err, collection) => {
                if (err) {
                    console.log(err)
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Item was added to collection',
                    items: [...collection.items, itemId]
                });
            })
        }
    })
})

router.post('/delete', (req, res) => {
    const { alias, itemId } = req.body

    Collection.findOneAndUpdate({
        alias: alias
    }, {
        $pull: {
            items: itemId
        }
    }, null, (err, collection) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Item was removed from collection',
            items: collection.items.filter(item => item !== itemId)
        });
    })
})

module.exports = router;