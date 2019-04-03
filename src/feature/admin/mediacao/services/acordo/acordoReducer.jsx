import {
  SALVAR_ACORDO_START,
  SALVAR_ACORDO_ERROR,
  SALVAR_ACORDO_COMPLETE,
  BUSCAR_ACORDO_COMPLETE,
  LOADING_START,
  BUSCAR_ACORDO_ERROR,
  APROVAR_ACORDO_COMPLETE,
  CLEAR_REDUCER,
  BUSCAR_ACORDOS_MEDIACAO_ERROR,
  BUSCAR_ACORDOS_MEDIACAO_COMPLETE,
  APROVAR_ACORDO_ERROR
} from './acordoActionTypes';
import { Object } from 'core-js';

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFail: false,
  isFailAprovar: false,
  failMessage: '',
  proposta: '',
  dataProposta:{},
  acordos: []
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
        isFailAprovar:false
      })
    case CLEAR_REDUCER:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: false,
        isFail: false,
        failMessage: '',
        dataProposta: {},
        isFailAprovar:false
      })
    case BUSCAR_ACORDO_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        isFail: false,
        failMessage: '',
        dataProposta: action.payload
      })
    case BUSCAR_ACORDO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message,
        dataProposta: {}
      })
    case APROVAR_ACORDO_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        isFailAprovar: false,
        failMessage: ''
      })
    case APROVAR_ACORDO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFailAprovar: true,
        failMessage: action.payload.message
      })
      case BUSCAR_ACORDOS_MEDIACAO_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        isFailAprovar: false,
        failMessage: '',
        acordos: action.payload
      })
    case BUSCAR_ACORDOS_MEDIACAO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFailAprovar: true,
        failMessage: action.payload.message,
        acordos: []
      })
    default:
      return state;
  }
}