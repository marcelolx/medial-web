import { BUSCAR_MEDIACOES_START, BUSCAR_MEDIACOES_COMPLETE, BUSCAR_MEDIACOES_ERROR } from "./actionTypes";

const initialState = {
  lista: [],
  isLoading: false,
  isLoaded: false,
  error: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_MEDIACOES_START:
      return Object.assign({}, state, {
        lista: [],
        isLoading: true,
        isLoaded: false,
        error: false
      });
    case BUSCAR_MEDIACOES_COMPLETE: 
      return Object.assign({}, state, {
        lista: action.payload,
        isLoading: false,
        isLoaded: true,
        error: false,
      });
    case BUSCAR_MEDIACOES_ERROR: 
      return Object.assign({}, state, {
        lista: [],
        isLoading: false,
        isLoaded: false,
        error: true,
      });
    default:
      return state;
  }
}