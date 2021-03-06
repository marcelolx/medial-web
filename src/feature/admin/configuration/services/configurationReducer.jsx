import {
  GET_CONFIGURACAO,
  GET_CONFLITOS,
  GET_CONFIGURACAO_ERROR,
  GET_CONFLITOS_ERROR,
  GET_CONFIGURACAO_CONFLITOS,
  GET_CONFIGURACAO_CONFLITOS_ERROR,
  GET_CONFIGURACAO_ASSUNTOS,
  GET_CONFIGURACAO_ASSUNTOS_ERROR
} from './configurationActionType';

const initialState = {
  conflitos: [],
  assuntos: [],
  conflitosAssuntos: [],
  message: [],
}

export default function (state, action) {

  switch (action.type) {
    case GET_CONFIGURACAO:
      return Object.assign({}, state, {
        ...state,
        conflitos: action.payload.data.conflitos,
        assuntos: action.payload.data.assuntos,
      });
    case GET_CONFIGURACAO_ERROR:
      return Object.assign({}, state, {
        assuntos: [],
        conflitos: [],
        message: action.payload.message,
      });
    case GET_CONFLITOS:
      return Object.assign({}, state, {
        ...state,
        conflitosAssuntos: action.payload,

      });
    case GET_CONFLITOS_ERROR:
      return Object.assign({}, state, {
        ...state,
        conflitosAssuntos: [],
        message: action.payload.message,

      });
    case GET_CONFIGURACAO_CONFLITOS:
      return Object.assign({}, state, {
        ...state,
        conflitos: action.payload
      });
    case GET_CONFIGURACAO_CONFLITOS_ERROR:
      return Object.assign({}, state, {
        conflitos: [],
        message: action.payload.message,
      });

    case GET_CONFIGURACAO_ASSUNTOS:
      return Object.assign({}, state, {
        ...state,
        assuntos: action.payload
      });
    case GET_CONFIGURACAO_ASSUNTOS_ERROR:
      return Object.assign({}, state, {
        assuntos: [],
        message: action.payload.message,
      });
    default:
      return initialState;
  }
}