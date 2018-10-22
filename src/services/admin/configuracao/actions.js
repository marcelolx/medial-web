import { GET_CONFIGURACAO, GET_CONFIGURACAO_ERROR } from './actionType';
import { API } from '../../../services/API';

function mapConfiguracao(data){
  return {
    type: GET_CONFIGURACAO,
    payload: {
      data: data,
    },
  };
};

function getConfiguracaoError(erro) {
  return {
    type: GET_CONFIGURACAO_ERROR,
    payload: erro,
  };
};


export function getConfiguracao(){
 return function(dispatch) {
    return API.get('/admin/configuracao')
      .then(response => {
        dispatch(mapConfiguracao(response.data));
      })
      .catch(erro => {
        dispatch(getConfiguracaoError(erro));
      });
  };
};