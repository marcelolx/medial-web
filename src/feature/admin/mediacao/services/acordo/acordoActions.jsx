import {
  SALVAR_ACORDO_COMPLETE,
  SALVAR_ACORDO_START,
  SALVAR_ACORDO_ERROR,
  BUSCAR_ACORDO_COMPLETE,
  LOADING_START,
  BUSCAR_ACORDO_ERROR,
  CLEAR_REDUCER,
  BUSCAR_ACORDOS_MEDIACAO_ERROR,
  BUSCAR_ACORDOS_MEDIACAO_COMPLETE,
  APROVAR_ACORDO_COMPLETE,
  APROVAR_ACORDO_ERROR
} from './acordoActionTypes';
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
    dispatch(loadingStart());
    return API.get(`/mediacao/acordo/${codigoAcordo}`)
      .then(response => {
        dispatch(buscarAcordoComplete(response));
      })
      .catch(error => {
        dispatch(buscarAcordoError(error))
      });
  }
}

export function clear() {
  return function (dispatch) {
    dispatch({ type: CLEAR_REDUCER });
  }
}

export function adquirirAcordosMediacao(id) {
  return function (dispatch) {
    dispatch(loadingStart());
    return API.get(`/mediacao/${id}/acordos`)
      .then(response => {
        dispatch(buscarAcordosMediacaoComplete(response));
      })
      .catch(error => {
        dispatch(buscarAcordosMediacaoError(error))
      });
  }
}


function buscarAcordosMediacaoComplete(response) {
  return {
    type: BUSCAR_ACORDOS_MEDIACAO_COMPLETE,
    payload: response.data
  }
}

function buscarAcordosMediacaoError(error) {
  return {
    type: BUSCAR_ACORDOS_MEDIACAO_ERROR,
    payload: error.response.data
  }
}

function loadingStart() {
  return { type: LOADING_START };
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

export function aprovarAcordo(codigoAcordo) {
  return function (dispatch) {
    dispatch(loadingStart());
    return API.get(`/mediacao/aprovarAcordo/${codigoAcordo}`)
      .then(response => {
        dispatch(aprovarComplete(response));
      })
      .catch(error => {
        dispatch(aprovarError(error))
      });
  }
}

function aprovarComplete(response) {
  return {
    type: APROVAR_ACORDO_COMPLETE,
    payload: response.data
  }
}

function aprovarError(error) {
  return {
    type: APROVAR_ACORDO_ERROR,
    payload: error.response.data
  }
}
