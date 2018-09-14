import { GET_STATES, GET_STATES_ERROR } from './actionTypes';
import { instanceGraphQL as axiosGraphQL } from '../../../services/axios';

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
      getStates(country: ` + country + `, search: "") {
        id,
        nome
      }
    }
  `;  

  return function(dispatch){
    return axiosGraphQL.post('', { query: GET_STATE})
      .then(response => {
        dispatch(mapStates(country, response.data.data.getStates));
      })
      .catch(erro => {
        dispatch(getStatesError(erro));
      });
  };  
};