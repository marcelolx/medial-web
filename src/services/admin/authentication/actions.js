import { API } from "../../API";
import { LOGIN_COMPLETE, LOGOUT_COMPLETE } from "./actionTypes";
import { LOGIN_ERROR } from '../../errors/actionTypes';
import { clear, add } from "react-redux-permissions/dist/actions";

export function login(email, password) {
  return function(dispatch) {
    return API.post('/usuario/realizarLogin', {email: email, senha: password})
      .then(response => {
        dispatch(setUserPermissions(response.data));
        dispatch(loginComplete(response.data))
      })
      .catch(err => {
        dispatch(loginError(err))
      })
  }
}

export function validacaoEmail(data) {
  return function(dispatch) {
    return API.post('/usuario/validar', data)
      .then(response => {
        dispatch(setUserPermissions(response.data));
        dispatch(loginComplete(response.data))
      })
      .catch(err => {
        dispatch(loginError(err))
      })
  }
}


function loginComplete(response) {
  console.log('loginComplete');
  console.log(response);

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

function setUserPermissions(response) {
  return function(dispatch) {
    console.log(response.nivelAcesso);    
    dispatch(add("99"));
  }  
}

export function logout() {
  return function(dispatch) {
    dispatch(removeUserPermissions());
    dispatch(logoutComplete());
  }
}

function removeUserPermissions() {
  return function(dispatch) {
    dispatch(clear());
  }
}

function logoutComplete() {
  window.localStorage.removeItem('state');

  return { type: LOGOUT_COMPLETE }
}