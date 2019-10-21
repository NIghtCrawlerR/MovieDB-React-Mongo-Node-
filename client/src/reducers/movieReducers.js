import {
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    EDIT_MOVIE,
    DELETE_MOVIE,
    ADD_MOVIE,
    FILTER
} from '../actions/types'

const initialState = {
    list: [],
    filtered: [],
    movie: {},
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                list: action.payload,
                filtered: action.payload
            }
        case GET_MOVIE_BY_ID:
            return {
                ...state,
                movie: action.payload
            }
        case EDIT_MOVIE:
            const i = state.list.findIndex(x => x._id === action.movie._id);
            function edit(items) {
                items[i] = action.movie
                return items
            }
            const newList = edit(state.list)
            return {
                ...state,
                list: newList,
                filter: newList
            }
        case DELETE_MOVIE:
            return {
                ...state,
                list: state.list.filter(movie => movie._id !== action.id),
                filtered: state.list.filter(movie => movie._id !== action.id),
            }
        case ADD_MOVIE:
            return {
                ...state,
                list: [action.movie, ...state.list],
                filtered: [action.movie, ...state.list],
                movie: action.payload
            }
        case FILTER:
            return {
                ...state,
                movies: action.movies,
                filtered: action.filtered
            }
        default:
            return state
    }
}