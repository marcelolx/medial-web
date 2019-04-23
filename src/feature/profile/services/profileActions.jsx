import { API } from '../../../core/http/API';
import { PROFILE_COMPLETE, ALTERACAO_SUCESSO, ALTERACAO_ERRO, CARREGANDO, CLOSE_NOTIFICATION, OPEN_NOTIFICATION, CARREGANDO_FINISH } from './profileActionTypes';
import { UNAUTHORIZED } from '../../../core/services/errors/errorActionTypes'

export function loadProfile() {

  return function (dispatch) {
    dispatch(carregando())
    return API.get('/profile/adquirir')
      .then(response => {
        dispatch(loadProfileComplete(response.data))
      })
      .catch(err => {
        if (err.response !== undefined) {

          switch (err.response.status) {
            case 403: {
              dispatch(unauthorizedError())
              break;
            }
            default: {
              break;
            }
          }
        }
        return;
      })
  }
}

export function salvarDadosBasicos(data) {


  return function (dispatch) {
    dispatch(carregando())
    return API.post('/profile/atualizarDadosBasicos', data)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
        dispatch(erroAlteracao(err))

      })
  }
}

export function atualizarDadosLogin(data) {
  return function (dispatch) {
    dispatch(carregando())
    return API.post('/profile/atualizarDadosLogin', data)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
        dispatch(erroAlteracao(err))

      })
  }
}


export function atualizarDadosEndereco(data) {
  return function (dispatch) {
    dispatch(carregando())
    return API.post('/profile/atualizarDadosEndereco', data)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
        dispatch(erroAlteracao(err))
      })
  }
}

export function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION,
  }
}
export function openNotification() {

    return { 
      type: OPEN_NOTIFICATION
    }
  
}

export function carregandoFinish(valor) {

    return { 
      type: CARREGANDO_FINISH,
      payload: valor
    }
  
}

function unauthorizedError() {
  return {
    type: UNAUTHORIZED,
  }
}

function loadProfileComplete(response) {
  return {
    type: PROFILE_COMPLETE,
    payload: response,
  }
}

function sucessoAlteracao(response) {
  return {
    type: ALTERACAO_SUCESSO,
    payload: response,
  }
}

function erroAlteracao(response) {
  return {
    type: ALTERACAO_ERRO
  }
}


export function carregando() {
  return {
    type: CARREGANDO
  }
}
