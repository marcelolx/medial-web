import { REGISTER_COMPLETE, REGISTER_FAIL } from './registerUserCompleteActionTypes';
import getAdaptedMessage from '../../utils/registerUserMessagesHelper';

const initialState = {
  complete: false,
  error: false,
  message: {'step':0,'message': ''},
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_COMPLETE:
      return Object.assign({}, state, {
        complete: true,
        error: false,
        message: 'Cadastro efetuado com sucesso!',
      });
    case REGISTER_FAIL: 
      return Object.assign({}, state, {
        complete: true,
        error: true,
        message: getAdaptedMessage(action.payload.message),
      });
    default: 
      return state;
  }
}