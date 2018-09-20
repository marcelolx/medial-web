import { USER_LOGIN, UPDATE_PROFILE, USER_LOGOUT, USER_REGISTER } from './actionTypes';
import { FORM_SUBMIT_FAIL, FORM_SUBMIT_ERROR } from '../errors/actionTypes';

import {instance as axios} from '../axios';

export const cadastrarUsuario = formData => dispatch => {
  axios.post('/usuario/cadastrar', formData)
    .then(response => {
      const { status, message } = response.data;
      
      if (status !== null) {
        return {
          type: FORM_SUBMIT_FAIL,
          payload: {
            status,
            message,
          }
        }
      } else {
        return {
          type: USER_REGISTER,
          payload: {
            status,
            message,
          }
        }
      }
    })
    .catch(err => {
      const { status, message } = err.data;

      return {
        type: FORM_SUBMIT_ERROR,
        payload: {
          status,
          message,
        }
      }
    });
}


export const login = formData => dispatch => {
  axios.post('/usuario/realizarLogin', formData)
    .then(response => {
      const { nome, message } = response.data;

      if (nome === null) {
        return dispatch({
          type: FORM_SUBMIT_FAIL,
          payload: {
            nome,
            message,
          },
        })
      }

      const payload = {
        nome,
        message
      }

      return dispatch({
        type: USER_LOGIN,
        payload,
      });
    })
    .catch(err => console.log(err));
}

export const validarConfirmacao = formData => dispatch => {
  axios.post('/usuario/validar', formData)
    .then(response => {
    })
    .catch(err => {
     
    });
}


export const updateProfile = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/users/update', formData, config)
  .then(response => {
    const { name, email, profile, birthDate, createdDate, updatedDate, token } = response.data;

    const payload = {
      name,
      email,
      profile,
      birthDate,
      createdDate,
      updatedDate,
      token,
    }

    return dispatch({
      type: UPDATE_PROFILE,
      payload,
    });

  })
  .catch(err => console.log(err));
      
}

export const logout = formData => dispatch => {
  window.localStorage.removeItem('state');
  return dispatch({
    type: USER_LOGOUT,
    payload: {}
  });
}