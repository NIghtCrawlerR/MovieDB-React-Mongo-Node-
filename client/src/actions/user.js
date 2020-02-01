import axios from 'axios'

import {
  USER_SIGN_IN,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_VERIFY,
  USER_GET,
  TOGGLE_MODAL,
} from './types'

import {
  LOGIN_URL,
  LOGOUT_URL,
  VERIFY_URL,
  FETCH_CURRENT_USER_URL,
} from '../config/constants';

export const login = user => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_URL, user)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: USER_LOG_IN,
            token: res.data.token,
            userId: res.data.userId,
            movies: res.data.movies,
          })
          resolve(res)
        }
        resolve(res)
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
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
    axios.get(LOGOUT_URL(token))
      .then(res => {
        if (res.data.success) {
          dispatch({
            type: USER_LOG_OUT,
            data: {},
            token: '',
            isLogin: false,
            movies: [],
          })
          resolve(res)
        }
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
  })

}

export const verifyUser = token => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get(VERIFY_URL(token))
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
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
  })

}

export const userGet = userId => dispatch => { //get current user data
  return new Promise((resolve, reject) => {
    axios.get(FETCH_CURRENT_USER_URL(userId))
      .then(res => {
        const user = res.data
        const { data } = user;
        dispatch({
          type: USER_GET,
          data: data,
          movies: data.movies,
          games: data.games,
          tv: data.tv,
          books: data.books,
        })
        resolve(res)
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
  })
}