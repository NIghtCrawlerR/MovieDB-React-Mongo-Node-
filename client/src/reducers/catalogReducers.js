import {
    GET_MOVIES_TV,
    GET_GAMES,
    FILTER
} from '../actions/types'

const initialState = {
    movies: [],
    tv: [],
    games: [],
    books: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES_TV:
            return {
                ...state,
                [action.pageType]: action.list,
                // filtered: action.payload
            }
        case GET_GAMES:
            return {
                ...state,
                games: action.games
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