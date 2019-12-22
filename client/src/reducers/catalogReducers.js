import {
  GET_MOVIES_TV,
  GET_GAMES,
  GET_FULL_ITEM,
} from '../actions/types'

const initialState = {
  movies: [],
  tv: [],
  games: [],
  itemFullInfo: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_TV:
      return {
        ...state,
        [action.pageType]: action.list,
      }

    case GET_GAMES:
      return {
        ...state,
        games: action.games
      }

    case GET_FULL_ITEM:
      return {
        ...state,
        itemFullInfo: action.payload,
      }

    default:
      return state
  }
}