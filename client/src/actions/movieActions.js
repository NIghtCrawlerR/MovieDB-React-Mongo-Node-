import {
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    EDIT_MOVIE,
    FILTER
} from './types'
import axios from 'axios'

// const host = 'http://localhost:4000'
const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

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

export const getMovies = (page) => dispatch => {
    //${movieApiRoot}/discover/movie?api_key=${apiKey}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
    return new Promise((resolve, reject) => {
        axios.get(`${movieApiRoot}/discover/movie?api_key=${apiKey}&language=${lang}&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`)
            .then(res => {
                dispatch({
                    type: GET_MOVIES,
                    payload: res.data.results,
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
                    payload: response.data,
                    movie: response.data.movie
                })
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })

}