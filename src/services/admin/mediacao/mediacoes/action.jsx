import API from '../../../API';
import { BUSCAR_MEDIACOES_START, BUSCAR_MEDIACOES_ERROR, BUSCAR_MEDIACOES_COMPLETE } from './actionType';

export function buscarMediacoes(nivelAcesso, idUsuario) {
  return function(dispatch) {
    dispatch(buscarMediacoesStart());

    return API.get(`/mediacao/todas?nivelAcesso=${nivelAcesso}&idUsuario=${idUsuario}`)
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