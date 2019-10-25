import {
    GET_MOVIES_COLLECTIONS,
    GET_TV_COLLECTIONS,
    GET_GAMES_COLLECTIONS
} from './types'

import axios from 'axios'

const baseUrl = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

const gameApiEndpoint = 'https://rawg.io/api'

export const getMovies = (collection) => dispatch => {
    axios.get(`${baseUrl}/movie/${collection}?api_key=${apiKey}&language=${lang}&page=1`)
        .then(res => {
            dispatch({
                type: GET_MOVIES_COLLECTIONS,
                movies: res.data.results,
                collection: collection
            })
        })
        .catch(err => console.log(err))
}

export const getTV = (collection) => dispatch => {
    axios.get(`${baseUrl}/tv/${collection}?api_key=${apiKey}&language=${lang}&page=1`)
        .then(res => {
            dispatch({
                type: GET_TV_COLLECTIONS,
                tv: res.data.results,
                collection: collection
            })
        })
        .catch(err => console.log(err))
}

export const getGames = (collection) => dispatch => {
    // /collections/games-to-check-out/games
    axios.get(`${gameApiEndpoint}/collections/${collection}/games`)
        .then(res => {
            dispatch({
                type: GET_GAMES_COLLECTIONS,
                games: res.data.results,
                collection: collection
            })
        })
        .catch(err => console.log(err))
}