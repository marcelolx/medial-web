import { BUSCAR_ANEXO_COMPLETE,BUSCAR_ANEXO_START,BUSCAR_ANEXO_ERROR } from './anexoActionTypes';
import API from '../../../../../core/http/API';



export function adquirirAnexos(idMediacao) {
  return function (dispatch) {
    dispatch(buscarAnexosStart());
    return API.get(`/mediacao/${idMediacao}/filesMediacao`)
      .then(response => {
        dispatch(buscarAnexosComplete(response));
      })
      .catch(error => {
        dispatch(buscarAnexosError(error))
      });
  }
}

function buscarAnexosStart() {
  return { type: BUSCAR_ANEXO_START };
}


function buscarAnexosComplete(response) {
  return {
    type: BUSCAR_ANEXO_COMPLETE,
    payload: response.data
  }
}

function buscarAnexosError(error) {
  return {
    type: BUSCAR_ANEXO_ERROR,
    payload: error.response.data
  }
}