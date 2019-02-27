import { SAVE_MEDIATION_START, SAVE_MEDIATION_COMPLETE, SAVE_MEDIATION_ERROR, CLEAR_MEDIATION_STATE, UPLOAD_FILE_FAIL, UPLOAD_FILE_SUCCESS } from './novaMediacaoActionTypes';
import getAdaptedMessage from '../../../admin/mediacao/utils/mediacaoMessagesHelper';
import NovaMediacaoConstants from '../utils/novaMediacaoConstants';


const initialState = {
  id: 0,
  protocolo: '',
  errorCode: '',
  mensagem: '',
  filesUploadError: 0,
  filesUploadSuccess: 0,
  errorFile: false,
}

export default function (state = initialState, action) {
  debugger
  switch (action.type) {
    case SAVE_MEDIATION_START:
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        errorCode: '',
        mensagem: NovaMediacaoConstants.SOLICITANDO_MEDIACAO
      })
    case SAVE_MEDIATION_COMPLETE:
      return Object.assign({}, state, {
        ...action.payload,
        errorCode: '',
        mensagem: NovaMediacaoConstants.MEDIACAO_SOLICITADA
      })
    case SAVE_MEDIATION_ERROR:
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        errorCode: action.payload.message,
        mensagem: getAdaptedMessage(action.payload.message)
      })
    case CLEAR_MEDIATION_STATE:
      return Object.assign({}, state, {
        id: 0,
        protocolo: '',
        errorCode: '',
        mensagem: '',
        filesUploadError: 0,
        filesUploadSuccess: 0,
        errorFile: false,
      })
    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        filesUploadSuccess: state.filesUploadSuccess + 1,
      })
    case UPLOAD_FILE_FAIL:
      return Object.assign({}, state, {
        filesUploadError: state.filesUploadError + 1,
        errorFile: true,
      })
    default:
      return state;
  }
}
