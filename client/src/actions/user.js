import axios from 'axios'
import history from '../history';

import {
  USER_SIGN_IN,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_VERIFY,
  USER_GET,
  TOGGLE_MODAL,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  TOGGLE_LOADER,
} from './types'

import {
  LOGIN_URL,
  SIGN_IN_URL,
  LOGOUT_URL,
  VERIFY_URL,
  FETCH_CURRENT_USER_URL,
} from '../config/constants';

export const login = user => dispatch => {
  dispatch({
    type: TOGGLE_LOADER,
    payload: true,
  });

  axios.post(LOGIN_URL, user)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: USER_LOG_IN,
          token: data.token,
          payload: data.user,
        })
        localStorage.setItem('token', data.token);
        history.push('/home');
      } else {
        dispatch({
          type: USER_SIGN_IN_ERROR,
          payload: data.message,
        })
      }

      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      });
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      })

      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      });
    })
}

export const register = user => dispatch => {
  if (user.password !== user.passwordConfirm) {
    dispatch({
      type: USER_SIGN_IN_ERROR,
      payload: "Passwords do not match.",
    })

    return false;
  }

  dispatch({
    type: TOGGLE_LOADER,
    payload: true,
  });

  axios.post(SIGN_IN_URL, user)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: USER_SIGN_IN_SUCCESS,
          payload: "You have registered successfully! Now you can login",
        })

        history.push('/login');
      } else {
        dispatch({
          type: USER_SIGN_IN_ERROR,
          payload: data.message,
        })
      }

      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      });
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      });

      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      })
    })
}

export const logout = token => dispatch => {
  axios.get(LOGOUT_URL(token))
    .then(() => {
      dispatch({
        type: USER_LOG_OUT,
      });

      localStorage.removeItem('token');
      history.push('/home');
    })
    .catch(err => {
      dispatch({
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          err,
        }
      })
    })
}

export const verifyUser = token => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get(VERIFY_URL(token))
      .then(({ data }) => {
        if (data.success) {
          dispatch({
            type: USER_VERIFY,
            payload: data.id,
          })

          dispatch(userGet(data.id));
        }
        resolve(data)
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
  })
}

export const userGet = userId => dispatch => { //get current user data
  return new Promise((resolve, reject) => {
    axios.get(FETCH_CURRENT_USER_URL(userId))
      .then(res => {
        const user = res.data
        const { data } = user;
        dispatch({
          type: USER_GET,
          payload: data,
        })
        resolve(res)
      })
      .catch(err => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            isOpen: true,
            err,
          }
        })
      })
  })
}