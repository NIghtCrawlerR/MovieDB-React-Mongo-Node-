import {
  GET_COLLECTIONS,
  GET_GENRES,
  GET_WISHLIST,
  DELETE_FROM_WISHLIST,
  UPDATE_COLLECTIONS
} from '../actions/types'

const initialState = {
  moviesGenres: [],
  collections: [],
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

    case GET_GENRES:
      return {
        ...state,
        moviesGenres: action.genres
      }

    case UPDATE_COLLECTIONS: {
      return {
        ...state,
        collections: state.collections.map(collection => collection.alias === action.alias ?
          { ...collection, items: action.items }
          : collection)
      }
    }

    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.collections
      }

    default:
      return state
  }
}