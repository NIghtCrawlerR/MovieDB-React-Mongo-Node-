import {
  TOGGLE_MODAL,
  TOGGLE_LOADER,
} from '../actions/types';


const initialState = {
  isModalOpen: false,
  errorBody: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case TOGGLE_MODAL:
    return {
      ...state,
      isModalOpen: action.payload.isOpen,
      errorBody: action.payload.err,
    };

  case TOGGLE_LOADER:
    return {
      ...state,
      showLoader: action.payload,
    };

  default:
    return state;
  }
}
