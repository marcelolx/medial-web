import { GET_CONFLITOS_COMPLETE, GET_CONFLITOS_ERROR, GET_ASSUNTOS_COMPLETE, GET_ASSUNTOS_ERROR, CLEAR_ASSUNTOS } from './assuntosActionTypes';

const initialState = {
  conflitos: [],
  assuntos: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONFLITOS_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        conflitos: action.payload,
      });
    case GET_CONFLITOS_ERROR: 
      return Object.assign({}, state, {
        conflitos: [],
        assuntos: [],
      });
    case GET_ASSUNTOS_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        assuntos: action.payload
      });
    case GET_ASSUNTOS_ERROR:
      return Object.assign({}, state, {
        ...state,
        assuntos: [],
      });
    case CLEAR_ASSUNTOS: 
      return Object.assign({}, state, {
        ...state,
        assuntos: [],
      })
    default:
      return state;
  }
}