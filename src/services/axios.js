import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

export const instanceGraphQL = axios.create({
  baseURL: 'http://localhost:8080/api/graphql',
});

export default instance;