import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_HOST + 'api/',
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const localState = JSON.parse(window.localStorage.getItem('state')) || {};  
  
  if ((localState.auth !== undefined) && (localState.auth.token !== null)) {
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = localState.auth.token;    
  } else {
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
  }

  return config; 
}, (error) => {
  return Promise.reject(error);
});

export const GraphQLAPI = axios.create({
  baseURL:  process.env.REACT_APP_API_HOST + 'api/graphql',
});

export function getWebSocketAddres() {
  return process.env.REACT_APP_API_HOST + 'api/websocket';
}

export function getHeaders() {
  const localState = JSON.parse(window.localStorage.getItem('state')) || {};  

  return localState.auth.token;
}

export default API;