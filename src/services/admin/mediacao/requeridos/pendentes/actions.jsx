import API from '../../../../API';
import { 
  BUSCAR_REQUERIDOS_PENDENTES_START, 
  BUSCAR_REQUERIDOS_PENDENTES_COMPLETE, 
  BUSCAR_REQUERIDOS_PENDENTES_ERROR, 
  SALVAR_HISTORICO_START, 
  SALVAR_HISTORICO_COMPLETE, 
  SALVAR_HISTORICO_ERROR, 
  SALVAR_HISTORICO_FINISH, 
  CONFIRMAR_SOLICITACAO_CADASTRO_COMPLETE, 
  CONFIRMAR_SOLICITACAO_CADASTRO_ERROR, 
  CONFIRMAR_SOLICITACAO_CADASTRO_FINISH,
  BUSCAR_REQUERIDO_PENDENTE_COMPLETE,
  BUSCAR_REQUERIDO_PENDENTE_ERROR } from './actionTypes';


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
    return API.put('/mediacao/historico/salvar', historico)
      .then(response => {
        if (response.data) {
          dispatch(salvarHistoricoComplete(response));
          dispatch(getCadastroPendente(historico.requeridoPendente));
        }
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
    return API.put('/mediacao/atualizarSituacao', data)
      .then(response => {
        if (response.data) {
          dispatch(confirmarSolicitacaoCadastroComplete(response));
          dispatch(getCadastroPendente(data.requeridoPendente));
        }
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

export function getCadastroPendente(idCadastroPendente) {
  return function(dispatch) {
    return API.get(`/mediacao/requeridopendente?idRequeridoPendente=${idCadastroPendente}`)
      .then(response => {
        dispatch(getCadastroPendenteComplete(response))
      })
      .catch(erro => {
        dispatch(getCadastroPendenteError(erro))
      })
  }
}

function getCadastroPendenteComplete(response) {
  return {
    type: BUSCAR_REQUERIDO_PENDENTE_COMPLETE,
    payload: response.data
  }
}

function getCadastroPendenteError(erro) {
  return {
    type: BUSCAR_REQUERIDO_PENDENTE_ERROR,
    payload: erro
  }
}