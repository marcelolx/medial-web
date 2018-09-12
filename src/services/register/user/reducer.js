import { FILL_USER_DATA } from './actionTypes';

const initialState = {
  transacionador: {
    nome: '',
    fantasia: '',
    documento1: '',
    documento2: '',      
    nomeMae: '',
    tipoTransacionador: '',
    dataNascimento: '',
    dataCadastro: '',
    dataManutencao: '',
    dataExclusao: '',
    sexo: '',
    estadoCivil: '',
    escolaridade: '',
    nivelAcesso: '',
    usuario: {
      email: '',
      senha: '',
      confirmacaoSenha: '',
      ativo: false,        
    },
    papel: {
      empresa: '',
      papel: '',
      ativo: false,
    },
    contatos: { },
    endereco: {
      pais: '',
      estado: '',
      cidade: '',
      bairro: '',
      cep: '',
      rua: '',
      numero: '',
    },
  },
}

export default function(state = initialState, action){
  switch (action.type) {
    case FILL_USER_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      }) 
    default:
      return state;
  }
}