import axios from 'axios';

const dev = true;
const ip = 'http://api.downet.com.br';
const ipDev = 'http://localhost:8080';

export const API = axios.create({
  baseURL: (dev ? ipDev: ip) + '/api/',
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
  baseURL:  (dev ? ipDev: ip) + '/api/graphql',
});

export function getWebSocketAddres() {
  return (dev ? ipDev : ip) + '/websocket';
}

export function getHeaders() {
  const localState = JSON.parse(window.localStorage.getItem('state')) || {};  

  return localState.auth.token;
}

export default API;