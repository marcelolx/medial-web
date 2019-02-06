import { GET_COUNTRIES, GET_COUNTRIES_ERROR } from './actionTypes';

const initialState = {
  list: [],
  message: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return Object.assign({}, state, {
        list: action.payload,
        message: null,
      });
    case GET_COUNTRIES_ERROR: 
      return Object.assign({}, state, {
        list: [],
        message: 'Não foi possível buscar os países',
      });
    default:
      return state;
  }
};