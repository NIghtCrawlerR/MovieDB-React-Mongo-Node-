import {
  USER_SIGN_IN,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_VERIFY,
  USER_GET,
  UPDATE_WISHLIST,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
} from '../actions/types'

const initialState = {
  email: '',
  id: null,
  group: null,
  isLogin: false,
  movies: [],
  tv: [],
  games: [],
  errorMessage: null,
  successMessage: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_WISHLIST:
      let list = [...state[action.collection]] || [];
      const ids = list.map(item => item.id);

      if (action.do === 'add' || action.do === 'delete') {
        if (ids.includes(action.item.id)) {
          list.splice(list.findIndex(item => item.id === action.item.id), 1)
        } else {
          list.push({ id: action.item.id, liked: false, watched: false })
        }
      } else {
        list.map(item => {
          if (item.id === action.id) item[action.do] = !item[action.do]
          return item
        })
      }

      return {
        ...state,
        [action.collection]: list,
      }

    case USER_GET:
      const {
        payload: {
          email,
          group,
          id,
          movies,
          games,
          tv,
        }
      } = action;

      return {
        ...state,
        email,
        group,
        id,
        movies,
        games,
        tv,
      }


    case USER_LOG_IN:
      return {
        ...state,
        data: action.payload,
      }

    case USER_LOG_OUT:
      return {
        ...state,
        email: '',
        id: null,
        group: null,
        isLogin: false,
        movies: [],
        tv: [],
        games: [],
      }

    case USER_VERIFY:
      return {
        ...state,
        isLogin: true,
        userId: action.userId,
      }

    case USER_SIGN_IN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      }

    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        successMessage: action.payload,
      }

    default:
      return state;
  }
}