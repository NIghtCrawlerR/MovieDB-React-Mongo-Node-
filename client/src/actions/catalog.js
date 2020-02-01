import {
  GET_MOVIES_TV,
  GET_GAMES,
  GET_FULL_ITEM,
} from './types'
import axios from 'axios';

import {
  MOVIE_API_BASEURL,
  MOVIE_API_KEY,
  GAME_API_BASEURL,
} from '../config/constants';

const LANG = 'ru'

export const getMoviesTv = (type, page, options) => dispatch => {
  const genres = options && options.genres ? `&with_genres=${options.genres.join(',')}` : ''
  const title = options && options.title ? `&with_keywords=${options.title}` : ''
  const crew = options && options.crew ? `&with_crew=${options.crew}` : ''
  const sort_by = options && options.sort ? `&sort_by=${options.sort}` : '&sort_by=popularity.desc'
  const year = options && options.year ? `&${type === 'tv' ? 'first_air_date_year' : 'primary_release_year'}=${options.year}` : ''

  return new Promise((resolve, reject) => {
    let pageType = type
    if (pageType === 'movies') pageType = 'movie'

    axios.get(
      `${MOVIE_API_BASEURL}/discover/${pageType}?api_key=${MOVIE_API_KEY}&language=${LANG}${sort_by}&include_adult=false&include_video=false&page=${page}${year}${crew}${genres}${title}`
    )
      .then(res => {
        dispatch({
          type: GET_MOVIES_TV,
          pageType: type,
          list: res.data.results
        })
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export const getGames = (pageNumber, pageSize) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get(`${GAME_API_BASEURL}?page=${pageNumber}&page_size=18`)
      .then(res => {
        dispatch({
          type: GET_GAMES,
          games: res.data.results
        })
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export const getFullItem = (category, id) => dispatch => {
  return new Promise((resolve, reject) => {
    category = category === 'movies' ? 'movie' : category;

    const requestUrl = category === 'games'
      ? `${GAME_API_BASEURL}/${id}`
      : `${MOVIE_API_BASEURL}/${category}/${id}?api_key=${MOVIE_API_KEY}&language=${LANG}&append_to_response=videos`;

    axios.get(requestUrl)
      .then((res) => {
        dispatch({
          type: GET_FULL_ITEM,
          payload: res.data
        })
        resolve()
      })
      .catch((err) => reject(err));
  })
}