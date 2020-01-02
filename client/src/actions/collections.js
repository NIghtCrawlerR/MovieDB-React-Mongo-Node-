import axios from 'axios'
import {
  GET_COLLECTIONS,
  GET_GENRES,
  UPDATE_COLLECTIONS,
  CREATE_COLLECTION,
  GET_COLLECTIONS_FROM_CATEGORY,
} from './types'

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL;
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
const lang = 'ru';

export const getCollections = () => dispatch => {
  axios.get(`${host}/api/collection/get`)
    .then(res => {
      dispatch({
        type: GET_COLLECTIONS,
        collections: res.data
      })
    })
    .catch(err => console.log(err))
}

export const updateCollections = (checked, alias, itemId, itemData) => (dispatch) => {
  const data = {
    alias,
    itemId,
    itemData,
  };
  if (checked) {
    axios.post(`${host}/api/collection/add`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_COLLECTIONS,
          items: res.data.items,
          alias,
        });
      })
      .catch((err) => console.log(err));
  } else {
    axios.post(`${host}/api/collection/remove`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_COLLECTIONS,
          items: res.data.items,
          alias,
        });
      })
      .catch((err) => console.log(err));
  }
};

export const getCollectionsFromCategory = (category) => dispatch => {
  axios.get(`${host}/api/collection/get/${category}`)
    .then(res => {
      const collections = res.data
      dispatch({
        type: GET_COLLECTIONS_FROM_CATEGORY,
        payload: collections,
      })
    })
    .catch(err => console.log(err))
}

export const createCollection = (userId, data) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(`${host}/api/collection/create?userId=${userId}`, { collection: data })
      .then(res => {
        if (res.data.success) {
          dispatch({
            type: CREATE_COLLECTION,
            payload: res.data.item
          })
        } else throw new Error(res.data.message)
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const getGenres = (collection) => (dispatch) => {
  axios.get(`${movieApiRoot}/genre/${collection}/list?api_key=${apiKey}&language=${lang}`)
    .then((res) => {
      const { genres } = res.data;
      axios.get(`${movieApiRoot}/genre/tv/list?api_key=${apiKey}&language=${lang}`)
        .then((res) => {
          // genres.push(res.data.genres)
          dispatch({
            type: GET_GENRES,
            genres: [...genres, ...res.data.genres],
          });
        });

    })
    .catch((err) => console.log(err));
};
