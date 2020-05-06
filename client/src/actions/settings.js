import {
  TOGGLE_MODAL,
} from './types';

export const toggleModal = (isOpen, text) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: {
      isOpen,
      text,
    },
  });
};
