import { REMOVER_NEGOCIADOR_ERROR, REMOVER_NEGOCIADOR_COMPLETE, ADQUIRIR_NEGOCIADORES_ERROR,ADQUIRIR_NEGOCIADORES_COMPLETE,CARREGANDO} from "./actionTypes";

const initialState = {
  negociadores: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVER_NEGOCIADOR_ERROR: 
      return Object.assign({}, state, {
      });
    case REMOVER_NEGOCIADOR_COMPLETE: 
      return Object.assign({}, state, {
      }); 
    case ADQUIRIR_NEGOCIADORES_ERROR: 
      return Object.assign({}, state, {
        ...state,
        negociadores: [],
        error: action.payload.message,
        carregando: false,
      });
    case ADQUIRIR_NEGOCIADORES_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        negociadores: action.payload,
        carregando: false,
      }); 
    case CARREGANDO:
      return Object.assign({}, state, {
        ...state,
        true: false,
      }); 
    default:
      return state
  }
}