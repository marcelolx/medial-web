import { PROFILE_COMPLETE } from "./actionTypes";

const initialState = {
  id: null,
  nome: null,
  dataCadastro: null,
  ultimoAcesso: null,
  dataNascimento: null,
  endereco:[],
  email:null,
  telefone: null,
  avatar: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
      case PROFILE_COMPLETE: 
      return Object.assign({}, state,{
          id: action.payload.id,
          nome: action.payload.nome,
          dataNascimento: action.payload.dataNascimento,
          email: action.payload.email,
          dataCadastro: action.payload.dataCadastro,
          ultimoAcesso: action.payload.ultimoAcesso,
          telefone: action.payload.telefone,
          endereco: action.payload.endereco,
          avatar: action.payload.avatar,
      } )
    default:
      return state
  }
}