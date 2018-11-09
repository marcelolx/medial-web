import { BUSCAR_MEDIACAO_SITUACAO_START, BUSCAR_MEDIACAO_SITUACAO_COMPLETE, BUSCAR_MEDIACAO_SITUACAO_ERROR } from './actionTypes';
import API from '../../../API';

export function buscarSituacaoMediacao(idMediacao) {
  return function(dispatch) {
    dispatch(buscarSituacaoMediacaoStart())
    return API.get(`/mediacao/situacao/${idMediacao}`)
      .then(response => {
        dispatch(buscarSituacaoMediacaoComplete(response))
      })
      .catch(error => {
        dispatch(buscarSituacaoMediacaoError(error.response))
      });
  }
}

function buscarSituacaoMediacaoStart() {
  return { type: BUSCAR_MEDIACAO_SITUACAO_START }
}

function buscarSituacaoMediacaoComplete(response) {
  return {
    type: BUSCAR_MEDIACAO_SITUACAO_COMPLETE,
    payload: response.data
  }
}

function buscarSituacaoMediacaoError(error) {
  console.log(error);
  return {
    type: BUSCAR_MEDIACAO_SITUACAO_ERROR,
    payload: error.data
  }
}