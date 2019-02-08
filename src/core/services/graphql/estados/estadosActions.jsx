import { GET_STATES, GET_STATES_ERROR, CLEAR_STATES } from './estadosActionTypes';
import { GraphQLAPI } from '../../../http/API';

function mapStates(country, states) {
  const _states = states
    .map(state => ({
      value: state.id,
      label: state.nome,
    }));

  return {
    type: GET_STATES,
    payload: {
      pais: country,
      list: _states,
    },
  };
};

function getStatesError(error) {
  return {
    type: GET_STATES_ERROR,
    payload: error,
  };
};

export function getCountryStates(country) {
  console.log('action: getCountryStates');
  
  const GET_STATE = `
    {
      getStates(country: ` + country + `, search: '') {
        id,
        nome
      }
    }
  `;  

  return function(dispatch){
    return GraphQLAPI.post('', { query: GET_STATE})
      .then(response => {
        dispatch(mapStates(country, response.data.data.getStates));
      })
      .catch(erro => {
        dispatch(getStatesError(erro));
      });
  };  
};

export function clearStates() {
  return { type: CLEAR_STATES }
}