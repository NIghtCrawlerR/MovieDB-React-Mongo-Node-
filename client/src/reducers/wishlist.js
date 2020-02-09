import {
  GET_WISHLIST,
} from '../actions/types'

const initialState = {
  movies: [],
  tv: [],
  games: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      return {
        ...state,
        [action.itemType]: action.wishlist[action.itemType],
      }

    default:
      return state;
  }
}