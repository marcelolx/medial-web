import {
  GET_CONFIGURACAO,
  GET_CONFLITOS,
  GET_CONFIGURACAO_ERROR,
  GET_CONFLITOS_ERROR,
  GET_CONFIGURACAO_CONFLITOS,
  GET_CONFIGURACAO_CONFLITOS_ERROR,
  GET_CONFIGURACAO_ASSUNTOS,
  GET_CONFIGURACAO_ASSUNTOS_ERROR
} from './configurationActionType';
import { API } from '../../../../core/http/API';

function mapConfiguracao(data) {
  return {
    type: GET_CONFIGURACAO,
    payload: {
      data: data,
    },
  };
};

function getConfiguracaoError(erro) {
  return {
    type: GET_CONFIGURACAO_ERROR,
    payload: erro,
  };
};

export function getConfiguracao() {
  return function (dispatch) {
    return API.get('/admin/configuracao')
      .then(response => {
        dispatch(mapConfiguracao(response.data));
      })
      .catch(erro => {
        dispatch(getConfiguracaoError(erro));
      });
  };
};


export function getConflitos() {
  return function (dispatch) {
    return API.get(`/assunto/getConflitos`)
      .then(response => {
        dispatch(getConflitosComplete(response.data))
      })
      .catch(err => {
        dispatch(getConflitosError(err))
      });
  }
}

function getConflitosComplete(data) {
  const _data = mapArrayToSearchSelectArray(data);

  return {
    type: GET_CONFLITOS,
    payload: _data
  }
}

function mapArrayToSearchSelectArray(data) {
  return data.map(item => ({
    value: item.id,
    label: item.descricao
  }));
}

function getConflitosError(erro) {
  return {
    type: GET_CONFLITOS_ERROR,
    payload: erro
  }
}

export function getConfiguracaoConflitos() {
  return function (dispatch) {
    return API.get(`/conflito/all`)
      .then(response => {
        dispatch({
          type: GET_CONFIGURACAO_CONFLITOS,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_CONFIGURACAO_CONFLITOS_ERROR,
          payload: err,
        })
      });
  }
}


export function getConfiguracaoAssuntos() {
  return function (dispatch) {
    return API.get(`/assunto/all`)
      .then(response => {
        dispatch({
          type: GET_CONFIGURACAO_ASSUNTOS,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_CONFIGURACAO_ASSUNTOS_ERROR,
          payload: err,
        })
      });
  }
}