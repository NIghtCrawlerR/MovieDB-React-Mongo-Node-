import {
  GET_MOVIES_TV,
  GET_GAMES,
  GET_FULL_ITEM,
  SET_LOADING,
} from '../actions/types'

const initialState = {
  movies: [],
  tv: [],
  games: [],
  itemFullInfo: {},
  pageCount: 0,
}

export default function (state = initialState, action) {
  const { results, total_pages, count } = action.payload || {};

  switch (action.type) {
    case GET_MOVIES_TV:
      return {
        ...state,
        pageCount: total_pages,
        [action.category]: results,
      }

    case GET_GAMES:
      return {
        ...state,
        pageCount: (count / 18).toFixed(),
        games: results,
      }

    case GET_FULL_ITEM:
      return {
        ...state,
        itemFullInfo: action.payload,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}