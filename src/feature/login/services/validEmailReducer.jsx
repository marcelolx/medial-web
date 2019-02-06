import { VALIDAR_COMPLETE } from "./validEmailActionTypes";

const initialState = {
  value: null
}

export default function(state = initialState, action) {
  switch (action.type) {
      case VALIDAR_COMPLETE: 
      return Object.assign({}, state,{
        value: action.payload.valor
      } )
    default:
      return state
  }
}