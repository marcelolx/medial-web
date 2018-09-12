import { combineReducers } from 'redux';
import usersReducer from './users/reducer';
import errorsReducer from './errors/reducer';
import stepsReducer from './steps/reducer';
import registerUserReducer from './register/user/reducer';

export default combineReducers({
  user: usersReducer,
  error: errorsReducer,
  step: stepsReducer,
  registerUser: registerUserReducer,
});