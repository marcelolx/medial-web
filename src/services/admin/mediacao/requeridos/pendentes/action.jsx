import API from '../../../../API';
import { BUSCAR_REQUERIDOS_PENDENTES_START, BUSCAR_REQUERIDOS_PENDENTES_COMPLETE, BUSCAR_REQUERIDOS_PENDENTES_ERROR } from './actionTypes';


export function buscarRequeridosPendentes() {
  return function(dispatch) {
    dispatch(buscarRequeridosPendentesStart());
    return API.get('/mediacao/requeridospendentes')
      .then(response => {
        dispatch(buscarRequeridosPendentesComplete(response))
      })
      .catch(err => {
        dispatch(buscarRequeridosPendentesError(err))
      });
  }
}

function buscarRequeridosPendentesStart() {
  return { type: BUSCAR_REQUERIDOS_PENDENTES_START }
}

function buscarRequeridosPendentesComplete(response) {
  return {
    type: BUSCAR_REQUERIDOS_PENDENTES_COMPLETE,
    payload: response.data
  }
}

function buscarRequeridosPendentesError(error) {
  return {
    type: BUSCAR_REQUERIDOS_PENDENTES_ERROR,
    payload: error
  }
}