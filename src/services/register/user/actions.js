import { FILL_USER_DATA, CLEAR_REGISTER_DATA, USER_REGISTER_COMPLETE } from './actionTypes';
import { USER_REGISTER_FAIL } from '../../errors/actionTypes';
import {instance as axios, instanceHeaderWithoutToken as axiosHeader} from '../../axios';

function userRegisterComplete(response) {
  console.log(response);
  
  return {
    type: USER_REGISTER_COMPLETE,
    payload: {},
  };
};

function userRegisterError(error) {
  const { status, message } = error;
  console.log(status + ' ' + message); 

  return {
    type: USER_REGISTER_FAIL,
    payload: {
      status,
      message,
    }
  }
}

export function userRegister(data) {
  console.log('action: userRegister');

  return function(dispatch) {
    return axios.post('usuario/cadastrar', data.transacionador, {"headers" : axiosHeader})
      .then(response => {
        dispatch(userRegisterComplete(response));
      })
      .catch(err => {
        dispatch(userRegisterError(err.response.data));
      });
  };
};

export function saveUserRegisterData(formData) {
  return {
    type: FILL_USER_DATA,
    payload: formData,
  }
};

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
};