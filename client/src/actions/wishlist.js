import axios from 'axios'

import {
  GET_WISHLIST,
  DELETE_FROM_WISHLIST,
  UPDATE_WISHLIST,
} from './types'

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

export const addItemToWishlist = (collection, item, userId) => (dispatch) => new Promise((resolve, reject) => {
  axios.post(host + '/api/wishlist/add',
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
    .catch(err => console.log(err))
});

export const deleteItemFromWishlist = (collection, itemId, userId) => (dispatch) => new Promise((resolve, reject) => {
  axios.post(host + '/api/wishlist/delete',
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
      dispatch({
        type: DELETE_FROM_WISHLIST,
        collection: collection,
        itemId: itemId
      })
      resolve({ success: true })
    })
    .catch(err => console.log(err))
});

export const updateWishlist = (collection, action, itemId, userId, value) => (dispatch) => {
  axios.post(`${host}/api/wishlist/update`, {
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
    .catch((err) => console.log(`Error: ${err}`));
};

export const getWishlist = (itemType, items) => (dispatch) =>  //get wishlist items by id arr
  new Promise((resolve, reject) => {
    axios.post(host + '/api/wishlist/get',
      { items: items, itemType: itemType })
      .then(res => {
        dispatch({
          type: GET_WISHLIST,
          wishlist: res.data.wishlist,
          itemType: itemType
        })
        resolve({ success: true })
      })
      .catch(err => console.log(err))
  });
