import {
  SALVAR_ACORDO_START,
  SALVAR_ACORDO_ERROR,
  SALVAR_ACORDO_COMPLETE
} from './proporAcordoActionTypes';
import { Object } from 'core-js';

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFail: false,
  failMessage: ''
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
    default:
      return state;
  }
}