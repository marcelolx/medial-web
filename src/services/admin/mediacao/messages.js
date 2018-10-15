import getDefaultAdaptedMessage from '../../../utils/Messages/errorMessages';

export const ASSUNTO_INVALIDO = 'ASSUNTO_INVALIDO';
export const EMPRESA_INVALIDA = 'EMPRESA_INVALIDA';
export const MENSAGEM_MENOS_500_CARACTERES = 'MENSAGEM_MENOS_500_CARACTERES';

export default function getAdaptedMessage(message) {
  switch(message){
    case ASSUNTO_INVALIDO:
      return 'Assunto selecionado é inválido';
    case EMPRESA_INVALIDA:
      return 'Empresa selecionada não está cadastrada';
    case MENSAGEM_MENOS_500_CARACTERES:
      return 'Informe uma mensagem com no mínimo 500 caracteres';
    default:
      return getDefaultAdaptedMessage(message);
  }
}