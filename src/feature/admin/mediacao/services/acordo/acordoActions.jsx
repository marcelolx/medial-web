import { SALVAR_ACORDO_COMPLETE, SALVAR_ACORDO_START, SALVAR_ACORDO_ERROR,BUSCAR_ACORDO_COMPLETE, BUSCAR_ACORDO_START, BUSCAR_ACORDO_ERROR } from './acordoActionTypes';
import API from '../../../../../core/http/API';



export function proporAcordo(data) {
  return function (dispatch) {
    dispatch(proporAcordoStart());
    return API.post(`/mediacao/proporAcordo`, data)
      .then(response => {
        dispatch(proporAcordoComplete(response));
      })
      .catch(error => {
        dispatch(proporAcordoError(error))
      });
  }
}


function proporAcordoStart() {
  return { type: SALVAR_ACORDO_START };
}


function proporAcordoComplete(response) {
  return {
    type: SALVAR_ACORDO_COMPLETE,
    payload: response.data
  }
}

function proporAcordoError(error) {
  return {
    type: SALVAR_ACORDO_ERROR,
    payload: error.response.data
  }
}


export function buscarAcordo(codigoAcordo) {
  return function (dispatch) {
    dispatch(buscarAcordoStart());
    return API.get(`/mediacao/acordo/${codigoAcordo}`)
      .then(response => {
        dispatch(buscarAcordoComplete(response));
      })
      .catch(error => {
        dispatch(buscarAcordoError(error))
      });
  }
}

function buscarAcordoStart() {
  return { type: BUSCAR_ACORDO_START };
}


function buscarAcordoComplete(response) {
  return {
    type: BUSCAR_ACORDO_COMPLETE,
    payload: response.data
  }
}

function buscarAcordoError(error) {
  return {
    type: BUSCAR_ACORDO_ERROR,
    payload: error.response.data
  }
}