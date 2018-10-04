import { SAVE_MEDIATION_START, SAVE_MEDIATION_COMPLETE, SAVE_MEDIATION_ERROR } from "./actionTypes";
import getAdaptedMessage from '../messages';

const initialState = { 
  id: 0,
  protocolo: '',
  mensagem: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_MEDIATION_START: 
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        mensagem: 'Solicitando mediação'
      })
    case SAVE_MEDIATION_COMPLETE: 
      return Object.assign({}, state, {
        ...action.payload
      })
    case SAVE_MEDIATION_ERROR: 
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        mensagem: getAdaptedMessage(action.payload.message)
      })
    default: 
      return state;
  }
}
