import API from '../../../../services/API';
import { BUSCAR_MEDIACOES_START, BUSCAR_MEDIACOES_ERROR, BUSCAR_MEDIACOES_COMPLETE } from './mediacoesActionTypes';

export function buscarMediacoes(idUsuario) {
  return function(dispatch) {
    dispatch(buscarMediacoesStart());

    return API.get(`/mediacao/todas?idUsuario=${idUsuario}`)
      .then(response => {
        dispatch(buscarMediacoesComplete(response))
      })
      .catch(error => {
        dispatch(buscarMediacoesError(error))
      })
  }
}

function buscarMediacoesStart() {
  return { type: BUSCAR_MEDIACOES_START }
}

function buscarMediacoesComplete(response) { 
  return {
    type: BUSCAR_MEDIACOES_COMPLETE,
    payload: response.data
  }
}

function buscarMediacoesError(error) {
  return { 
    type: BUSCAR_MEDIACOES_ERROR,
    payload: error
  }
}