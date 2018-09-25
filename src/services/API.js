import axios from 'axios';

function getToken() {
  const localState = JSON.parse(window.localStorage.getItem('state')) || {};  
  return localState.auth !== undefined ? localState.auth.token : '';
}

export const API = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken(),
  }
});

export const APIHeaderWithoutToken = {
  'Content-Type': 'application/json',
};

export const GraphQLAPI = axios.create({
  baseURL: 'http://localhost:8080/api/graphql',
});

export default API;