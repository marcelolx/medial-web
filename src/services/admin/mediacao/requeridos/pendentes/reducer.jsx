import { BUSCAR_REQUERIDOS_PENDENTES_START, BUSCAR_REQUERIDOS_PENDENTES_COMPLETE, BUSCAR_REQUERIDOS_PENDENTES_ERROR } from './actionTypes';

const initialState = {
  buscando: false,
  sucesso: false,
  pendentes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_REQUERIDOS_PENDENTES_START:
      return Object.assign({}, state, {
        buscando: true,
        sucesso: false,
        pendentes: [],
      })
    case BUSCAR_REQUERIDOS_PENDENTES_COMPLETE: 
      return Object.assign({}, state, {
        buscando: false,
        sucesso: true,
        pendentes: action.payload
      })
    case BUSCAR_REQUERIDOS_PENDENTES_ERROR:
      return Object.assign({}, state, {
        buscando: false,
        sucesso: false,
        pendentes: [],
      })
    default:
      return state;
  }
}