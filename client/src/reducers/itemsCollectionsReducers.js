import {
    GET_MOVIES_COLLECTIONS,
    GET_TV_COLLECTIONS,
    GET_GAMES_COLLECTIONS
} from '../actions/types'

const initialState = {
    movies: {},
    games: {},
    books: {},
    tv: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES_COLLECTIONS:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    [action.collection]: action.movies
                }
            }
        case GET_TV_COLLECTIONS:
            return {
                ...state,
                tv: {
                    ...state.tv,
                    [action.collection]: action.tv
                }
            }
        case GET_GAMES_COLLECTIONS:
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.collection]: action.games
                }
            }
        default:
            return state
    }
}