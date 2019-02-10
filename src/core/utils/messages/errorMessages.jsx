export const CNPJ_INFORMADO_INVALIDO = 'CNPJ_INFORMADO_INVALIDO';
export const EMAIL_INVALIDO = 'EMAIL_INVALIDO';
export const NOME_NAO_INFORMADO = 'NOME_NAO_INFORMADO';
export const TELEFONE_NAO_INFORMADO = 'TELEFONE_NAO_INFORMADO';

export default function getDefaultAdaptedMessage(message) {
  switch(message){
    case CNPJ_INFORMADO_INVALIDO: 
      return 'CNPJ informado inválido';
    case EMAIL_INVALIDO:
      return 'E-mail informado é inválido';
    case NOME_NAO_INFORMADO: 
      return 'Nome não informado';
    case TELEFONE_NAO_INFORMADO:
      return 'Telefone não informado';
    default:
      return '';
  }
}