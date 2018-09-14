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

  return {
    type: CLEAR_REGISTER_DATA,
    payload: initialState,
  }
}