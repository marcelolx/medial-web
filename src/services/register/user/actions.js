import { FILL_USER_DATA } from './actionTypes';

export function saveUserRegisterData(formData) {
  return {
    type: FILL_USER_DATA,
    payload: formData,
  }
}