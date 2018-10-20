import { combineReducers } from 'redux';
import authReducer from './admin/authentication/reducer';
import emailValidacaoReducer from './admin/emailValid/reducer';
import profileInfoReducer from './admin/profile/reducer';
import errorsReducer from './errors/reducer';
import stepsReducer from './steps/reducer';
import registerUserReducer from './register/user/reducer';
import paisesReducer from './graphql/paises/reducer';
import estadosReducer from './graphql/estados/reducer';
import cidadesReducer from './graphql/cidades/reducer';
import registerCompleteReducer from './register/complete/reducer';
import empresaReducer from './admin/empresa/reducer';
import mediacaoAssuntosReducer from './admin/mediacao/assuntos/reducer';
import novaMediacaoReducer from './admin/mediacao/nova/reducer';
import requeridosPendentesReducer from './admin/mediacao/requeridos/pendentes/reducer';

export default combineReducers({
  auth: authReducer,
  error: errorsReducer,
  step: stepsReducer,
  registerUser: registerUserReducer,
  paises: paisesReducer,
  estados: estadosReducer,
  cidades: cidadesReducer,
  registerComplete: registerCompleteReducer,
  emailValidacao: emailValidacaoReducer,
  profileInfo: profileInfoReducer,
  empresa: empresaReducer,
  mediacaoAssuntos: mediacaoAssuntosReducer,
  novaMediacao: novaMediacaoReducer,
  requeridosPendentes: requeridosPendentesReducer,
});
