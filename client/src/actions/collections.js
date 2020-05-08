import axios from 'axios';
import {
  GET_COLLECTIONS,
  GET_GENRES,
  UPDATE_COLLECTIONS,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  GET_COLLECTIONS_FROM_CATEGORY,
  TOGGLE_MODAL,
} from './types';

import {
  MOVIE_API_BASEURL,
  MOVIE_API_KEY,
  FETCH_COLLECTIONS_URL,
  ADD_TO_COLLECTION_URL,
  REMOVE_FROM_COLLECTION_URL,
  FECTH_COLLECTION_BY_CATEGORY_URL,
  CREATE_COLLECTION_URL,
  DELETE_COLLECTION_URL,
} from '../config/constants';

const lang = 'ru';

export const getCollections = () => (dispatch) => {
  axios.get(FETCH_COLLECTIONS_URL)
    .then((res) => {
      dispatch({
        type: GET_COLLECTIONS,
        collections: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        },
      });
    });
};

export const updateCollections = (checked, alias, itemId, itemData) => (dispatch) => {
  const data = {
    alias,
    itemId,
    itemData,
  };
  if (checked) {
    axios.post(ADD_TO_COLLECTION_URL, data)
      .then((res) => {
        dispatch({
          type: UPDATE_COLLECTIONS,
          items: res.data.items,
          alias,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          },
        });
      });
  } else {
    axios.post(REMOVE_FROM_COLLECTION_URL, data)
      .then((res) => {
        dispatch({
          type: UPDATE_COLLECTIONS,
          items: res.data.items,
          alias,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          },
        });
      });
  }
};

export const getCollectionsFromCategory = (category) => (dispatch) => new Promise(
  (resolve, reject) => {
    axios.get(FECTH_COLLECTION_BY_CATEGORY_URL(category))
      .then(({ data }) => {
        dispatch({
          type: GET_COLLECTIONS_FROM_CATEGORY,
          payload: data,
        });

        resolve(data.length);
      })
      .catch((err) => reject(err));
  },
);

export const createCollection = (userId, collection) => (dispatch) => new Promise(
  (resolve, reject) => {
    axios.post(CREATE_COLLECTION_URL(userId), { collection })
      .then(({ data }) => {
        if (data.success) {
          dispatch({
            type: CREATE_COLLECTION,
            payload: data.item,
          });
        } else throw new Error(data.message);
      })
      .catch((err) => {
        reject(err);
      });
  },
);

export const deleteCollection = (collectionId) => (dispatch) => new Promise((resolve, reject) => {
  if (!window.confirm('Delete full collection?')) return false;

  axios.delete(DELETE_COLLECTION_URL(collectionId))
    .then(() => {
      dispatch({
        type: DELETE_COLLECTION,
        payload: collectionId,
      });
    })
    .catch((err) => {
      reject(err);
    });
});

export const getGenres = () => (dispatch) => {
  axios.get(`${MOVIE_API_BASEURL}/genre/movie/list?api_key=${MOVIE_API_KEY}&language=${lang}`)
    .then((res) => {
      const { genres } = res.data;
      axios.get(`${MOVIE_API_BASEURL}/genre/tv/list?api_key=${MOVIE_API_KEY}&language=${lang}`)
        .then(({ data }) => {
          dispatch({
            type: GET_GENRES,
            genres: [...genres, ...data.genres],
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        },
      });
    });
};
