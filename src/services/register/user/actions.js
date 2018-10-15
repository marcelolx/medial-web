import { FILL_USER_DATA, CLEAR_REGISTER_DATA } from './actionTypes';
import { USER_REGISTER_FAIL } from '../../errors/actionTypes';
import API from '../../API';
import { completeRegister, failRegister } from '../complete/action';

function userRegisterComplete(response) {
  console.log(response);

  return function(dispatch) {
    dispatch(clearRegisterData());
    dispatch(completeRegister(response));
  }  
};

function userRegisterError(error) {
  const { status, message } = error.data; //Verificar se o objeto existe
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
    return API.post('usuario/cadastrar', data.transacionador)
      .then(response => {
        dispatch(userRegisterComplete(response));
      })
      .catch(err => {        
        dispatch(userRegisterError(err.response));
        dispatch(failRegister(err.response.data.message));
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
      sexo: 'F',
      estadoCivil: '',
      escolaridade: '',
      ramoEmpresarial: '',
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