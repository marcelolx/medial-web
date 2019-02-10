import { PROFILE_COMPLETE,ALTERACAO_SUCESSO,CARREGANDO,ALTERACAO_ERRO,CLOSE_NOTIFICATION } from './profileActionTypes';

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
  carregando: false,
  exibirAlteracao: false,
  sucessoAlteracao:false
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
          carregando: false,
      })
      case ALTERACAO_SUCESSO: 
        return Object.assign({}, state,{
            ...state,          
            carregando: false,
            exibirAlteracao:true,
            sucessoAlteracao:true,
        })
        case ALTERACAO_ERRO: 
        return Object.assign({}, state,{
            ...state,    
            exibirAlteracao:true,
            sucessoAlteracao:false,      
            carregando: false,
        })
      case CARREGANDO: 
        return Object.assign({}, state,{
            ...state,    
            exibirAlteracao:false,
            sucessoAlteracao:true,      
            carregando: true,
        })
        case CLOSE_NOTIFICATION: 
        return Object.assign({}, state,{
            ...state,    
            exibirAlteracao:false
        })
    default:
      return state
  }
}