import API from '../../../../API';
import { BUSCAR_REQUERIDOS_PENDENTES_START, BUSCAR_REQUERIDOS_PENDENTES_COMPLETE, BUSCAR_REQUERIDOS_PENDENTES_ERROR, SALVAR_HISTORICO_START, SALVAR_HISTORICO_COMPLETE, SALVAR_HISTORICO_ERROR, SALVAR_HISTORICO_FINISH, CONFIRMAR_SOLICITACAO_CADASTRO_COMPLETE, CONFIRMAR_SOLICITACAO_CADASTRO_ERROR, CONFIRMAR_SOLICITACAO_CADASTRO_FINISH } from './actionTypes';


export function buscarRequeridosPendentes() {
  return function(dispatch) {
    dispatch(buscarRequeridosPendentesStart());
    return API.get('/mediacao/requeridospendentes')
      .then(response => {
        dispatch(buscarRequeridosPendentesComplete(response))
      })
      .catch(err => {
        dispatch(buscarRequeridosPendentesError(err))
      });
  }
}

function buscarRequeridosPendentesStart() {
  return { type: BUSCAR_REQUERIDOS_PENDENTES_START }
}

function buscarRequeridosPendentesComplete(response) {
  return {
    type: BUSCAR_REQUERIDOS_PENDENTES_COMPLETE,
    payload: response.data
  }
}

function buscarRequeridosPendentesError(error) {
  return {
    type: BUSCAR_REQUERIDOS_PENDENTES_ERROR,
    payload: error
  }
}

export function salvarHistorico(historico) {
  return function(dispatch) {
    dispatch(salvarHistoricoStart());
    return API.post('/mediacao/historico/salvar', historico)
      .then(response => {
        dispatch(salvarHistoricoComplete(response))
      })
      .catch(err => {
        dispatch(salvarHistoricoError(err))
      });
  }
}

function salvarHistoricoStart() {
  return { type: SALVAR_HISTORICO_START }
}

function salvarHistoricoComplete(response) {  
  return {
    type: SALVAR_HISTORICO_COMPLETE,
    payload: response.data
  }
}

function salvarHistoricoError(error) {
  return {
    type: SALVAR_HISTORICO_ERROR,
    payload: error
  }
}

export function limparEstadoHistoricoSalvo() {
  return { type: SALVAR_HISTORICO_FINISH }
}

export function confirmarSolicitacaoCadastro(data) {
  return function(dispatch) {
    return API.post('/mediacao/atualizarSituacao', data)
      .then(response => {
        dispatch(confirmarSolicitacaoCadastroComplete(response))
      })
      .catch(err => {
        dispatch(confirmarSolicitacaoCadastroError(err))
      });
  }
}

function confirmarSolicitacaoCadastroComplete(response) {
  return {
    type: CONFIRMAR_SOLICITACAO_CADASTRO_COMPLETE,
    payload: response.data
  }
}

function confirmarSolicitacaoCadastroError(error) {
  return {
    type: CONFIRMAR_SOLICITACAO_CADASTRO_ERROR,
    payload: error
  }
}

export function confirmarSolicitacaoCadastroFinish() {
  return { type: CONFIRMAR_SOLICITACAO_CADASTRO_FINISH };
}