import {
    GET_COLLECTIONS,
    GET_MOVIES_COLLECTIONS,
    GET_TV_COLLECTIONS,
    GET_GAMES_COLLECTIONS,
    GET_GENRES,
    GET_WISHLIST,
    DELETE_FROM_WISHLIST,
    UPDATE_WISHLIST,
    UPDATE_COLLECTIONS
} from './types'

import axios from 'axios'
const host = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

const gameApiRoot = 'https://rawg.io/api'

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

export const updateCollections = (checked, alias, itemId, itemData) => dispatch => {
    console.log(checked, alias, itemId)
    const data = {
        alias: alias,
        itemId: itemId,
        itemData: itemData,
    }
    if (checked) {
        axios.post(`${host}/api/collection/add`, data)
            .then(res => {
                dispatch({
                    type: UPDATE_COLLECTIONS,
                    items: res.data.items,
                    alias: alias
                })
            })
            .catch(err => console.log(err))
    } else {
        axios.post(`${host}/api/collection/delete`, data)
            .then(res => {
                dispatch({
                    type: UPDATE_COLLECTIONS,
                    items: res.data.items,
                    alias: alias
                })
            })
            .catch(err => console.log(err))
    }

}

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

export const getMovies = (collection, page) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`${movieApiRoot}/movie/${collection}?api_key=${apiKey}&language=${lang}&page=${page}`)
            .then(res => {
                dispatch({
                    type: GET_MOVIES_COLLECTIONS,
                    movies: res.data.results,
                    collection: collection
                })
                resolve({ data: res.data })
            })
            .catch(err => {
                reject(err)
            })
    })

}

export const getTV = (collection, page) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`${movieApiRoot}/tv/${collection}?api_key=${apiKey}&language=${lang}&page=${page}`)
            .then(res => {
                dispatch({
                    type: GET_TV_COLLECTIONS,
                    tv: res.data.results,
                    collection: collection
                })
                resolve({ data: res.data })
            })
            .catch(err => {
                reject(err)
            })
    })

}

export const getGames = (collection, page) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`${gameApiRoot}/collections/${collection}/games?page=${page}&page_size=18`)
            .then(res => {
                dispatch({
                    type: GET_GAMES_COLLECTIONS,
                    games: res.data.results,
                    collection: collection
                })
                resolve({ data: res.data })
            })
            .catch(err => {
                reject(err)
            })
    })

}

export const addItemToWishlist = (collection, item, userId) => dispatch => {
    return new Promise((resolve, reject) => {
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
    })
}

export const deleteItemFromWishlist = (collection, itemId, userId) => dispatch => {
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
    })
}

export const updateWishlist = (collection, action, itemId, userId, value) => dispatch => {
    axios.post(host + '/api/wishlist/update', { collection: collection, action: action, itemId: itemId, userId: userId, value: value })
        .then(() => {
            dispatch({
                type: UPDATE_WISHLIST,
                collection: collection,
                do: action,
                id: itemId
            })
        })
        .catch(err => console.log('Error: ' + err))
}

export const getWishlist = (itemType, items) => dispatch => { //get wishlist items by id arr
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