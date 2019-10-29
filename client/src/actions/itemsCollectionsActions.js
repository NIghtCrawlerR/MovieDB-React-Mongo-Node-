import {
    GET_MOVIES_COLLECTIONS,
    GET_TV_COLLECTIONS,
    GET_GAMES_COLLECTIONS,
    GET_GENRES,
    GET_WISHLIST,
    DELETE_FROM_WISHLIST,
    UPDATE_WISHLIST
} from './types'

import axios from 'axios'
const host = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

const gameApiRoot = 'https://rawg.io/api'

export const getGenres = (collection) => dispatch => {
    axios.get(`${movieApiRoot}/genre/${collection}/list?api_key=${apiKey}&language=${lang}`)
        .then(res => {
            let genres = res.data.genres
            axios.get(`${movieApiRoot}/genre/tv/list?api_key=${apiKey}&language=${lang}`)
                .then(res => {
                    // genres.push(res.data.genres)
                    dispatch({
                        type: GET_GENRES,
                        genres: [...genres, ...res.data.genres]
                    })
                })

        })
        .catch(err => console.log(err))
}

export const getMovies = (collection) => dispatch => {
    axios.get(`${movieApiRoot}/movie/${collection}?api_key=${apiKey}&language=${lang}&page=1`)
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
    axios.get(`${movieApiRoot}/tv/${collection}?api_key=${apiKey}&language=${lang}&page=1`)
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
    axios.get(`${gameApiRoot}/collections/${collection}/games`)
        .then(res => {
            dispatch({
                type: GET_GAMES_COLLECTIONS,
                games: res.data.results,
                collection: collection
            })
        })
        .catch(err => console.log(err))
}

export const addItemToWishlist = (collection, item, userId) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(host + '/api/wishlist/add',
            { collection: collection, userId: userId, item: item })
            .then(res => {
                dispatch({
                    type: UPDATE_WISHLIST,
                    collection: collection,
                    item: item
                })
                resolve({ success: true })
            })
            .catch(err => console.log(err))
    })
}

export const deleteItemToWishlist = (collection, itemId, userId) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(host + '/api/wishlist/delete',
            { collection: collection, itemId: itemId, userId: userId })
            .then(res => {
                const item = {
                    id: itemId
                }
                dispatch({
                    type: UPDATE_WISHLIST,
                    collection: collection,
                    item: item
                })
                dispatch({
                    type: DELETE_FROM_WISHLIST,
                    collection: collection,
                    itemId: itemId
                })
                resolve({ success: true })
            })
            .catch(err => console.log(err))
    })
}

export const getWishlist = (itemType, items) => dispatch => { //get wishlist items by id arr
    console.log(itemType)
    return new Promise((resolve, reject) => {
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
    })

}