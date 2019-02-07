import { API } from '../../../../core/http/API';
import { REMOVER_NEGOCIADOR_COMPLETE,
   REMOVER_NEGOCIADOR_ERROR,
   ADICIONAR_NEGOCIADOR_COMPLETE,
   ADICIONAR_NEGOCIADOR_ERROR,
   ADQUIRIR_NEGOCIADORES_COMPLETE,
   ADQUIRIR_NEGOCIADORES_ERROR,
   ADQUIRIR_TOTAL_COMPLETE,
   ADQUIRIR_TOTAL_ERROR,
   BUSCAR_PESSOAS_ERROR,
   BUSCAR_PESSOAS_COMPLETE,
   CLEAR_PESSOAS,
   CARREGANDO
   } from "./negociadorActionTypes";

export function removerNegociador(empresa, negociador, janelaNovoNegociador, pesquisaRealizada) {
  
  const config = {data: { empresa: empresa, negociador: negociador }};

  return function(dispatch) {
    dispatch(carregando())
    return API.delete('/empresa/negociador',config )
      .then(response => {
        dispatch(removerNegociadorComplete(response.data))
        dispatch(adquirirNegociadores())
        if (janelaNovoNegociador) {
          dispatch(buscarPessoasNegociador(pesquisaRealizada))
        }
      })
      .catch(err => {
        dispatch(removerNegociadorError(err))
      })
  }
}

function removerNegociadorComplete(response) {

  return {
    type: REMOVER_NEGOCIADOR_COMPLETE,
    payload: response,
  }
}

function removerNegociadorError(error) {
  return {
    type: REMOVER_NEGOCIADOR_ERROR,
    payload: error,
  }
}

export function adicionarNegociador(negociador,pesquisa) {
  const config = {negociador: negociador};
        return function(dispatch) {
          dispatch(carregando())
          return API.put('/empresa/negociador',config)
            .then(response => {
              dispatch(adicionarNegociadorComplete(response.data))
              dispatch(adquirirNegociadores())
              dispatch(buscarPessoasNegociador(pesquisa))
            })
            .catch(err => {
              dispatch(adicionarNegociadorError(err))
      })
  }
}

function adicionarNegociadorComplete(response) {

  return {
    type: ADICIONAR_NEGOCIADOR_COMPLETE,
    payload: response,
  }
}

function adicionarNegociadorError(error) {
  return {
    type: ADICIONAR_NEGOCIADOR_ERROR,
    payload: error,
  }
}


export function adquirirNegociadores() {
  return function(dispatch) {
    dispatch(carregando())
    return API.get('/empresa/negociadores')
      .then(response => {
        dispatch(adquirirNegociadoresComplete(response.data))
      })
      .catch(err => {
        dispatch(adquirirNegociadoresError(err))
      })
  }
}

function adquirirNegociadoresComplete(response) {

  return {
    type: ADQUIRIR_NEGOCIADORES_COMPLETE,
    payload: response,
  }
}

function adquirirNegociadoresError(error) {
  return {
    type: ADQUIRIR_NEGOCIADORES_ERROR,
    payload: error,
  }
}



export function quantidadeNegociadores() {
  return function(dispatch) {
    dispatch(carregando())
    return API.get('/empresa/quantidadeNegociadores')
      .then(response => {
        dispatch(quantidadeNegociadoresComplete(response.data))
      })
      .catch(err => {
        dispatch(quantidadeNegociadoresError(err))
      })
  }
}

function quantidadeNegociadoresComplete(response) {

  return {
    type: ADQUIRIR_TOTAL_COMPLETE,
    payload: response,
  }
}

function quantidadeNegociadoresError(error) {
  return {
    type: ADQUIRIR_TOTAL_ERROR,
    payload: error,
  }
}

export function buscarPessoasNegociador(pesquisa) {


  return function(dispatch) {
    dispatch(carregando())
    return API.get(`/empresa/buscarPessoasNegociador?pesquisa=${pesquisa}`)
      .then(response => {
        dispatch(buscarPessoasNegociadorComplete(response.data))
      })
      .catch(err => {
        dispatch(buscarPessoasNegociadorError(err))
      })
  }
}

function buscarPessoasNegociadorComplete(response) {

  return {
    type: BUSCAR_PESSOAS_COMPLETE,
    payload: response,
  }
}

function buscarPessoasNegociadorError(error) {
  return {
    type: BUSCAR_PESSOAS_ERROR,
    payload: error,
  }
}
export function clearNegociadoresPesquisa() {
  return {
    type: CLEAR_PESSOAS
  }
}

function carregando() {
  return {
    type: CARREGANDO,
  }
}


