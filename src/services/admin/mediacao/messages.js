export const ASSUNTO_INVALIDO = 'ASSUNTO_INVALIDO';

export default function getAdaptedMessage(message) {
  switch(message){
    case ASSUNTO_INVALIDO:
      return 'Assunto selecionado é inválido';
    default:
      return '';
  }
}