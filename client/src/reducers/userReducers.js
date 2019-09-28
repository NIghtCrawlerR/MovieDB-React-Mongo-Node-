import {
    USER_SIGN_IN,
    USER_LOG_IN,
    USER_LOG_OUT,
    USER_VERIFY,
    USER_GET_MOVIES,
    USER_GET,
    USER_ADD_MOVIE
} from '../actions/types'

const initialState = {
    data: {},
    token: '',
    isLogin: false,
    movies: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_GET:
            return {
                ...state,
                data: action.data,
                movies: action.movies
            }
        case USER_ADD_MOVIE:
            console.log(action)
            return {
                ...state,
                movies: action.movies
            }
        case USER_SIGN_IN:
            return {
                ...state,
                data: action.payload
            }
        case USER_LOG_IN:
            return {
                ...state,
                data: action.payload
            }
        case USER_LOG_OUT:
            return {
                ...state,
                isLogin: action.isLogin
            }
        case USER_VERIFY:
            return {
                ...state,
                isLogin: action.isLogin,
                userId: action.userId,
                data: action.payload
            }
        case USER_GET_MOVIES:
            return {
                ...state,
                movies: action.movies
            }
        default:
            return state
    }
}