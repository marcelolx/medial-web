import { API } from '../../../../core/http/API';
import { SAVE_MEDIATION_START, SAVE_MEDIATION_COMPLETE, SAVE_MEDIATION_ERROR, CLEAR_MEDIATION_STATE } from './novaMediacaoActionTypes';

export function cadastrar(data) {
  console.log(data);
  
  return function(dispatch) {
    dispatch(startSaveMediation());

    return API.post('/mediacao/cadastrar', data)
      .then(response => {
        dispatch(saveMediationFinish(response))
      })
      .catch(err => {
        dispatch(saveMediationFail(err))
      });
  }
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