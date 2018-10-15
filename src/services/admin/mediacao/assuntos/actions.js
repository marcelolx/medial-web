import { GET_ASSUNTOS_COMPLETE, GET_ASSUNTOS_ERROR, GET_CONFLITOS_COMPLETE, GET_CONFLITOS_ERROR, CLEAR_ASSUNTOS } from './actionTypes';
import { API } from '../../../API';

export function getConflitos() {
  return function(dispatch) {
    return API.get(`/assunto/getConflitos`)
      .then(response => {
        dispatch(getConflitosComplete(response.data))
      })
      .catch(err => {
        dispatch(getConflitosError(err))
      });
  }
}

function getConflitosComplete(data) {
  const _data = mapArrayToSearchSelectArray(data);

  return {
    type: GET_CONFLITOS_COMPLETE,
    payload: _data
  }
}

function mapArrayToSearchSelectArray(data) {
  return data.map(item => ({
    value: item.id,
    label: item.descricao
  }));
}

function getConflitosError(erro) {
  return { 
    type: GET_CONFLITOS_ERROR,
    payload: erro
  }
}

export function getAssuntos(conflito) {
  return function(dispatch) {
    return API.get(`/assunto/getAssuntos?idConflito=${conflito}`)
      .then(response => dispatch(getAssuntosComplete(response.data)))
      .catch(err => dispatch(getAssuntosError(err)));
  }
}

function getAssuntosComplete(data) {
  const _data = mapArrayToSearchSelectArray(data);

  return {
    type: GET_ASSUNTOS_COMPLETE,
    payload: _data
  }
}

function getAssuntosError(erro) {
  return {
    type: GET_ASSUNTOS_ERROR,
    payload: erro
  }
}

export function clearAssuntos() {
  return { type: CLEAR_ASSUNTOS };
}