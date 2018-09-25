import { FORM_SUBMIT_FAIL, USER_REGISTER_FAIL, CLEAR_ERRORS, LOGIN_ERROR, UNAUTHORIZED } from './actionTypes';
import getAdaptedMessage, { SENHA_EXIGE_8_DIGITOS } from '../register/user/messages';

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
    case CLEAR_ERRORS: 
      return Object.assign({}, state, {
        status: '',
        message: '',
        adaptedMessage: '',
      });
    case SENHA_EXIGE_8_DIGITOS: 
      return Object.assign({}, state, {
        status: '',
        message: SENHA_EXIGE_8_DIGITOS,
        adaptedMessage: getAdaptedMessage(SENHA_EXIGE_8_DIGITOS),
      });
    case LOGIN_ERROR: 
      return Object.assign({}, state, {
        status: '',
        message: LOGIN_ERROR,
        adaptedMessage: 'Usuário ou senha inválidos',
      });
    case LOGIN_ERROR: 
      return Object.assign({}, state, {
        status: '',
        message: UNAUTHORIZED,
        adaptedMessage: 'Você não está autorizado ',
      });
    default:
      return state;
  }
}