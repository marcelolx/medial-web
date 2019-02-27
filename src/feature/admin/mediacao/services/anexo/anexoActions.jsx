import { BUSCAR_ANEXO_COMPLETE, BUSCAR_ANEXO_START, BUSCAR_ANEXO_ERROR, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL, UPLOAD_FILE_CLEAR,UPLOAD_FILE_START } from './anexoActionTypes';
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
    dispatch({ type: UPLOAD_FILE_START })
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', idMediacao);

    API.post('/mediacao/uploadFile', formData)
      .then(response => {
        dispatch(uploadFileSucess(response))
        dispatch(adquirirAnexos(idMediacao))
      })
      .catch(err => {
        dispatch(uploadFileFail())
      });
  }
}

export function fileUploadClear (file, idMediacao) {
  return function (dispatch) {

    dispatch({ type: UPLOAD_FILE_CLEAR })

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