import {
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    EDIT_MOVIE,
    DELETE_MOVIE,
    ADD_MOVIE,
    NEW_POST
} from '../actions/types'

const initialState = {
    movies: [],
    movie: {},
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case GET_MOVIE_BY_ID:
            return {
                ...state,
                movie: action.payload
            }
        case EDIT_MOVIE:
            return {
                ...state
            }
        case DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movie => movie._id !== action.id)
            }
        case ADD_MOVIE:
            return {
                ...state,
                movie: action.payload
            }
        case NEW_POST:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}