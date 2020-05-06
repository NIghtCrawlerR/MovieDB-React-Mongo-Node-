import {
  getMovies,
  getTV,
  getGames,
  getFullItem,
} from './catalog';

import {
  getCollections,
  createCollection,
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
  getUser,
} from './user';

import {
  toggleModal,
} from './settings';

export {
  getMovies,
  getTV,
  getGames,
  getFullItem,
  getCollections,
  createCollection,
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
  getUser,
  toggleModal,
};
