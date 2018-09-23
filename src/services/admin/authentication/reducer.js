import { LOGIN_COMPLETE, LOGOUT_COMPLETE } from "./actionTypes";

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
        message: '',
      }); 
    default:
      return state
  }
}