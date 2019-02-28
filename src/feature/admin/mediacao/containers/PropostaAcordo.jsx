import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-responsive-modal';
import Editor from '../../../../core/components/Editor';
import { defaultFont, successColor, dangerColor } from '../../../../assets/jss/styles';
import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import bindActionCreators from 'redux/src/bindActionCreators';
import { compose } from 'recompose';
import * as acordoActions from '../services/acordo/acordoActions';
import Loader from '../../../../core/components/Loader';


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

class PropostaAcordo extends React.Component {
  constructor() {
    super();

    this.state = {
      mensagem: ''

    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { codigoAcordo } = this.props;

    if (codigoAcordo && codigoAcordo > 0) {
      this.props.actions.buscarAcordo(codigoAcordo);
    }
  }


  closeModal() {
    this.props.closeModal();
  }

  render() {
    const { classes, acordo } = this.props;

    return (

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open
        onClose={this.closeModal}
        center
        classNames={classes}
      >

        <Loader open={acordo.isLoading} />
        <div>
          <h3 className={classes.marginZero}>{`Proposta de Acordo - #${this.props.codigoAcordo}`}</h3>
          <Editor value={acordo.proposta}
            placeholder="Descreva a sua proposta."
            readOnly />
        </div>
        <div className={classes.footer}>
          {acordo.isFail ? <h5 className={[classes.fail, classes.statusAcordo].join(' ')}>Erro ao carregar proposta</h5> : null}
        </div>
      </Modal>
    );
  }
}


const mapStateToProps = state => ({
  acordo: state.acordo
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...acordoActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(PropostaAcordo));
