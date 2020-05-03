import {
  GET_MOVIES_TV,
  GET_GAMES,
  GET_FULL_ITEM,
  TOGGLE_MODAL,
  SET_LOADING,
} from './types'
import axios from 'axios';

import {
  GET_GAMES_URL,
  GET_MOVIES_URL,
  GET_TV_URL,
  GET_ITEM_FULL_URL,
} from '../config/constants';

const LANG = 'ru';

const defaultParams = {
  language: LANG,
  include_adult: false,
  include_video: false,
}

const makeRequest = (url, category, page, dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  const request = {
    url,
    method: 'get',
    params: {
      page,
      ...defaultParams,
    }
  }

  axios(request)
    .then(({ data }) => {
      dispatch({
        type: GET_MOVIES_TV,
        category,
        payload: data,
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    })
}

export const getTV = page => dispatch => {
  return makeRequest(GET_TV_URL, 'tv', page, dispatch);
}

export const getMovies = page => dispatch => {
  return makeRequest(GET_MOVIES_URL, 'movies', page, dispatch);
}

export const getGames = page => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  const request = {
    url: GET_GAMES_URL,
    method: 'get',
    params: {
      page,
      page_size: 18,
    }
  };

  axios(request)
    .then(({ data }) => {
      dispatch({
        type: GET_GAMES,
        payload: data,
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    })
}

export const getFullItem = (category, id) => dispatch => {
  const request = {
    url: GET_ITEM_FULL_URL(category, id),
    method: 'get',
  }

  axios(request)
    .then((res) => {
      dispatch({
        type: GET_FULL_ITEM,
        payload: res.data.data
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
}