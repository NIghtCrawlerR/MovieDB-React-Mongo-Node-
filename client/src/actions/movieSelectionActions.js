import {
    GET_TOP_MOVIES,
    GET_POPULAR_MOVIES,
    GET_TOP_TV,
    GET_POPULAR_TV,
} from './types'

import axios from 'axios'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = 'f173a387483cd86fc18ab172d5d822ae'
const lang = 'ru'

export const getTopMovies = () => dispatch => {
    axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=${lang}&page=1`)
        .then(res => {
            dispatch({
                type: GET_TOP_MOVIES,
                moviesTopRated: res.data.results
            })
        })
        .catch(err => console.log(err))
}

export const getPopularMovies = () => dispatch => {
    axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&language=${lang}&page=1`)
        .then(res => {
            dispatch({
                type: GET_POPULAR_MOVIES,
                moviesPopular: res.data.results
            })
        })
        .catch(err => console.log(err))
}

export const getTopTV = () => dispatch => {
    axios.get(`${baseUrl}/tv/top_rated?api_key=${apiKey}&language=${lang}&page=1`)
        .then(res => {
            dispatch({
                type: GET_TOP_TV,
                tvTopRated: res.data.results
            })
        })
        .catch(err => console.log(err))
}

export const getPopularTV = () => dispatch => {
    axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&language=${lang}&page=1`)
        .then(res => {
            dispatch({
                type: GET_POPULAR_TV,
                tvPopular: res.data.results
            })
        })
        .catch(err => console.log(err))
}