import {
  TOGGLE_MODAL,
} from '../actions/types'


const initialState = {
  isModalOpen: false,
  errorBody: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: action.payload.isOpen,
        errorBody: action.payload.err
      }

    default:
      return state
  }
}