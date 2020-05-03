import {
  USER_LOG_IN,
  USER_LOG_OUT,
  VERIFY_USER,
  GET_USER,
  UPDATE_WISHLIST,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
} from '../actions/types'

const initialState = {
  email: '',
  id: null,
  group: null,
  isLogin: false,
  isAdmin: false,
  movies: [],
  tv: [],
  games: [],
  errorMessage: null,
  successMessage: null,
}

const resetState = state => {
  return {
    ...state,
    email: '',
    id: null,
    group: null,
    isLogin: false,
    isAdmin: false,
    movies: [],
    tv: [],
    games: [],
  }
}

const updateWishlist = (state, action) => {
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
}

export default function (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WISHLIST:
      return updateWishlist(state, action);

    case GET_USER:
      return {
        ...state,
        ...payload,
      }

    case USER_LOG_IN:
      const { token } = action;

      return {
        ...state,
        ...payload,
        token,
        isLogin: true,
        errorMessage: null,
        successMessage: null,
      }

    case USER_LOG_OUT:
      return resetState(state);

    case VERIFY_USER:
      return {
        ...state,
        isLogin: true,
      }

    case USER_SIGN_IN_ERROR:
      return {
        ...state,
        errorMessage: payload,
      }

    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        successMessage: payload,
      }

    default:
      return state;
  }
}