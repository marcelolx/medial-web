import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = JSON.parse(window.localStorage.getItem('state')) || {};
const middlewate = [thunk];

const store = createStore(
  initialState,
  applyMiddleware(...middleware),
);

store.subscribe(() => {
  const state = store.getState();
  const persist = {
    user: state.user,
  }

  window.localStorage.setItem('teste'), JSON.stringfy(persist));
});

export default store.