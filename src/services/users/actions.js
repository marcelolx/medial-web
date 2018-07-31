import { USER_LOGIN, UPDATE_PROFILE, USER_LOGOUT } from './actionTypes';
import { FORM_SUBMIT_FAIL } from '../erros/actionTypes';

import axios from '../axios';

export const login = formData => dispatch => {
             //TODO: Setar correto ainda
  axios.post('/users/login', formData)
    .then(res => {
      const { status, message, name, email, profile, birthDate, createdDate, updatedDate, token } = res.data;

      if (status !== true) {
        return dispatch({
          type: FORM_SUBMIT_FAIL,
          payload: {
            status,
            message,
          },
        })
      }

      const payload = {
        name,
        email,
        profile,
        birthDate,
        createdDate,
        updatedDate,
        token,
      }

      return dispatch({
        type: USER_LOGIN,
        payload,
      });
    })
    .catch(erro => console.log(erro));
}