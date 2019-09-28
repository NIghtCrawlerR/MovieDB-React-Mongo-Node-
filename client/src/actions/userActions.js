import {
    USER_SIGN_IN,
    USER_LOG_IN,
    USER_LOG_OUT,
    USER_VERIFY,
    USER_GET_MOVIES,
    USER_GET,
    USER_ADD_MOVIE
} from './types'

import axios from 'axios'
import { bindActionCreators } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux';

export const login = user => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/users/login', user)
            .then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: USER_LOG_IN,
                        token: res.data.token,
                        userId: res.data.userId,
                        movies: res.data.movies
                    })
                    resolve(res)
                } else {
                    // this.setState({
                    //     errorMessage: res.data.message
                    // })
                }
                console.log(res)
            })
            .catch((err) => console.log(err))
    })
}

export const register = () => dispatch => {
    console.log('register')
}

export const logout = token => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/users/logout?token=' + token)
            .then(res => {
                if (res.data.success) {
                    dispatch({
                        type: USER_LOG_OUT,
                        isLogin: false
                    })
                    resolve(res)
                }
            })
            .catch(err => console.log(err))
    })

}

export const verifyUser = token => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/users/verify?token=' + token)
            .then(res => {
                if (res.data.success) {
                    dispatch({
                        type: USER_VERIFY,
                        isLogin: true,
                        userId: res.data.userData.userId
                    })
                    resolve(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

}

export const userGet = userId => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/users/current?userId=' + userId)
            .then(res => {
                const user = res.data
                console.log(user)
                dispatch({
                    type: USER_GET,
                    data: user.data,
                    movies: user.data.movies
                })
                resolve(res)
            })
            .catch(err => console.log(err))
    })
}

export const userAddMovie = (userId, movies) => dispatch => {
    console.log('userAddMovie', movies)

    axios.post('http://localhost:4000/api/users/movies/add',
        { userId: userId, movies: movies })
        .then(res => {
            dispatch({
                type: USER_ADD_MOVIE,
                movies: movies
            })
        })
        .catch(err => console.log(err))
}

export const userGetMovies = userId => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/users/movies/get',
            { userId: userId })
            .then(res => {
                dispatch({
                    type: USER_GET_MOVIES,
                    movies: []
                })
                resolve(res)
            })
            .catch(err => console.log(err))
    })
}