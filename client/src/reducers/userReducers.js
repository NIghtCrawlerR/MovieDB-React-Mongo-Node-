import {
    USER_SIGN_IN,
    USER_LOG_IN,
    USER_LOG_OUT,
    USER_VERIFY,
    USER_GET,
    FILTER,
    UPDATE_WISHLIST
} from '../actions/types'

const initialState = {
    data: {},
    token: '',
    isLogin: false,
    movies: [],
    tv: [],
    games: [],
    books: [],
    filteredMovies: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_WISHLIST:
            let list = [...state[action.collection]] || []
            if(list.includes(action.item.id)) {
                list.splice( list.indexOf(action.item.id), 1 )
            } else {
                list.push(action.item.id)
            }
            return{ 
                ...state,
                [action.collection]: list
            }
        case USER_GET:
            return {
                ...state,
                data: action.data,
                movies: action.movies,
                games: action.games,
                tv: action.tv,
                books: action.books,
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
                // isLogin: action.isLogin,
                data: {},
                token: '',
                isLogin: false,
                movies: [],
                filteredMovies: []
            }
        case USER_VERIFY:
            return {
                ...state,
                isLogin: action.isLogin,
                userId: action.userId,
                data: action.payload
            }
        case FILTER:
            return {
                ...state,
                movies: action.movies,
                filteredMovies: action.filteredMovies
            }
        default:
            return state
    }
}