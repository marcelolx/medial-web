import axios from 'axios';

const dev = false;
const ip = 'https://api.downet.com.br:80';
const ipDev = 'https://api.downet.com.br:80';//'http://localhost:8080';

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
  return (dev ? ipDev : ip) + '/api/websocket';
}

export function getHeaders() {
  const localState = JSON.parse(window.localStorage.getItem('state')) || {};  

  return localState.auth.token;
}

export default API;