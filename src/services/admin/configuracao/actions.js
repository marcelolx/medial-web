import { GET_USERS, GET_USERS_ERROR, CLEAR_USERS } from './actionType';
import { API } from '../../../services/API';

function mapUsers( users){
  return {
    type: GET_USERS,
    payload: {
      users: users,
    },
  };
};

function getUserError(erro) {
  return {
    type: GET_USERS_ERROR,
    payload: erro,
  };
};


export function getStateUsers(state){

 return function(dispatch) {
    return API.get('/admin/usuarios/adquirir')
      .then(response => {
        dispatch(mapUsers(response.data));
      })
      .catch(erro => {
        dispatch(getUserError(erro));
      });
  };
};

export function clearUsers(){
  return { type: CLEAR_USERS };
}