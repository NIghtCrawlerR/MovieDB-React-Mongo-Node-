import {
    GET_MOVIES_COLLECTIONS,
    GET_TV_COLLECTIONS,
    GET_GAMES_COLLECTIONS,
    GET_GENRES,
    GET_WISHLIST,
    DELETE_FROM_WISHLIST
} from '../actions/types'

const initialState = {
    movies: [],
    games: [],
    books: [],
    tv: [],
    moviesGenres: [],
    wishlist: {
        movies: [],
        tv: [],
        games: [],
        books: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: {
                    [action.collection]: state.wishlist[action.collection].filter(item => item.id !== action.itemId)
                }
            }
        case GET_WISHLIST:
            return {
                ...state,
                wishlist: {
                    ...state.wishlist,
                    [action.itemType]: action.wishlist[action.itemType]
                }
            }
        case GET_GENRES:
            return {
                ...state,
                moviesGenres: action.genres
            }
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