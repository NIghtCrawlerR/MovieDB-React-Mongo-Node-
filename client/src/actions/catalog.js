import {
  GET_MOVIES_TV,
  GET_GAMES,
  GET_FULL_ITEM,
  TOGGLE_MODAL,
} from './types'
import axios from 'axios';

import {
  GET_GAMES_URL,
  GET_MOVIES_URL,
  GET_TV_URL,
  GET_ITEM_FULL_URL,
} from '../config/constants';

const LANG = 'ru';

const year = new Date().getFullYear();
const defaultParams = {
  language: LANG,
  primary_release_year: year,
  include_adult: false,
  include_video: false,
}

const prepareParams = (params, category, page) => {
  const { genres, title, crew, sort, year } = params || {};

  const genresQ = genres ? `&with_genres=${genres.join(',')}` : ''
  const titleQ = title ? `&with_keywords=${title}` : ''
  const crewQ = crew ? `&with_crew=${crew}` : ''
  const sortQ = sort ? `&sort_by=${sort}` : '&sort_by=popularity.desc'
  const yearQ = year ? `&${category === 'tv' ? 'first_air_date_year' : 'primary_release_year'}=${year}` : ''

  return {
    sort_by: sortQ,
    page,
    year: yearQ,
    crew: crewQ,
    genres: genresQ,
    title: titleQ,
  }
}

export const getTV = (page, options) => dispatch => {
  const params = prepareParams(options, 'tv', page);

  const request = {
    url: GET_TV_URL,
    method: 'get',
    params: {
      ...defaultParams,
      ...params
    }
  }

  return new Promise((resolve) => {
    axios(request)
      .then(({ data }) => {
        dispatch({
          type: GET_MOVIES_TV,
          pageType: 'tv',
          list: data.data.results
        });

        resolve(data);
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


export const getMovies = (page, options) => dispatch => {
  const params = prepareParams(options, 'movie', page);

  const request = {
    url: GET_MOVIES_URL,
    method: 'get',
    params: {
      ...defaultParams,
      ...params
    }
  }

  return new Promise((resolve, reject) => {
    axios(request)
      .then(({ data }) => {
        dispatch({
          type: GET_MOVIES_TV,
          pageType: 'movies',
          list: data.data.results
        });

        resolve(data);
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

export const getGames = (pageNumber, pageSize) => dispatch => {
  const request = {
    url: GET_GAMES_URL,
    method: 'get',
    params: {
      page: pageNumber,
      page_size: 18,
    }
  };

  return new Promise((resolve, reject) => {
    axios(request)
      .then(({ data }) => {
        dispatch({
          type: GET_GAMES,
          games: data.data.results
        });

        resolve(data);
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        });

        reject(err);
      })
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