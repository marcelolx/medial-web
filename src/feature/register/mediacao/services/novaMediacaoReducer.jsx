import { SAVE_MEDIATION_START, SAVE_MEDIATION_COMPLETE, SAVE_MEDIATION_ERROR, CLEAR_MEDIATION_STATE } from './novaMediacaoActionTypes';
import getAdaptedMessage from '../../../admin/mediacao/utils/mediacaoMessagesHelper';
import NovaMediacaoConstants from '../utils/novaMediacaoConstants';


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
        mensagem: NovaMediacaoConstants.SOLICITANDO_MEDIACAO
      })
    case SAVE_MEDIATION_COMPLETE: 
      return Object.assign({}, state, {
        ...action.payload,
        errorCode: '',
        mensagem: NovaMediacaoConstants.MEDIACAO_SOLICITADA
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
