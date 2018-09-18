import { GET_COUNTRIES, GET_COUNTRIES_ERROR } from './actionTypes';
import { instanceGraphQL as axiosGraphQL } from '../../axios';

const GET_COUNTRY = `
  {
    getCountry(search: "") {
      id,
      nome
    }
  }
`;

function getCountriesError(error) {
  return {
    type: GET_COUNTRIES_ERROR,
    payload: error, 
  };
};

function mapCountries(countries) {
  const _countries = countries
    .map(country => ({
      value: country.id,
      label: country.nome,
    }));
    
  return {
    type: GET_COUNTRIES,
    payload: _countries,
  };
};

export function getAllCountries() {
  console.log('action: getAllCountries');
  
  return function(dispatch) {
    return axiosGraphQL.post('', { query: GET_COUNTRY})
      .then(response => {
        dispatch(mapCountries(response.data.data.getCountry));        
      })
      .catch(erro => {
        dispatch(getCountriesError(erro));
      });
  }   
}