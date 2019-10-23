import {
    GET_TOP_MOVIES,
    GET_POPULAR_MOVIES,
    GET_TOP_TV,
    GET_POPULAR_TV,
} from '../actions/types'

const initialState = {
    moviesPopular: [],
    moviesTopRated: [],
    tvPopular: [],
    tvTopRated: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TOP_MOVIES:
            return {
                ...state,
                moviesTopRated: action.moviesTopRated
            }
        case GET_POPULAR_MOVIES:
            return {
                ...state,
                moviesPopular: action.moviesPopular
            }
        case GET_TOP_TV:
            return {
                ...state,
                tvTopRated: action.tvTopRated
            }
        case GET_POPULAR_TV:
            return {
                ...state,
                tvPopular: action.tvPopular
            }
        default:
            return state
    }
}