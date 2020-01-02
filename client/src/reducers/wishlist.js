import {
  GET_WISHLIST,
  DELETE_FROM_WISHLIST,
} from '../actions/types'

const initialState = {
  wishlist: {
    movies: [],
    tv: [],
    games: [],
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

    default:
      return state
  }
}