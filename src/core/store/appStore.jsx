import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './appReducers';

const initialState = JSON.parse(window.localStorage.getItem('state')) || {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);

store.subscribe(() => {
  const state = store.getState();
  
  const persist = {
    auth: state.auth,
  }
  
  window.localStorage.setItem('state', JSON.stringify(persist));
});

export default store;