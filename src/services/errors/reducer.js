import { FORM_SUBMIT_FAIL, USER_REGISTER_FAIL } from './actionTypes';
import getAdaptedMessage from './messages';

const initialState = {
  status: '',
  message: '',
  adaptedMessage: '',
}

export default function(state = initialState, action){

  switch(action.type){
    case FORM_SUBMIT_FAIL:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case USER_REGISTER_FAIL:
      return Object.assign({}, state, {
        status: action.payload.status,
        message: action.payload.message,
        adaptedMessage: getAdaptedMessage(action.payload.message),
      });
    default:
      return state;
  }
}