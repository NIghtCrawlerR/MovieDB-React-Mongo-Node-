import {
  getMoviesTv,
  getGames,
  getFullItem,
} from './catalog';

import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionsFromCategory,
  updateCollections,
  getGenres,
} from './collections';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
  getWishlist,
} from './wishlist';

import {
  login,
  register,
  logout,
  verifyUser,
  userGet,
} from './user';

export {
  getMoviesTv,
  getGames,
  getFullItem,
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionsFromCategory,
  updateCollections,
  getGenres,
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
  getWishlist,
  login,
  register,
  logout,
  verifyUser,
  userGet,
}