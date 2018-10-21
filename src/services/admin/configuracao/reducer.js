import { GET_USERS, GET_USERS_ERROR, CLEAR_USERS } from './actionType';

const initialState = {
  users: [],
  message: null,
}

export default function(state , action) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        users: action.payload.users,
      });
    case GET_USERS_ERROR: 
      return Object.assign({}, state, {
        users: [],
        message: 'Não foi possível buscar os usuários',
      });
    case CLEAR_USERS:
      return Object.assign({}, state, {
        users: [],
        message: null,
      });
    default:
      return initialState;
  }
}