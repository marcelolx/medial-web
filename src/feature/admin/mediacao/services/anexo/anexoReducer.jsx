import {
  BUSCAR_ANEXO_COMPLETE,
  BUSCAR_ANEXO_START,
  BUSCAR_ANEXO_ERROR,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_CLEAR,
  UPLOAD_FILE_START
} from './anexoActionTypes';
import { Object } from 'core-js';

const initialState = {
  anexos: [],
  isLoading: true,
  isLoaded: false,
  isFail: false,
  isUploaded: false,
  isUploading: false,
  failMessage: ''
};

export default function (state = initialState, action) {
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
        isFail: false,
        failMessage: '',
        anexos: action.payload
      })
    case BUSCAR_ANEXO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message,
        anexos: []
      })
    case UPLOAD_FILE_START:
      return Object.assign({}, state, {
        ...state,
        isUploading: true,
      })
    case UPLOAD_FILE_CLEAR:
      return Object.assign({}, state, {
        ...state,
        isLoaded: false,
        isUploading: false,
        isUploaded: false,
        failMessage: ''
      })
    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isLoaded: true,
        isUploaded: true,
        isUploading: false,
        failMessage: ''
      })
    case UPLOAD_FILE_FAIL:
      return Object.assign({}, state, {
        ...state,
        isLoaded: true,
        isUploaded: false,
        isUploading: false,
        failMessage: ''
      })
    default:
      return state;
  }
}