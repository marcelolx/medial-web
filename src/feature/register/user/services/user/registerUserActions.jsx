
import { FILL_USER_DATA, CLEAR_REGISTER_DATA } from './registerUserActionTypes';
import { USER_REGISTER_FAIL } from '../../../../../core/services/errors/errorActionTypes';
import API from '../../../../../core/http/API';
import { completeRegister, failRegister } from '../complete/registerUserCompleteAction';

function userRegisterComplete(response) {
  return function(dispatch) {
    dispatch(clearRegisterData());
    dispatch(completeRegister(response));
  }  
};

function userRegisterError(error) {
  const { status, message } = error.data; //Verificar se o objeto existe
  
  return {
    type: USER_REGISTER_FAIL,
    payload: {
      status,
      message,
    }
  }
}

export function userRegister(data) {
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