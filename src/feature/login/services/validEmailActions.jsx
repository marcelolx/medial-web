import { API } from '../../../core/http/API';
import {  VALIDAR_COMPLETE } from './validEmailActionTypes';

export function validacaoEmail(data) {
  return function(dispatch) {
    return API.post('/usuario/validar', data)
      .then(response => {
        dispatch(validarEmailComplete(response.data))
      })
      .catch(err => {
        return;
      })
  }
}

function validarEmailComplete(response) {
  return {
    type: VALIDAR_COMPLETE,
    payload: response,
  }
}