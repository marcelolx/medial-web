import { BUSCAR_MEDIACAO_START, BUSCAR_MEDIACAO_COMPLETE, BUSCAR_MEDIACAO_ERROR } from './actionTypes';
import API from '../../API';
import { buscarSituacaoMediacao } from './situacao/actions';

export function buscarMediacao(idMediacao) {
  return function(dispatch) {
    dispatch(buscarMediacaoStart());
    return API.get(`/mediacao/${idMediacao}`)
      .then(response => {
        dispatch(buscarMediacaoComplete(response));
        dispatch(buscarSituacaoMediacao(idMediacao));
      })
      .catch(error => {
        dispatch(buscarMediacaoError(error.response))
      });
  }
}

function buscarMediacaoStart() {
  return { type: BUSCAR_MEDIACAO_START };
}

function buscarMediacaoComplete(response) {  
  return {
    type: BUSCAR_MEDIACAO_COMPLETE,
    payload: response.data
  }
}

function buscarMediacaoError(error) {
  return {
    type: BUSCAR_MEDIACAO_ERROR,
    payload: error.data
  }
}