import { API } from '../../../../core/http/API';
import {
  SAVE_MEDIATION_START,
  SAVE_MEDIATION_COMPLETE,
  SAVE_MEDIATION_ERROR,
  CLEAR_MEDIATION_STATE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL
} from './novaMediacaoActionTypes';

export function cadastrar(data, dataFiles) {

  return function (dispatch) {
    dispatch(startSaveMediation());

    return API.post('/mediacao/cadastrar', data)
      .then(response => {
        dispatch(saveFiles(dataFiles, response));
        dispatch(saveMediationFinish(response))
      })
      .catch(err => {
        dispatch(saveMediationFail(err))
      });
  }
}


function saveFiles(dataFiles, response) {
  return function (dispatch) {

    if (dataFiles && dataFiles.length > 0) {
      for (let i = 0; i < dataFiles.length; i++) {
        const element = dataFiles[i];
        let formData = new FormData();
        formData.append('file', element);
        formData.append('id', response.data.id);

        API.post('/mediacao/uploadFile', formData)
          .then(response => {
            dispatch(uploadFileSucess(response))
          })
          .catch(err => {
            dispatch(uploadFileFail())
          });

      }
    }

  }
}

function uploadFileSucess(response) {
  return { type: UPLOAD_FILE_SUCCESS, payload: response.data, }
}

function uploadFileFail() {
  return { type: UPLOAD_FILE_FAIL }
}

function startSaveMediation() {
  return { type: SAVE_MEDIATION_START }
}

function saveMediationFinish(response) {
  return {
    type: SAVE_MEDIATION_COMPLETE,
    payload: response.data,
  }
}

function saveMediationFail(error) {
  return {
    type: SAVE_MEDIATION_ERROR,
    payload: error
  }
}

export function clearMediationState() {
  return { type: CLEAR_MEDIATION_STATE }
}