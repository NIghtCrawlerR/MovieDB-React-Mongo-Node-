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
    filtered: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_WISHLIST:
            let list = [...state[action.collection]] || []
            const ids = list.map(item => item.id)
          
            if(action.do === 'add' || action.do === 'delete') {
                if(ids.includes(action.item.id)) {
                    list.splice( list.findIndex(item => item.id === action.item.id), 1 )
                } else {
                    list.push({id: action.item.id, liked: false, watched: false})
                }
            } else {
                list.map(item => {
                    if(item.id === action.id) item[action.do] = !item[action.do]
                    return item
                })
                
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
                filtered: action.movies
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
                filtered: []
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
                filtered: action.filtered
            }
        default:
            return state
    }
}