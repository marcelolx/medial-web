import {
  BUSCAR_MEDIACAO_START,
  BUSCAR_MEDIACAO_COMPLETE,
  BUSCAR_MEDIACAO_ERROR,
  BUSCAR_MENSAGEM_START,
  BUSCAR_MENSAGEM_COMPLETE,
  BUSCAR_MENSAGEM_ERROR,
  LIMPAR_DADOS_MENSAGEM
} from './actionTypes';
import API from '../../API';
import { buscarSituacaoMediacao } from './situacao/actions';

export function buscarMediacao(idMediacao) {
  return function (dispatch) {
    dispatch(buscarMediacaoStart());
    return API.get(`/mediacao/${idMediacao}`)
      .then(response => {
        dispatch(buscarMediacaoComplete(response));
        dispatch(buscarSituacaoMediacao(idMediacao));
      })
      .catch(error => {
        dispatch(buscarMediacaoError(error))
      });
  }
}

export function adquirirMensagem(idMediacao, offset, limit) {
  return function (dispatch) {
    dispatch(buscarMensagemStart());
    return API.get(`/mensagens/${idMediacao}?offset=${offset}&limit=${limit}`)
      .then(response => {
        dispatch(buscarMensagemComplete(response));
      })
      .catch(error => {
        dispatch(buscarMensagemError(error))
      });
  }
}

export function limparDadosMensagens() {
  return function (dispatch) {
    dispatch({
      type: LIMPAR_DADOS_MENSAGEM,
    });
  }
}

function buscarMensagemStart() {
  return { type: BUSCAR_MENSAGEM_START };
}


function buscarMensagemComplete(response) {
  return {
    type: BUSCAR_MENSAGEM_COMPLETE,
    payload: response.data
  }
}

function buscarMensagemError(error) {
  return {
    type: BUSCAR_MENSAGEM_ERROR,
    payload: error.response.data
  }
}


function buscarMediacaoStart() {
  return { type: BUSCAR_MEDIACAO_START };
}

function buscarMediacaoComplete(response) {
  return {
    type: BUSCAR_MEDIACAO_COMPLETE,
    payload: response.data
  }
}

function buscarMediacaoError(error) {
  console.log(error); //TODO: Quando for Network Error, chamar uma action de erro geral do sistema?
  return {
    type: BUSCAR_MEDIACAO_ERROR,
    payload: error.response.data
  }
}