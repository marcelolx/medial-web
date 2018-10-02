import { API } from "../../API";
import { PROFILE_COMPLETE } from "./actionTypes";
import { UNAUTHORIZED } from "../../errors/actionTypes"

export function loadProfile(token) {

  const config = {
    headers:{
      Authorization: token,
    }
  }

  return function(dispatch) {
    return API.get('/usuario/adquirir',config)
      .then(response => {
        dispatch(loadProfileComplete(response.data))
      })
      .catch(err => {
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
        return;
      })
  }
}

export function salvarDadosBasicos(token,data) {

  const config = {
    headers:{
      Authorization: token,
    }
  }

  return function(dispatch) {
    return API.post('/usuario/atualizarDadosBasicos',data,config)
      .then(response => {
        dispatch(sucessoAlteracao(response.data))
      })
      .catch(err => {
        return;
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
    payload: response,
  }
}