export const EMAIL_INVALIDO = 'EMAIL_INVALIDO';

export default function getAdaptedMessage(message) {
  switch(message){
    case EMAIL_INVALIDO:
      return 'E-mail informado é inválido';
    default: 
      return '';
  }
}