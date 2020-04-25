const express = require('express')
const router = express.Router();
const Collection = require('../../models/collection.model')
const Movie = require('../../models/movie.model')

const checkAccess = require('../checkAccess')

// create new collection
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
			.then(() => res.status(200).json({
				message: "Collection creaed successfuly",
				success: true,
				item: newCollection,
			}))
			.catch(err => {
				res.status(500).json({ message: "Error: Server error", success: false })
			})
	})
})

// Update collection
router.post('/update/:alias', (req, res) => {
	const { values } = req.body
	const { alias } = req.params

	Collection.findOneAndUpdate({ alias: alias }, {
		$set: {
			title: values.title,
			alias: values.alias,
			image: values.image,
		}
	}, (err) => {
		if (err) {
			return res.json({
				message: "Error: Server error",
				success: false
			})
		} else {
			return res.json({
				message: "Collection updated successfuly",
				success: true
			})
		}
	})
})


// Delete collection
router.delete('/delete/:id', (req, res) => {
	const { id } = req.params

	Collection.remove({ _id: id }, (err) => {
		if (err) {
			return res.json({
				message: "Error: Server error",
				success: false
			})
		} else {
			return res.json({
				message: "Collection deleted successfuly",
				success: true
			})
		}
	})
})

// get all collections lists
router.get('/get', (req, res) => {
	Collection.find((err, collections) => {
		if (err) {
			res.status(500).json({
				message: "Error: Server error",
				success: false,
			})
		}
		else res.json(collections)
	})
})



// get all collections in category by category name (Ex: movies)
router.get('/get/:category', (req, res) => {
	const { category } = req.params;

	Collection.find({ category: category }, (err, collections) => {
		if (err) {
			res.status(500).json({
				message: "Error: Server error",
				success: false,
			});
		} else {
			getItemsFromCollections(collections, 6)
				.then(response => {
					return res.json(response)
				})
				.catch(() => {
					return res.status(500).json({
						message: "Error: Server error",
						success: false,
					})
				})
		}

	})
})


// get all items in one collection by alias name (Ex: best-movies)
router.get('/:category/:alias', (req, res) => {
	const { alias } = req.params;

	Collection.find({ alias: alias }, (err, collections) => {
		if (err) {
			res.status(500).json({
				message: "Error: Server error",
				success: false,
			});
		} else {
			getItemsFromCollections(collections, 0)
				.then(response => {
					return res.json(response[0])
				})
				.catch(() => {
					return res.status(500).json({
						message: "Error: Server error",
						success: false,
					})
				})
		}

	})
})

// get all items from collection
async function getItemsFromCollections(collections, limit) {
	const findObject = (array) => {
		return Movie.find({
			'id': {
				$in: array,
			},
		}).limit(limit).exec();
	}

	const collection = collections.map(async collection => {
		const { _id, title, alias, image } = collection;
		const items = await findObject(collection.items);

		return {
			id: _id,
			title,
			alias,
			image,
			items,
		}
	});

	const collectionsList = await Promise.all(collection)

	return collectionsList;
}

// add item to existing collection
router.post('/add', (req, res) => {
	const { alias, itemId, itemData } = req.body
	const newItem = new Movie(itemData);

	Movie.find({ id: itemId }, (err, movie) => {

		if (movie.length === 0) {
			newItem.save()
				.then(movie => res.status(200).json({
					status: 'success',
					text: 'Movie added successfully',
					movie,
				}))
				.catch(err => res.status(500).json({
					status: 'error',
					text: err.message,
				}));

			addToCollection();
		} else {
			addToCollection();
		}

		function addToCollection() {
			Collection.findOneAndUpdate({
				alias: alias,
			}, {
				$push: {
					items: itemId,
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
					message: 'Item was added to collection',
					items: [...collection.items, itemId]
				});
			})
		}
	})
})

// remove item from collection
router.post('/remove', (req, res) => {
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
