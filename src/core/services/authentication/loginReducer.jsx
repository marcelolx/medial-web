import { LOGIN_COMPLETE, LOGOUT_COMPLETE,UNAUTHORIZED,LOGIN_ERROR_UPDATE } from "./actionTypes";
import { LOGIN_ERROR } from '../../errors/actionTypes';

const initialState = {
  token: null,
  id: null,
  accessLevel: null,
  isAuthenticated: false,
  message: '',
  nome: '',
  erroLogin: false,
}

export default function(state = initialState, action) {
  
  switch (action.type) {
    case LOGIN_COMPLETE: 
      return Object.assign({}, state, {
        token: action.payload.token,
        id: action.payload.id,
        accessLevel: action.payload.nivelAcesso,
        nome:  action.payload.nome || 'Usuário',
        isAuthenticated: true,
        erroLogin: false,
        message: null,
      });
      case LOGOUT_COMPLETE: 
      return Object.assign({}, state, {
        token: null,
        id: null,
        accessLevel: null,
        nome: '',
        isAuthenticated: false,
        message: 'Você saiu com sucesso do sistema',
        erroLogin: false,
      }); 
      case UNAUTHORIZED: 
        return Object.assign({}, state, {
          token: null,
          id: null,
          accessLevel: null,
          nome: '',
          isAuthenticated: false,
          message: 'Você não está autorizado a acessar essa página',
          erroLogin: false,
        });
      case LOGIN_ERROR:
        return Object.assign({}, state, {
          token: null,
          id: null,
          accessLevel: null,
          nome: '',
          isAuthenticated: false,
          message: 'Email e/ou senha incorretos',
          erroLogin: true,
        });
      case LOGIN_ERROR_UPDATE:
        return Object.assign({}, state, {
          ...state,
          message: '',
          erroLogin: false,
        });
    default:
      return state
  }
}