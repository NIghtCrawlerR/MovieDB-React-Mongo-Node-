import {
    USER_SIGN_IN,
    USER_LOG_IN,
    USER_LOG_OUT,
    USER_VERIFY
} from './types'

import axios from 'axios'

export const login = () => dispatch => {
    console.log('log in')
}

export const register = () => dispatch => {
    console.log('register')
}

export const logout = () => dispatch => {
    console.log('logout')
}

export const verify = () => dispatch => {
    console.log('verify')
}