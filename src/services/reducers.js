import { combineReducers } from 'redux';
import usersReducer from './users/reducer';
import errorsReducer from './errors/reducer';
import stepsReducer from './steps/reducer';
import registerUserReducer from './register/user/reducer';
import paisesReducer from './graphql/paises/reducer';
import estadosReducer from './graphql/estados/reducer';
import cidadesReducer from './graphql/cidades/reducer';

export default combineReducers({
  user: usersReducer,
  error: errorsReducer,
  step: stepsReducer,
  registerUser: registerUserReducer,
  paises: paisesReducer,
  estados: estadosReducer,
  cidades: cidadesReducer,
});