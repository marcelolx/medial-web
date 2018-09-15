import { FILL_USER_DATA, CLEAR_REGISTER_DATA } from './actionTypes';

const initialState = {
  transacionador: {
    nome: '',
    fantasia: '',
    documento1: '',
    documento2: '',      
    nomeMae: '',
    tipoTransacionador: 'F',
    dataNascimento: '1900-01-01',
    dataCadastro: '',
    dataManutencao: '',
    dataExclusao: '',
    sexo: 'F',
    estadoCivil: '',
    escolaridade: '',
    ramoEmpresarial: '',
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
    contatos: {
      telefone: '',
      celular: '',
    },
    endereco: {
      pais: [],
      estado: [],
      cidade: [],
      cep: '',
      bairro: '',      
      rua: '',
      numero: '',
    },
  },
};

export default function(state = initialState, action){
  switch (action.type) {    
    case FILL_USER_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      })
    case CLEAR_REGISTER_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      })
    default:
      return state;
  }
}