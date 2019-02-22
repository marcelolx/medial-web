import { BUSCAR_ANEXO_COMPLETE,BUSCAR_ANEXO_START,BUSCAR_ANEXO_ERROR } from './anexoActionTypes';
import { Object } from 'core-js';

const initialState = {
  anexos: [],
  isLoading: true,
  isLoaded: false,
  isFail: false,
  failMessage: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_ANEXO_START:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
        isLoaded: false,
        isFail: false,
        anexos: []
      })
    case BUSCAR_ANEXO_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        isFail:false,
        failMessage: '',
        anexos: action.payload
      })
    case BUSCAR_ANEXO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message,
        anexos:[]
      })
    default:
      return state;
  }
}