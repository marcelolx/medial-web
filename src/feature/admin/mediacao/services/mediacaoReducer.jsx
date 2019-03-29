import {
  BUSCAR_MEDIACAO_START,
  BUSCAR_MEDIACAO_COMPLETE,
  BUSCAR_MEDIACAO_ERROR,
  BUSCAR_MENSAGEM_COMPLETE,
  BUSCAR_MENSAGEM_ERROR,
  BUSCAR_MENSAGEM_START,
  LIMPAR_DADOS_MENSAGEM,
  SHOW_NOTIFICACAO,
  CLOSE_NOTIFICACAO
} from './mediacaoActionTypes';

const initialState = {
  isLoading: false,
  isLoadingMensagem: false,
  isLoaded: false,
  isLoadedMensagem: false,
  isFail: false,
  isFailMensagem: false,
  failMessage: '',
  failMessageMensagem: '',
  mediacao: null,
  mensagens: null,
  showSnackbar: false,
  snakBarType: '',
  snakBarMessage: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BUSCAR_MEDIACAO_START:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
        isLoaded: false,
        isFail: false,
        failMessage: '',
        mediacao: null
      })
    case BUSCAR_MEDIACAO_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isLoaded: true,
        mediacao: action.payload
      })
    case BUSCAR_MEDIACAO_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isFail: true,
        failMessage: action.payload.message
      })
    case BUSCAR_MENSAGEM_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoadingMensagem: false,
        isFailMensagem: true,
        failMessageMensagem: action.payload.message
      })
    case BUSCAR_MENSAGEM_START:
      return Object.assign({}, state, {
        ...state,
        isLoadingMensagem: true,
        isLoadedMensagem: false,
        isFailMensagem: false,
        failMessageMensagem: '',
        mensagens: null
      })
    case BUSCAR_MENSAGEM_COMPLETE:
      return Object.assign({}, state, {
        ...state,
        isLoadingMensagem: false,
        isLoadedMensagem: true,
        mensagens: action.payload
      })
    case LIMPAR_DADOS_MENSAGEM:
      return Object.assign({}, state, {
        ...state,
        isLoadingMensagem: false,
        isLoadedMensagem: false,
        mensagens: []
      })

    case SHOW_NOTIFICACAO:
      return Object.assign({}, state, {
        ...state,
        showSnackbar: true,
        snakBarMessage: action.payload.message,
        snakBarType: action.payload.type
      })
    case CLOSE_NOTIFICACAO:
      return Object.assign({}, state, {
        ...state,
        showSnackbar: false,
        snakBarMessage: '',
        snakBarType: ''
      })


    default:
      return state;
  }
}