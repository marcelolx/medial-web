import { API } from "../../API";
import { LOGIN_COMPLETE, LOGOUT_COMPLETE,LOGIN_ERROR_UPDATE } from "./actionTypes";
import { LOGIN_ERROR , } from '../../errors/actionTypes';

export function login(email, password) {
  return function(dispatch) {
    return API.post('/usuario/realizarLogin', {email: email, senha: password})
      .then(response => {
        dispatch(loginComplete(response.data))
      })
      .catch(err => {
        dispatch(loginError(err))
      })
  }
}

function loginComplete(response) {

  return {
    type: LOGIN_COMPLETE,
    payload: response,
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutComplete());
  }
}

export function errorTrue() {
  return function(dispatch) {
    dispatch(errorTrueComplete())
  }
}
function errorTrueComplete() {
  return { type: LOGIN_ERROR_UPDATE }
}
function logoutComplete() {
  window.localStorage.removeItem('state');

  return { type: LOGOUT_COMPLETE }
}