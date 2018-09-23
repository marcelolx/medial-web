import { API } from "../../API";
import {  VALIDAR_COMPLETE } from "./actionTypes";

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