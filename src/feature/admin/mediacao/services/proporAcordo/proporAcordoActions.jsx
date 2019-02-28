import { SALVAR_ACORDO_COMPLETE, SALVAR_ACORDO_START, SALVAR_ACORDO_ERROR } from './proporAcordoActionTypes';
import API from '../../../../../core/http/API';



export function proporAcordo( data) {
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