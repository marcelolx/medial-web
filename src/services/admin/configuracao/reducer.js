import { GET_CONFIGURACAO, GET_CONFIGURACAO_ERROR } from './actionType';

const initialState = {
  conflitos: [],
  assuntos: [],
  message: [],
}

export default function(state , action) { 
  
  switch (action.type) {
    case GET_CONFIGURACAO:
      return Object.assign({}, state, {
        conflitos: action.payload.data.conflitos,
        assuntos: action.payload.data.assuntos,
      });
    case GET_CONFIGURACAO_ERROR: 
      return Object.assign({}, state, {
        assuntos: [],
        conflitos: [],
        message: action.payload.message,
      });
    default:
      return initialState;
  }
}