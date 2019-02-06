import { API } from '../../../../../services/API';
import { COMPANY_MATCH_SEARCH_COMPLETE, COMPANY_MATCH_SEARCH_ERROR, COMPANY_MATCH_SEARCH_START } from './buscarEmpresaActionTypes';

export function getEmpresas(fantasia) {
  return function(dispatch) {
    dispatch(startCompanySearch());

    return API.get(`/empresa/getEmpresas?fantasia=${fantasia}`)
      .then(response => dispatch(getEmpresasComplete(response.data)))
      .catch(err => dispatch(getEmpresasError(err)))
  }
}

function startCompanySearch() {
  return { type: COMPANY_MATCH_SEARCH_START }
}

function getEmpresasComplete(data) {  
  return {
    type: COMPANY_MATCH_SEARCH_COMPLETE,
    payload: data
  }
}

function getEmpresasError(erro) {
  return {
    type: COMPANY_MATCH_SEARCH_ERROR,
    payload: erro
  }
}