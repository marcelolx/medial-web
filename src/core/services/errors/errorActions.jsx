import { CLEAR_ERRORS, LOGIN_ERROR } from './errorActionTypes';
import { SENHA_EXIGE_8_DIGITOS } from '../../../feature/register/user/utils/registerUserMessagesHelper';

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function digitosSenhaInsuficientes() {
  return { type: SENHA_EXIGE_8_DIGITOS }
}

export function loginError() {
  return { type: LOGIN_ERROR }
}