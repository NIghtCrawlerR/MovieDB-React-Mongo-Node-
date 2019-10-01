import {
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    EDIT_MOVIE,
    DELETE_MOVIE,
    ADD_MOVIE,
    NEW_POST,
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
        axios.get('/movies')
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
                resolve(err)
            })
    })


}

export const getMovieById = id => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/movies/' + id)
            .then(response => {
                dispatch({
                    type: GET_MOVIE_BY_ID,
                    id: id,
                    payload: response.data
                })
                resolve(response)
            })
            .catch((err) => console.log(err))
    })


}

export const editMovie = (id, movie) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/movies/update/' + id, movie)
            .then(response => {
                dispatch({
                    type: EDIT_MOVIE,
                    id: id,
                    payload: response.data
                })
                resolve(response)
            })
            .catch(err => console.log(err))
    })

}

export const addMovie = (movie) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/movies/add', movie)
            .then(response => {
                dispatch({
                    type: ADD_MOVIE,
                    payload: response.data
                })
                resolve(response)
            })
            .catch(err => console.log(err))
    })


}

export const deleteMovie = id => dispatch => {
    return new Promise((resolve, reject) => {
        axios.delete('/movies/delete/' + id)
            .then(res => {
                dispatch({
                    type: DELETE_MOVIE,
                    id: id
                })
                resolve(res)
            })
            .catch(err => console.log(err))
    })

}

export const createPost = (postData) => dispatch => {
    console.log('createPost')
    dispatch({
        type: NEW_POST,
        payload: ['new post']
    })
}