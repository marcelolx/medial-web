import { FILL_USER_DATA, CLEAR_REGISTER_DATA } from './actionTypes';

export function saveUserRegisterData(formData) {
  return {
    type: FILL_USER_DATA,
    payload: formData,
  }
}

export function clearRegisterData() {
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

  return {
    type: CLEAR_REGISTER_DATA,
    payload: initialState,
  }
}