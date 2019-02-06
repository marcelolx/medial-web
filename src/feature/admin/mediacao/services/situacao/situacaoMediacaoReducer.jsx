import { BUSCAR_MEDIACAO_SITUACAO_START, BUSCAR_MEDIACAO_SITUACAO_COMPLETE, BUSCAR_MEDIACAO_SITUACAO_ERROR } from './situacaoMediacaoActionTypes';
import { Object } from 'core-js';

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFail: false,
  failMessage: '',
  idMediacao: 0,
  idMediador: 0,
  situacao: '',
  nomeRequerente: '',
  nomeRequerido: 'Não cadastrado',
  nomeMediador: 'Não definido',
  nomeNegociador: 'Não definido'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_MEDIACAO_SITUACAO_START:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
        isLoaded: false,
        isFail: false,
        failMessage: '',
        idMediacao: 0,
        idMediador: 0,
        situacao: '',
        nomeRequerente: '',
        nomeRequerido: 'Não cadastrado',
        nomeMediador: 'Não definido',
        nomeNegociador: 'Não definido'
      })
    case BUSCAR_MEDIACAO_SITUACAO_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        ...action.payload
      })
    case BUSCAR_MEDIACAO_SITUACAO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message
      })
    default:
      return state;
  }
}