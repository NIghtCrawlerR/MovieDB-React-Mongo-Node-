import {
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

const setUserState = (state, payload) => {
  const {
    email,
    group,
    id,
    movies,
    games,
    tv,
  } = payload;

  return {
    ...state,
    email,
    group,
    id,
    movies,
    games,
    tv,
  }
}

const resetState = state => {
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
  switch (action.type) {
    case UPDATE_WISHLIST:
      return updateWishlist(state, action);

    case USER_GET:
      return setUserState(state, action.payload);

    case USER_LOG_IN:
      const {
        payload,
        token,
      } = action;

      return {
        ...state,
        email: payload.email,
        id: payload._id,
        group: payload.group,
        isLogin: true,
        movies: payload.movies,
        tv: payload.tv,
        games: payload.games,
        token: token,
        errorMessage: null,
        successMessage: null,
      }

    case USER_LOG_OUT:
      return resetState(state);

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