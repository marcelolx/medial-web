import { combineReducers } from 'redux';
import authReducer from '../services/authentication/loginReducer';
import emailValidacaoReducer from '../../feature/login/services/validEmailReducer';
import profileInfoReducer from '../../feature/profile/services/profileReducer';
import errorsReducer from '../services/errors/errorReducer';
import stepsReducer from '../services/steps/stepsReducer';
import registerUserReducer from '../../feature/register/user/services/user/registerUserReducer';
import paisesReducer from '../services/graphql/paises/paisesReducer';
import estadosReducer from '../services/graphql/estados/estadosReducer';
import cidadesReducer from '../services/graphql/cidades/cidadesReducer';
import registerCompleteReducer from '../../feature/register/user/services/complete/registerUserCompleteReducer';
import empresaReducer from '../../feature/register/mediacao/containers/services/buscarEmpresaReducer';
import mediacaoAssuntosReducer from '../../feature/register/mediacao/containers/motivo/services/assuntosReducer';
import novaMediacaoReducer from '../../feature/register/mediacao/services/novaMediacaoReducer';
import listUsersReducer from '../../feature/admin/listusers/services/usersReducer';
import configuracaoReducer from '../../feature/admin/configuration/services/configurationReducer';
import requeridosPendentesReducer from '../../feature/admin/cadastropendente/services/requeridoPendenteReducer';
import mediacoesReducer from '../../feature/admin/mediacao/services/mediacoes/mediacoesReducer';
import mediacaoReducer from '../../feature/admin/mediacao/services/mediacaoReducer';
import mediacaoSituacaoReducer from '../../feature/admin/mediacao/services/situacao/situacaoMediacaoReducer';
import negociadorReducer from '../../feature/dashboard/negociador/services/negociadorReducer';
import anexoReducer from '../../feature/admin/mediacao/services/anexo/anexoReducer';
import acordoReducer from '../../feature/admin/mediacao/services/acordo/acordoReducer';

export default combineReducers({
  auth: authReducer,
  error: errorsReducer,
  step: stepsReducer,
  registerUser: registerUserReducer,
  paises: paisesReducer,
  estados: estadosReducer,
  cidades: cidadesReducer,
  registerComplete: registerCompleteReducer,
  emailValidacao: emailValidacaoReducer,
  profileInfo: profileInfoReducer,
  empresa: empresaReducer,
  mediacaoAssuntos: mediacaoAssuntosReducer,
  novaMediacao: novaMediacaoReducer,
  listUsers: listUsersReducer,
  configuracao: configuracaoReducer,
  requeridosPendentes: requeridosPendentesReducer,
  mediacoes: mediacoesReducer,
  mediacao: mediacaoReducer,
  mediacaoSituacao: mediacaoSituacaoReducer,
  negociadores: negociadorReducer,
  anexos: anexoReducer,
  acordo:acordoReducer,
});
