import {
  USER_SIGN_IN,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_VERIFY,
  USER_GET,
  UPDATE_WISHLIST
} from '../actions/types'

const initialState = {
  data: {},
  token: '',
  isLogin: false,
  movies: [],
  tv: [],
  games: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_WISHLIST:
      let list = [...state[action.collection]] || [];
      const ids = list.map(item => item.id);
          
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

      return {
        ...state,
        [action.collection]: list,
      }

    case USER_GET:
      return {
        ...state,
        data: action.data,
        movies: action.movies,
        games: action.games,
        tv: action.tv,
      }

    case USER_SIGN_IN:
      return {
        ...state,
        data: action.payload,
      }

    case USER_LOG_IN:
      return {
        ...state,
        data: action.payload,
      }

    case USER_LOG_OUT:
      return {
        ...state,
        data: {},
        token: '',
        isLogin: false,
        movies: [],
      }

    case USER_VERIFY:
      return {
        ...state,
        isLogin: true,
        userId: action.userId,
        data: action.payload,
      }

    default:
      return state
  }
}