import { API } from "../../API";
import { REMOVER_NEGOCIADOR_COMPLETE,
   REMOVER_NEGOCIADOR_ERROR,
   ADICIONAR_NEGOCIADOR_COMPLETE,
   ADICIONAR_NEGOCIADOR_ERROR,
   ADQUIRIR_NEGOCIADORES_COMPLETE,
   ADQUIRIR_NEGOCIADORES_ERROR } from "./actionTypes";

export function removerNegociador(empresa, negociador) {
  const config = {data: 
        {empresa: empresa, negociador: negociador}};
  return function(dispatch) {
    return API.delete('/empresa/negociador',config )
      .then(response => {
        dispatch(removerNegociadorComplete(response.data))
      })
      .catch(err => {
        dispatch(removerNegociadorError(err))
      })
  }
}

function removerNegociadorComplete(response) {

  return {
    type: REMOVER_NEGOCIADOR_COMPLETE,
    payload: response,
  }
}

function removerNegociadorError(error) {
  return {
    type: REMOVER_NEGOCIADOR_ERROR,
    payload: error,
  }
}

export function adicionarNegociador(empresa, negociador) {
  return function(dispatch) {
    return API.put('/empresa/negociador', {empresa: empresa, negociador: negociador})
      .then(response => {
        dispatch(adicionarNegociadorComplete(response.data))
      })
      .catch(err => {
        dispatch(adicionarNegociadorError(err))
      })
  }
}

function adicionarNegociadorComplete(response) {

  return {
    type: ADICIONAR_NEGOCIADOR_COMPLETE,
    payload: response,
  }
}

function adicionarNegociadorError(error) {
  return {
    type: ADICIONAR_NEGOCIADOR_ERROR,
    payload: error,
  }
}


export function adquirirNegociadores() {
  return function(dispatch) {
    return API.get('/empresa/negociadores')
      .then(response => {
        dispatch(adquirirNegociadoresComplete(response.data))
      })
      .catch(err => {
        dispatch(adquirirNegociadoresError(err))
      })
  }
}

function adquirirNegociadoresComplete(response) {

  return {
    type: ADQUIRIR_NEGOCIADORES_COMPLETE,
    payload: response,
  }
}

function adquirirNegociadoresError(error) {
  return {
    type: ADQUIRIR_NEGOCIADORES_ERROR,
    payload: error,
  }
}