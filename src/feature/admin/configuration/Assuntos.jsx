import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridItem from '../../../core/components/grid/GridItem';
import Card from '../../../core/components/card/Card';
import CardBody from '../../../core/components/card/CardBody';
import Person from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Modal from 'react-responsive-modal';

import CustomInput from '../../../core/components/CustomInput';
import CardHeader from '../../../core/components/card/CardHeader';
import Button from '../../../core/components/CustomButton';
import Table from '../../../core/components/CustomTable';
import CardIcon from '../../../core/components/card/CardIcon';
import SearchSelect from '../../../core/components/SearchSelect';
import verifyLength from '../../../core/utils/utils';

import * as configuracaoActions from './services/configurationActions'
import API from '../../../core/http/API';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  textRight: {
    textAlign: 'right',
  },
  right: {
    float: 'right',
  },
  center: {
    textAlign: 'center'
  },
  description: {
    maxWidth: '150px'
  },
  actionButton: {
    margin: '0 0 0 5px',
    padding: '5px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px'
    }
  },
  icon: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    top: '-1px',
    position: 'relative'
  },
  marginZero: {
    margin: '0',
  },
  paddingGrid: {
    padding: '0 5px',
  },
  titleCard: {
    width: '100px',
    float: 'left',
    marginTop: '10px',
    fontWeight: 300,
    color: '#3C4858'
  },
  modal: {
    padding: '35px 25px 15px 25px'
  },
  overlay: {
    zIndex: 99999,
  },
  closeButton: {
    cursor: 'pointer'
  }
});
class Assuntos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      assuntoState: '',
      assunto: '',
      atualizar: true,
      modalAssunto: false,
      codigo: null,
      mensagemErro: '',
    }
    this.changeModal = this.changeModal.bind(this);
  }



  changeModal(openAction) {
    openAction && this.props.actions.getConflitos();
    this.setState({ modalAssunto: !this.state.modalAssunto });
  }

  atualizarConflito = linha => {
    this.setState({
      conflito: linha.conflito,
      codigo: linha.id,
      conflitoState: 'success',
    })

    this.changeModal();
  }

  onBlurModal = () => {
    this.setState({
      codigo: null,
      conflitoState: 'error',
      conflitoAssuntoState: 'error',
      assuntoState: 'error',
      conflitoAssunto: null,
      conflito: ``,
      assunto: ``,
      mensagemErro: null,

    })
  }
  atualizarAssunto = linha => {
    this.setState({
      conflitoAssunto: { 'value': linha.codigoConflito, 'label': linha.conflito },
      assunto: linha.assunto,
      conflitoAssuntoState: 'success',
      assuntoState: 'success',
      codigo: linha.id,
    })
    this.changeModal();
  }

  componentDidMount() {
    this.props.actions.getConfiguracaoAssuntos();
  }


  async salvarAssunto() {
    this.setState({ 'mensagemErro': null })
    if (this.state.conflitoAssuntoState === 'error' || this.state.assuntoState === 'error') {
      this.setState({ 'mensagemErro': 'Favor, revisar os campos para continuar' })
      return;
    }

    let data = {
      id: this.state.codigo,
      assunto: this.state.assunto,
      codigoConflito: this.state.conflitoAssunto.value,
    }
    API.put('/admin/assunto', data)
      .then(response => {
        if (response.data.valor) {
          this.props.actions.getConfiguracaoAssuntos();
          this.changeModal();
        }
      }).catch(err => {
        if (err.response && err.response.data.message === 'ASSUNTO_DESCRICAO_EXISTE') {
          this.setState({ assuntoState: 'error', mensagemErro: 'Assunto já existente. Altere o assunto para continuar.' })
        }
      });

  }


  stateSuccess(stateName) {
    this.setState({ [stateName + 'State']: 'success' });
  }

  stateError(stateName) {
    this.setState({ [stateName + 'State']: 'error' });
  }

  change(event, stateName, type, min, max) {

    switch (type) {
      case 'texto':
        if (verifyLength(event.target.value, 3)) {
          this.stateSuccess(stateName);
        } else {
          this.stateError(stateName);
        }
        break;
      case 'range':

        if (verifyLength(event.target.value, min) && !verifyLength(event.target.value, max)) {
          this.stateSuccess(stateName);
        } else {
          this.stateError(stateName);
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  handleSelectChange = name => selecionado => {
    this.setState({
      [name]: selecionado
    });
    if (selecionado.length !== 0) {
      this.stateSuccess(name);
    } else {
      this.stateError(name);
    }
  }


  atribuirBotoes = () => {

    return this.props.configuracao.assuntos !== undefined
      ? this.props.configuracao.assuntos.map((prop, key) => {
        return {
          id: prop.id,
          assunto: prop.assunto,
          conflito: prop.conflito,
          actions: (
            <div>
              {
                <Button color='success' className={this.props.classes.actionButton} key={key} onClick={() => this.atualizarAssunto(prop)}>
                  <Edit />
                </Button>
              }
            </div>
          )
        }
      }).map(n => [
        n.id,
        n.assunto,
        n.conflito,
        n.actions
      ]
      )
      : []
  }

  render() {
    const { classes } = this.props;
    const { conflitosAssuntos } = this.props.configuracao;

    return (
      <GridItem xs={12} sm={12} md={6} className={classes.paddingGrid}>
        <Card>
          <CardHeader color='primary' icon>
            <CardIcon color='primary'>
              <Person />
            </CardIcon>
            <h4 className={[classes.marginZero, classes.titleCard].join(` `)}> Assuntos</h4>
            <Button color='primary' className={classes.right} onClick={() => this.changeModal('open')}>Novo Assunto</Button>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={[
                '#',
                'Assunto',
                'Conflito',
                'Acões'
              ]}
              tableData={this.atribuirBotoes()}
              customCellClasses={[
                classes.center,
                classes.textRight,
              ]}
              customClassesForCells={[0, 3]}
              customHeadCellClasses={[
                classes.center,
                classes.textRight,
              ]}
              customHeadClassesForCells={[0, 3]}
            />
          </CardBody>

          <Modal open={this.state.modalAssunto} classNames={classes} onExited={this.onBlurModal} onClose={() => this.changeModal()} center>
            <SearchSelect
              opcoes={conflitosAssuntos || []}
              name='conflitoAssunto'
              onChange={(name, value) => this.handleSelectChange(name, value)}
              value={this.state.conflitoAssunto}
              placeholder='Conflitos'
              formControlProps={{
                fullWidth: true,
              }}
              error={this.state.conflitoAssuntoState === 'error'}
              errorHelperText='Selecione o conflito'
            />
            <CustomInput
              success={this.state.assuntoState === 'success'}
              error={this.state.assuntoState === 'error'}
              labelText='Assunto *'
              id='assunto'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.assunto,
                onChange: event =>
                  this.change(event, 'assunto', 'range', 3, 25)
              }}
              errorHelperText='Informe o nome do assunto'
            />
            <p>{this.state.mensagemErro && this.state.assuntoState === 'error' ? this.state.mensagemErro : null}</p>
            <Button color='secondary' className={classes.right} onClick={() => this.salvarAssunto()}>Salvar Assunto</Button>
          </Modal>
        </Card>
      </GridItem>
    );
  }
}

Assuntos.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
  configuracao: state.configuracao,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...configuracaoActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Assuntos)); 