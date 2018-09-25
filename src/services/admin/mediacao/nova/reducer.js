import { GET_COMPANY_MATCH_SEARCH, GET_COMPANY_MATCH_SEARCH_ERROR } from './actionTypes';

const initialState = {
  empresas: [],
  encontrou: false,
  message: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_MATCH_SEARCH:
      return Object.assign({}, state, {
        empresas: action.payload,
        encontrou: (action.payload.length > 0),
        message: (action.payload.length === 0) ? 'Nenhuma empresa encontrada com este nome' : ''
      })
    case GET_COMPANY_MATCH_SEARCH_ERROR:
      return Object.assign({}, state, {
        empresas: [],
        encontrou: false,
        message: 'Falha ao buscar as empresas'
      })  
    default:
      return state;
  }
}