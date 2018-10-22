import { BUSCAR_REQUERIDOS_PENDENTES_START, BUSCAR_REQUERIDOS_PENDENTES_COMPLETE, BUSCAR_REQUERIDOS_PENDENTES_ERROR, SALVAR_HISTORICO_START, SALVAR_HISTORICO_COMPLETE, SALVAR_HISTORICO_ERROR, SALVAR_HISTORICO_FINISH, CONFIRMAR_SOLICITACAO_CADASTRO_COMPLETE, CONFIRMAR_SOLICITACAO_CADASTRO_ERROR, CONFIRMAR_SOLICITACAO_CADASTRO_FINISH } from './actionTypes';

const initialState = {
  buscando: false,
  sucesso: false,
  pendentes: [],
  salvandoHistorico: false,
  sucessoSalvarHistorico: false,
  idHistorico: 0,
  erroSalvarHistorico: '',
  cadastroConfirmado: false,
  erroConfirmarCadastro: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_REQUERIDOS_PENDENTES_START:
      return Object.assign({}, state, {
        ...state,
        buscando: true,
        sucesso: false,
        pendentes: [],
      })
    case BUSCAR_REQUERIDOS_PENDENTES_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        buscando: false,
        sucesso: true,
        pendentes: action.payload
      })
    case BUSCAR_REQUERIDOS_PENDENTES_ERROR:
      return Object.assign({}, state, {
        ...state,
        buscando: false,
        sucesso: false,
        pendentes: [],
      })
    case SALVAR_HISTORICO_START: 
      return Object.assign({}, state, {
        ...state,
        salvandoHistorico: true,
        sucessoSalvarHistorico: false,
        erroSalvarHistorico: '',
      })
    case SALVAR_HISTORICO_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        salvandoHistorico: false,
        sucessoSalvarHistorico: action.payload > 0,
        idHistorico: action.payload,
        erroSalvarHistorico: '',
      })
    case SALVAR_HISTORICO_ERROR:
      return Object.assign({}, state, {
        ...state,
        salvandoHistorico: false,
        sucessoSalvarHistorico: false,
        idHistorico: 0,
        erroSalvarHistorico: action.payload,
      })
    case SALVAR_HISTORICO_FINISH:
      return Object.assign({}, state, {
        ...state,
        salvandoHistorico: false,
        sucessoSalvarHistorico: false,
        erroSalvarHistorico: '',
        idHistorico: 0,
      })
    case CONFIRMAR_SOLICITACAO_CADASTRO_COMPLETE: 
      return Object.assign({}, state, {
        ...state,
        cadastroConfirmado: true,
        erroConfirmarCadastro: false,
      })
    case CONFIRMAR_SOLICITACAO_CADASTRO_ERROR:
      return Object.assign({}, state, {
        ...state,
        cadastroConfirmado: false,
        erroConfirmarCadastro: true,
      })
    case CONFIRMAR_SOLICITACAO_CADASTRO_FINISH:
      return Object.assign({}, state, {
        ...state,
        cadastroConfirmado: false,
        erroConfirmarCadastro: false,
      })
    default:
      return state;
  }
}