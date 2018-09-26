import { COMPANY_MATCH_SEARCH_START, COMPANY_MATCH_SEARCH_COMPLETE, COMPANY_MATCH_SEARCH_ERROR } from './actionTypes';

const initialState = {
  empresas: [],
  encontrou: false,
  buscando: false,
  message: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_MATCH_SEARCH_START: {
      return Object.assign({}, state, {
        empresas: [],
        encontrou: false,
        buscando: true,
        message: 'Buscando empresas'
      })
    }
    case COMPANY_MATCH_SEARCH_COMPLETE:
      return Object.assign({}, state, {
        empresas: action.payload,
        encontrou: (action.payload.length > 0),
        buscando: false,
        message: (action.payload.length === 0) ? 'Nenhuma empresa encontrada com este nome' : ''
      })
    case COMPANY_MATCH_SEARCH_ERROR:
      return Object.assign({}, state, {
        empresas: [],
        encontrou: false,
        buscando: false,
        message: 'Falha ao buscar as empresas'
      })  
    default:
      return state;
  }
}