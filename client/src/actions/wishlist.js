import axios from 'axios'

import {
  GET_WISHLIST,
  UPDATE_WISHLIST,
  TOGGLE_MODAL,
  TOGGLE_LOADER,
} from './types'

import {
  FETCH_WISHLIST_URL,
  ADD_TO_WISHLIST_URL,
  DELETE_FROM_WISHLIST_URL,
  UPDATE_WISHLIST_URL,
} from '../config/constants';

export const addItemToWishlist = (collection, item, userId) => (dispatch) => new Promise((resolve, reject) => {
  axios.post(ADD_TO_WISHLIST_URL,
    { collection: collection, userId: userId, item: item })
    .then(res => {
      dispatch({
        type: UPDATE_WISHLIST,
        collection: collection,
        item: item,
        do: 'add'
      })
      resolve({ success: true })
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

export const deleteItemFromWishlist = (collection, itemId, userId) => (dispatch) => new Promise((resolve, reject) => {
  axios.post(DELETE_FROM_WISHLIST_URL,
    { collection: collection, itemId: itemId, userId: userId })
    .then(res => {
      const item = {
        id: itemId
      }
      dispatch({
        type: UPDATE_WISHLIST,
        collection: collection,
        item: item,
        do: 'delete'
      })
      resolve({ success: true })
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

export const updateWishlist = (collection, action, itemId, userId, value) => (dispatch) => {
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

