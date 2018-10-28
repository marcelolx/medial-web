import axios from 'axios';
const dev = true;
const ip = 'http://api.downet.com.br/api/';
const ipDev = 'http://localhost:8080/api/';

export const API = axios.create({
  baseURL: dev ? ipDev: ip,
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
  baseURL:  (dev ? ipDev: ip) + 'graphql',
});

export default API;