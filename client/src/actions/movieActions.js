import {
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    EDIT_MOVIE,
    DELETE_MOVIE,
    ADD_MOVIE,
    FILTER
} from './types'
import axios from 'axios'

export const filterMovies = (movies, filter) => dispatch => {
    let filtered = []
    let filterKeys = Object.keys(filter)

    filtered = movies.filter(item => {
        return filterKeys.every(key => {
            if (key === 'title') return item[key].toLowerCase().indexOf(filter[key]) !== -1
            else return item[key] === filter[key]
        })
    })

    dispatch({
        type: FILTER,
        movies: movies,
        filtered: filtered
    })
}

export const getMovies = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/movies')
            .then(res => {
                dispatch({
                    type: GET_MOVIES,
                    payload: res.data,
                    list: res.data
                })
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })


}

export const getMovieById = id => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/movies/' + id)
            .then(response => {
                dispatch({
                    type: GET_MOVIE_BY_ID,
                    id: id,
                    payload: response.data
                })
                resolve(response)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })


}

export const editMovie = (id, movie, userId) => dispatch => {
    const userData = { userId: userId, action: 'edit' }
    return new Promise((resolve, reject) => {
        axios.post('/api/movies/update/' + id, movie, { params: userData })
            .then(response => {
                dispatch({
                    type: EDIT_MOVIE,
                    id: id,
                    payload: response.data
                })
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })

}

export const addMovie = (movie, userId) => dispatch => {
    const userData = { userId: userId, action: 'add' }
    return new Promise((resolve, reject) => {
        axios.post('/api/movies/add', movie, { params: userData })
            .then(response => {
                dispatch({
                    type: ADD_MOVIE,
                    payload: response.data
                })
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })


}

export const deleteMovie = (id, userId) => dispatch => {
    return new Promise((resolve, reject) => {
        const userData = { userId: userId, action: 'delete' }
        axios.delete('/api/movies/delete/' + id, { params: userData })
            .then(res => {
                dispatch({
                    type: DELETE_MOVIE,
                    id: id
                })
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })

}