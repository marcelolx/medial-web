import { LOGIN_COMPLETE, LOGOUT_COMPLETE,UNAUTHORIZED } from "./actionTypes";

const initialState = {
  token: null,
  id: null,
  accessLevel: null,
  isAuthenticated: false,
  message: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_COMPLETE: 
      return Object.assign({}, state, {
        token: action.payload.token,
        id: action.payload.id,
        accessLevel: action.payload.nivelAcesso,
        isAuthenticated: true,
        message: null,
      });
      case LOGOUT_COMPLETE: 
      return Object.assign({}, state, {
        token: null,
        id: null,
        accessLevel: null,
        isAuthenticated: false,
        message: 'Você saiu com sucesso do sistema',
      }); 
      case UNAUTHORIZED: 
        return Object.assign({}, state, {
          token: null,
          id: null,
          accessLevel: null,
          isAuthenticated: false,
          message: 'Você não está autorizado a acessar essa página',
        });
    default:
      return state
  }
}