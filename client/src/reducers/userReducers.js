import {
    USER_SIGN_IN,
    USER_LOG_IN,
    USER_LOG_OUT,
    USER_VERIFY,
    USER_GET_MOVIES,
    USER_GET,
    USER_ADD_MOVIE,
    FILTER
} from '../actions/types'

const initialState = {
    data: {},
    token: '',
    isLogin: false,
    movies: [],
    moviesList: [], //remove this
    filteredMovies: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_GET:
            // console.log('USER_GET', action)
            return {
                ...state,
                data: action.data,
                movies: action.movies,
                filteredMovies: action.movies
            }
        case USER_ADD_MOVIE:
            // console.log('USER_ADD_MOVIE', action)
            return {
                ...state,
                movies: action.movies,
                filteredMovies: action.movies
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
            // console.log('USER_VERIFY', action)
            return {
                ...state,
                isLogin: action.isLogin,
                userId: action.userId,
                data: action.payload
            }
        case FILTER:
            console.log(action)
            return {
                ...state,
                movies: action.movies,
                filteredMovies: action.filteredMovies
            }
        // case USER_GET_MOVIES:
        //     console.log('USER_GET_MOVIES', action)
        //     return {
        //         ...state,
        //         movies: action.movies,
        //         // moviesList: action.moviesList
        //     }
        default:
            return state
    }
}