import { REMOVER_NEGOCIADOR_ERROR, REMOVER_NEGOCIADOR_COMPLETE } from "./actionTypes";

const initialState = {

}

export default function(state = initialState, action) {
  
  switch (action.type) {
    case REMOVER_NEGOCIADOR_ERROR: 
      return Object.assign({}, state, {
      });
    case REMOVER_NEGOCIADOR_COMPLETE: 
      return Object.assign({}, state, {
      }); 
    default:
      return state
  }
}