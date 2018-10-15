import getDefaultAdaptedMessage from '../../../utils/Messages/errorMessages';

export const FANTASIA_NAO_INFORMADO = 'FANTASIA_NAO_INFORMADO';
export const CPF_CNPJ_CADASTRADO = 'CPF_CNPJ_CADASTRADO';
export const EMAIL_CADASTRADO = 'EMAIL_CADASTRADO';
export const SENHA_NAO_INFORMADA = 'SENHA_NAO_INFORMADA';
export const SENHA_EXIGE_8_DIGITOS = 'SENHA_EXIGE_8_DIGITOS';
export const SENHAS_NAO_COINCIDEM = 'SENHAS_NAO_COINCIDEM';
export const TIPO_TRANSACIONADOR_NAO_INFORMADO = 'TIPO_TRANSACIONADOR_NAO_INFORMADO';
export const CPF_INVALIDO = 'CPF_INVALIDO';
export const RG_IE_NAO_INFORMADO = 'RG_IE_NAO_INFORMADO';
export const DATA_IGUAL_DATA_ATUAL = 'DATA_IGUAL_DATA_ATUAL';
export const NOME_MAE_NAO_INFORMADO = 'NOME_MAE_NAO_INFORMADO';
export const SEXO_INFORMADO_INVALIDO = 'SEXO_INFORMADO_INVALIDO';
export const ESTADO_CIVIL_NAO_INFORMADO = 'ESTADO_CIVIL_NAO_INFORMADO';
export const ESCOLARIDADE_NAO_INFORMADA = 'ESCOLARIDADE_NAO_INFORMADA';
export const RAMO_EMPRESARIAL_NAO_INFORMADO = 'RAMO_EMPRESARIAL_NAO_INFORMADO';
export const CEP_NAO_INFORMADO = 'CEP_NAO_INFORMADO';
export const PAIS_NAO_INFORMADO = 'PAIS_NAO_INFORMADO';
export const ESTADO_NAO_INFORMADO = 'ESTADO_NAO_INFORMADO';
export const CIDADE_NAO_INFORMADA = 'CIDADE_NAO_INFORMADA';
export const BAIRRO_NAO_INFORMADO = 'BAIRRO_NAO_INFORMADO';
export const RUA_NAO_INFORMADA = 'RUA_NAO_INFORMADA';
export const NUMERO_NAO_INFORMADO = 'NUMERO_NAO_INFORMADO';
export const CELULAR_NAO_INFORMADO = 'CELULAR_NAO_INFORMADO';

export default function getAdaptedMessage(message) {
  switch(message){
    case EMAIL_CADASTRADO:
      return 'E-mail já cadastrado no sistema';
    case FANTASIA_NAO_INFORMADO:
      return 'Nome fantasia não informado';
    case CPF_CNPJ_CADASTRADO:
      return 'CPF/CNPJ já cadastrado';
    case SENHA_NAO_INFORMADA:
      return 'Senha não informada';
    case SENHA_EXIGE_8_DIGITOS:
      return 'A senha deve conter no mínimo 8 caracteres';
    case SENHAS_NAO_COINCIDEM:
      return 'A confirmação senha não coincide com a senha';
    case TIPO_TRANSACIONADOR_NAO_INFORMADO:
      return 'Selecione a personalidade';
    case CPF_INVALIDO:
      return 'CPF informado inválido';
    case RG_IE_NAO_INFORMADO: 
      return 'RG/IE não informado(a)';
    case DATA_IGUAL_DATA_ATUAL:
      return 'Data de nascimento não informada';
    case NOME_MAE_NAO_INFORMADO:
      return 'Nome da mãe não informado';
    case SEXO_INFORMADO_INVALIDO:
      return 'Sexo informado inválido';
    case ESTADO_CIVIL_NAO_INFORMADO:
      return 'Estado civil não informado';
    case ESCOLARIDADE_NAO_INFORMADA:
      return 'Escolaridade não informada';
    case RAMO_EMPRESARIAL_NAO_INFORMADO:
      return 'Ramo empresarial não informado';
    case CEP_NAO_INFORMADO:
      return 'CEP não informado';
    case PAIS_NAO_INFORMADO: 
      return 'País não informado';
    case ESTADO_NAO_INFORMADO:
      return 'Estado não informado';
    case CIDADE_NAO_INFORMADA:
      return 'Cidade não informada';
    case BAIRRO_NAO_INFORMADO:
      return 'Bairro não informado';
    case RUA_NAO_INFORMADA:
      return 'Rua não informada';
    case NUMERO_NAO_INFORMADO:
      return 'Número não informado';    
    case CELULAR_NAO_INFORMADO:
      return 'Celular não informado';
    default: 
      return getDefaultAdaptedMessage(message);
  }
}