import {
  GET_COLLECTIONS,
  GET_GENRES,
  UPDATE_COLLECTIONS,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
  GET_COLLECTIONS_FROM_CATEGORY,
} from '../actions/types'

const initialState = {
  moviesGenres: [],
  collections: [],
  categoryCollections: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
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

    case CREATE_COLLECTION:
      return {
        ...state,
        collections: [...state.collections, action.payload],
        categoryCollections: [...state.categoryCollections, action.payload],
      }

    case UPDATE_COLLECTION:
      return {
        ...state
      }

    case DELETE_COLLECTION:
      console.log(action)
      return {
        ...state,
        categoryCollections: state.categoryCollections.filter(item => {
          return item.id !== action.payload
        })
      }

    case GET_COLLECTIONS_FROM_CATEGORY:
      return {
        ...state,
        categoryCollections: action.payload,
      }

    default:
      return state
  }
}