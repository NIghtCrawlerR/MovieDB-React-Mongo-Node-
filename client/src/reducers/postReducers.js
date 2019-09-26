import { FETCH_POSTS, FETCH_MOVIES, NEW_POST } from '../actions/types'

const initialState = {
    items: [],
    movies: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload
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