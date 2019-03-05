import {
  SALVAR_ACORDO_START,
  SALVAR_ACORDO_ERROR,
  SALVAR_ACORDO_COMPLETE,
  BUSCAR_ACORDO_COMPLETE,
  LOADING_START,
  BUSCAR_ACORDO_ERROR,
  APROVAR_ACORDO_COMPLETE,
  APROVAR_ACORDO_ERROR
} from './acordoActionTypes';
import { Object } from 'core-js';

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFail: false,
  failMessage: '',
  proposta: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SALVAR_ACORDO_START:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
        isLoaded: false,
        isFail: false,
        failMessage: ''
      })
    case SALVAR_ACORDO_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        isFail: false,
        failMessage: ''
      })
    case SALVAR_ACORDO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message
      })
    case LOADING_START:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
        isLoaded: false,
        isFail: false,
        failMessage: '',
        proposta: ''
      })
    case BUSCAR_ACORDO_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        isFail: false,
        failMessage: '',
        proposta: action.payload.descricao
      })
    case BUSCAR_ACORDO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message,
        proposta: ''
      })
    default:
      return state;
  }
}