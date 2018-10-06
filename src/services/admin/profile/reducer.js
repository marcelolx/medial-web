import { PROFILE_COMPLETE,ALTERACAO_SUCESSO } from "./actionTypes";

const initialState = {
  id: null,
  nome: null,
  dataCadastro: null,
  ultimoAcesso: null,
  dataNascimento: null,
  endereco:[],
  email:null,
  documento: null,
  telefone: null,
  avatar: null,
  emailLogin: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
      case PROFILE_COMPLETE: 
      return Object.assign({}, state,{
          id: action.payload.id,
          nome: action.payload.nome,
          dataNascimento: action.payload.dataNascimento,
          email: action.payload.email,
          documento: action.payload.documento,
          dataCadastro: action.payload.dataCadastro,
          ultimoAcesso: action.payload.ultimoAcesso,
          telefone: action.payload.telefone,
          endereco: action.payload.endereco,
          avatar: action.payload.avatar,
          emailLogin: action.payload.emailLogin,
      } )
      case ALTERACAO_SUCESSO: 
      return Object.assign({}, state,{
          ...state
      } )
    default:
      return state
  }
}