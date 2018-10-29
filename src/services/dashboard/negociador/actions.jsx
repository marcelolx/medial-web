import { API } from "../../API";
import { REMOVER_NEGOCIADOR_COMPLETE, REMOVER_NEGOCIADOR_ERROR,ADICIONAR_NEGOCIADOR_COMPLETE,ADICIONAR_NEGOCIADOR_ERROR } from "./actionTypes";

export function removerNegociador(empresa, negociador) {
  return function(dispatch) {
    return API.delete('/empresa/negociador', {empresa: empresa, negociador: negociador})
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