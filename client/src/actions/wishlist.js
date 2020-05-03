import axios from 'axios'

import {
  GET_WISHLIST,
  UPDATE_WISHLIST,
  TOGGLE_MODAL,
} from './types'

import {
  FETCH_WISHLIST_URL,
  ADD_TO_WISHLIST_URL,
  DELETE_FROM_WISHLIST_URL,
  UPDATE_WISHLIST_URL,
} from '../config/constants';

import store from '../store';

export const addItemToWishlist = (collection, item, userId) => (dispatch) => {
  const { user } = store.getState();

  if (!user.isLogin) {
    alert('Login to add movie to your collection.');
    return false;
  }

  axios.post(
    ADD_TO_WISHLIST_URL,
    { collection: collection, userId: userId, item: item },
  )
    .then(() => {
      dispatch({
        type: UPDATE_WISHLIST,
        collection,
        item,
        do: 'add'
      });
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      })
    })
};

export const deleteItemFromWishlist = (collection, itemId, userId) => (dispatch) => new Promise(() => {
  if (!window.confirm('Delete item from wishlist?')) return false;

  axios.post(DELETE_FROM_WISHLIST_URL,
    { collection: collection, itemId: itemId, userId: userId })
    .then(() => {
      const item = { id: itemId };

      dispatch({
        type: UPDATE_WISHLIST,
        collection,
        item,
        do: 'delete'
      });
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      })
    })
});

/**
 * 
 * Function is used to mark item as watched or liked.
 * It change wishlist item properties to true or false
 */
export const updateWishlist = (collection, action, itemId, userId, value) => dispatch => {
  axios.post(UPDATE_WISHLIST_URL, {
    collection, action, itemId, userId, value
  })
    .then(() => {
      dispatch({
        type: UPDATE_WISHLIST,
        collection,
        do: action,
        id: itemId,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      })
    });
};

//get wishlist items by id arr
export const getWishlist = (itemType, items) => (dispatch) => {
  return new Promise((resolve) => {
    axios.post(FETCH_WISHLIST_URL,
      { items: items, itemType: itemType })
      .then(({ data }) => {
        dispatch({
          type: GET_WISHLIST,
          wishlist: data.wishlist,
          itemType: itemType,
        });

        resolve();
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
  })

}

