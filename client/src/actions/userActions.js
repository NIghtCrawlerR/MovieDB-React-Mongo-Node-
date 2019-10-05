import {
    USER_SIGN_IN,
    USER_LOG_IN,
    USER_LOG_OUT,
    USER_VERIFY,
    USER_GET,
    USER_ADD_MOVIE,
    FILTER
} from './types'

import axios from 'axios'

export const filterMovies = (movies, filter) => dispatch => {
    console.log(filter)
    // if(filter.watched) filter.watched = typeof filter.watched === 'string' && filter.watched === 'true' 
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
        filteredMovies: filtered
    })
}

export const login = user => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/users/login', user)
            .then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: USER_LOG_IN,
                        token: res.data.token,
                        userId: res.data.userId,
                        movies: res.data.movies,
                        filteredMovies: res.data.movies
                    })
                    resolve(res)
                }
                resolve(res)
            })
            .catch((err) => console.log(err))
    })
}

export const register = () => dispatch => {
    console.log('register')
    dispatch({
        type: USER_SIGN_IN
    })
}

export const logout = token => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users/logout?token=' + token)
            .then(res => {
                if (res.data.success) {
                    dispatch({
                        type: USER_LOG_OUT,
                        data: {},
                        token: '',
                        isLogin: false,
                        movies: [],
                        filteredMovies: []
                    })
                    resolve(res)
                }
            })
            .catch(err => console.log(err))
    })

}

export const verifyUser = token => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users/verify?token=' + token)
            .then(res => {
                if (res.data.success) {
                    dispatch({
                        type: USER_VERIFY,
                        isLogin: true,
                        userId: res.data.userData.userId
                    })
                }
                resolve(res)
            })
            .catch(err => {
                console.log(err)
            })
    })

}

export const userGet = userId => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users/current?userId=' + userId)
            .then(res => {
                const user = res.data
                dispatch({
                    type: USER_GET,
                    data: user.data,
                    movies: user.data.movies,
                    filteredMovies: res.data.movies
                })
                resolve(res)
            })
            .catch(err => console.log(err))
    })
}

export const userAddMovie = (userId, movies) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/users/movies/add',
            { userId: userId, movies: movies })
            .then(res => {
                dispatch({
                    type: USER_ADD_MOVIE,
                    movies: movies,
                    filteredMovies: movies
                })
                resolve({ success: true })
            })
            .catch(err => console.log(err))
    })

}
