import { combineReducers } from 'redux';
import authReducer from './admin/authentication/reducer';
import errorsReducer from './errors/reducer';
import stepsReducer from './steps/reducer';
import registerUserReducer from './register/user/reducer';
import paisesReducer from './graphql/paises/reducer';
import estadosReducer from './graphql/estados/reducer';
import cidadesReducer from './graphql/cidades/reducer';
import registerCompleteReducer from './register/complete/reducer';
import empresaReducer from './admin/empresa/reducer';
import mediacaoAssuntosReducer from './admin/mediacao/assuntos/reducer';

export default combineReducers({
  auth: authReducer,
  error: errorsReducer,
  step: stepsReducer,
  registerUser: registerUserReducer,
  paises: paisesReducer,
  estados: estadosReducer,
  cidades: cidadesReducer,
  registerComplete: registerCompleteReducer,
  empresa: empresaReducer,
  mediacaoAssuntos: mediacaoAssuntosReducer,
});