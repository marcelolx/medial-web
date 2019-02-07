import getDefaultAdaptedMessage from '../../../../core/utils/messages/errorMessages';

export const ASSUNTO_INVALIDO = 'ASSUNTO_INVALIDO';
export const EMPRESA_INVALIDA = 'EMPRESA_INVALIDA';
export const MENSAGEM_MENOS_500_CARACTERES = 'MENSAGEM_MENOS_500_CARACTERES';
export const AGUARDANDO_CADASTRO_EMPRESA = 'AGUARDANDO_CADASTRO_EMPRESA';
export const SOLICITADO_CADASTRO_EMPRESA = 'SOLICITADO_CADASTRO_EMPRESA';
export const AGUARDANDO_DEFINICAO_MEDIADOR = 'AGUARDANDO_DEFINICAO_MEDIADOR';
export const MEDIADOR_DEFINIDO = 'MEDIADOR_DEFINIDO';
export const AGUARDANDO_DEFINICAO_NEGOCIADOR = 'AGUARDANDO_DEFINICAO_NEGOCIADOR';
export const NEGOCIADOR_DEFINIDO = 'NEGOCIADOR_DEFINIDO';
export const EM_ANDAMENTO = 'EM_ANDAMENTO';
export const SOLICITADA_MEDIACAO_PRESENCIAL = 'SOLICITADA_MEDIACAO_PRESENCIAL';
export const FECHADA_POR_DECURSO_PRAZO = 'FECHADA_POR_DECURSO_PRAZO';
export const CANCELADA = 'CANCELADA';
export const CONCLUIDA = 'CONCLUIDA';
export const ENCAMINHADO_PROCESSO_JUDICIAL = 'ENCAMINHADO_PROCESSO_JUDICIAL';
export const ACORDO = 'ACORDO';
export const CHAT = 'CHAT'; 
export const ENTROU = 'ENTROU'
export const MOTIVO = 'MOTIVO'
export const SAIU = 'SAIU';

export default function getAdaptedMessage(message) {
  switch(message){
    case ASSUNTO_INVALIDO:
      return 'Assunto selecionado é inválido';
    case EMPRESA_INVALIDA:
      return 'Empresa selecionada não está cadastrada';
    case MENSAGEM_MENOS_500_CARACTERES:
      return 'Informe uma mensagem com no mínimo 500 caracteres';
    case AGUARDANDO_CADASTRO_EMPRESA:
      return 'Aguardando cadastro da empresa';
    case SOLICITADO_CADASTRO_EMPRESA:
      return 'Solicitado cadastro da empresa';
    case AGUARDANDO_DEFINICAO_MEDIADOR: 
      return 'Aguardando definição do mediador';
    case MEDIADOR_DEFINIDO:
      return 'Mediador definido';
    case AGUARDANDO_DEFINICAO_NEGOCIADOR:
      return 'Aguardando definição do negociador';
    case NEGOCIADOR_DEFINIDO:
      return 'Negociador definido';
    case EM_ANDAMENTO:
      return 'Em andamento';
    case SOLICITADA_MEDIACAO_PRESENCIAL:
      return 'Solicitada mediação presêncial';
    case FECHADA_POR_DECURSO_PRAZO:
      return 'Fechada por decurso do prazo';
    case CANCELADA:
      return 'Cancelada';
    case CONCLUIDA:
      return 'Concluída';
    case ENCAMINHADO_PROCESSO_JUDICIAL:
      return 'Encaminhado à processo judicial';
    default:
      return getDefaultAdaptedMessage(message);
  }
}