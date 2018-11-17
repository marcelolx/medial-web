import { BUSCAR_MEDIACAO_START, BUSCAR_MEDIACAO_COMPLETE, BUSCAR_MEDIACAO_ERROR } from './actionTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFail: false,
  failMessage: '',
  mediacao: null
}

export default function(state = initialState, action) {  
  switch (action.type) {
    case BUSCAR_MEDIACAO_START:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
        isLoaded: false,
        isFail: false,
        failMessage: '',
        mediacao: null
      })
    case BUSCAR_MEDIACAO_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        mediacao: action.payload
      })
    case BUSCAR_MEDIACAO_ERROR:
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