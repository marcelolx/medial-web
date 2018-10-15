import { SAVE_MEDIATION_START, SAVE_MEDIATION_COMPLETE, SAVE_MEDIATION_ERROR, CLEAR_MEDIATION_STATE } from "./actionTypes";
import getAdaptedMessage from '../messages';

const initialState = { 
  id: 0,
  protocolo: '',
  errorCode: '',
  mensagem: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_MEDIATION_START: 
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        errorCode: '',
        mensagem: 'Solicitando mediação...'
      })
    case SAVE_MEDIATION_COMPLETE: 
      return Object.assign({}, state, {
        ...action.payload,
        errorCode: '',
        mensagem: 'Mediação solicitada com sucesso!'
      })
    case SAVE_MEDIATION_ERROR: 
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        errorCode: action.payload.message,
        mensagem: getAdaptedMessage(action.payload.message)
      })
    case CLEAR_MEDIATION_STATE:
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        errorCode: '',
        mensagem: '',
      })
    default: 
      return state;
  }
}
