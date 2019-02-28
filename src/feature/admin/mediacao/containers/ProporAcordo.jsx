import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-responsive-modal';
import Editor from '../../../../core/components/Editor';
import Button from '../../../../core/components/CustomButton';
import { defaultFont, successColor, dangerColor } from '../../../../assets/jss/styles';
import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import bindActionCreators from 'redux/src/bindActionCreators';
import { compose } from 'recompose';
import * as proporAcordoActions from '../services/proporAcordo/proporAcordoActions';
import queryString from 'query-string';
import Loader from '../../../../core/components/Loader';
import { FormHelperText } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  marginZero: {
    ...defaultFont,
    margin: 0
  },
  overlay: {
    zIndex: 99999,
  },
  closeButton: {
    cursor: 'pointer'
  },
  buttomConfirm: {
    float: 'right',
  },
  success: {
    color: successColor
  },
  fail: {
    color: dangerColor
  },
  statusAcordo: {
    float: 'left',
    marginTop: 10,
  },
  footer: {
    width: '100%'
  }
});

class ProporAcordo extends React.Component {
  constructor() {
    super();

    this.state = {
      mensagem: ''

    };
    this.closeModal = this.closeModal.bind(this);
    this._proporAcordo = this._proporAcordo.bind(this);
  }

  closeModal() {
    this.props.closeModal();
  }

  _proporAcordo() {
    let mensagem = this.state.mensagem;
    let codigoMediacao = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;

    if (mensagem.length < 200) {
      this.setState({ erroTamanhoAcordo: true });
      return;
    }

    this.props.actions.proporAcordo({ codigoMediacao, mensagem });
  }

  _handleChangeText(valor) {
    this.setState({ mensagem: valor });

    if (this.state.erroTamanhoAcordo && valor.length > 200) {
      this.setState({ erroTamanhoAcordo: false });
    }
  }

  render() {
    const { classes, proporAcordo, mensagem } = this.props;

    return (

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open
        onClose={this.closeModal}
        center
        classNames={classes}
      >

        <Loader open={proporAcordo.isLoading} />
        <div>
          <h3 className={classes.marginZero}>Propor Acordo</h3>
          <h5 className={[classes.marginZero]}>Descreva a sua proposta.</h5>
          <Editor value={mensagem ? mensagem : this.state.mensagem}
            placeholder="Descreva a sua proposta."
            readOnly={proporAcordo.isLoaded || mensagem}
            onChange={(valor) => this._handleChangeText(valor)} />
          {this.state.erroTamanhoAcordo &&
            <FormHelperText className={classes.fail} id='mensagem-error-text'>{'Informe uma mensagem com no mínimo 200 caracteres.'}</FormHelperText>}
          <div className={classes.footer}>
            {proporAcordo.isLoaded ? <h5 className={[classes.success, classes.statusAcordo].join(' ')}>Proposta enviada com sucesso</h5> : null}
            {proporAcordo.isFail ? <h5 className={[classes.fail, classes.statusAcordo].join(' ')}>Erro ao solicitar Proposta</h5> : null}
            <Button color='info' disabled={proporAcordo.isLoaded || proporAcordo.isLoading} className={classes.buttomConfirm} onClick={this._proporAcordo}>Propor Acordo</Button>
          </div>
        </div>
      </Modal>
    );
  }
}


const mapStateToProps = state => ({
  proporAcordo: state.proporAcordo
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...proporAcordoActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ProporAcordo));
