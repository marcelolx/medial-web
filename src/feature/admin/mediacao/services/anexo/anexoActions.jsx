import { BUSCAR_ANEXO_COMPLETE, BUSCAR_ANEXO_START, BUSCAR_ANEXO_ERROR,UPLOAD_FILE_SUCCESS,UPLOAD_FILE_FAIL } from './anexoActionTypes';
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

export function uploadFileMediacao(file, idMediacao) {
  return function (dispatch) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', idMediacao);

    API.post('/mediacao/uploadFile', formData)
      .then(response => {
        dispatch(uploadFileSucess(response))
      })
      .catch(err => {
        dispatch(uploadFileFail())
      });
  }
}


function uploadFileSucess(response) {
  return { type: UPLOAD_FILE_SUCCESS, payload: response.data, }
}

function uploadFileFail() {
  return { type: UPLOAD_FILE_FAIL }
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