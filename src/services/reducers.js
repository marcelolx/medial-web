import { combineReducers } from 'redux';
import authReducer from './admin/authentication/reducer';
import emailValidacaoReducer from './admin/emailValid/reducer';
import errorsReducer from './errors/reducer';
import stepsReducer from './steps/reducer';
import registerUserReducer from './register/user/reducer';
import paisesReducer from './graphql/paises/reducer';
import estadosReducer from './graphql/estados/reducer';
import cidadesReducer from './graphql/cidades/reducer';
import registerCompleteReducer from './register/complete/reducer';
import { reducer as permissions } from 'react-redux-permissions';

export default combineReducers({
  auth: authReducer,
  error: errorsReducer,
  step: stepsReducer,
  registerUser: registerUserReducer,
  paises: paisesReducer,
  estados: estadosReducer,
  cidades: cidadesReducer,
  registerComplete: registerCompleteReducer,
  permissions: permissions,
  emailValidacao: emailValidacaoReducer
});