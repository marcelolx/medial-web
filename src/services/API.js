import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

export const APIHeaderWithoutToken = {
  'Content-Type': 'application/json',
};

export const GraphQLAPI = axios.create({
  baseURL: 'http://localhost:8080/api/graphql',
});

export default API;