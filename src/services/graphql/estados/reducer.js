import { GET_STATES, GET_STATES_ERROR } from './actionTypes';

const initialState = {
  pais: null,
  list: [],
  message: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATES:
      return  Object.assign({}, state, {
        pais: action.payload.pais,
        list: action.payload.list,
        message: null,
      });
    case GET_STATES_ERROR:
      return Object.assign({}, state, {
        pais: action.payload.pais,
        list: action.payload.list,
        message: {
          type: 'danger',
          text: 'Não foi possível buscar os estados',
        }
      });
    default:
      return state;
  }
};