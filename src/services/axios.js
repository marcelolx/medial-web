import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8001/api/', //TODO: Aqui setar a url do servidor java
});

export default instance;