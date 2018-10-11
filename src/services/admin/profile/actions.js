import { API } from "../../API";
import { PROFILE_COMPLETE,ALTERACAO_SUCESSO } from "./actionTypes";
import { UNAUTHORIZED } from "../../errors/actionTypes"

export function loadProfile(token) {

  const config = {
    headers:{
      Authorization: token,
    }
  }

  return function(dispatch) {
    return API.get('/profile/adquirir',config)
      .then(response => {
        dispatch(loadProfileComplete(response.data))
      })
      .catch(err => {
        if (err.response !== undefined) {
        
          switch(err.response.status){
            case 403:{
              console.log('Não autorizado')
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


  return function(dispatch) {
    return API.post('/profile/atualizarDadosBasicos',data)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
        
      })
  }
}

export function atualizarDadosLogin(data) {
  return function(dispatch) {
    return API.post('/profile/atualizarDadosLogin',data)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
      
      })
  }
}


export function atualizarDadosEndereco(data) {
  return function(dispatch) {
    return API.post('/profile/atualizarDadosEndereco',data)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
      
      })
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