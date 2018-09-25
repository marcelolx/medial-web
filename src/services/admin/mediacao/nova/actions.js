import { API } from '../../../API';
import { GET_COMPANY_MATCH_SEARCH, GET_COMPANY_MATCH_SEARCH_ERROR } from './actionTypes';

export function getEmpresas(fantasia) {
  return function(dispatch) {
    return API.get(`/empresa/getEmpresas?fantasia=${fantasia}`)
      .then(response => dispatch(getEmpresasComplete(response.data)))
      .catch(err => dispatch(getEmpresasError(err)))
  }
}

function getEmpresasComplete(data) {  
  return {
    type: GET_COMPANY_MATCH_SEARCH,
    payload: data
  }
}

function getEmpresasError(erro) {
  return {
    type: GET_COMPANY_MATCH_SEARCH_ERROR,
    payload: erro
  }
}