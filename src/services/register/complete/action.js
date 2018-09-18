import { REGISTER_COMPLETE, REGISTER_FAIL } from './actionTypes';

export function completeRegister(message) {
  return {
    type: REGISTER_COMPLETE,
    payload: {
      message: message,
    }
  }
}

export function failRegister(message) {
  return {
    type: REGISTER_FAIL,
    payload: {
      message: message,
    }
  }
}