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
class Conflitos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      conflitoState: '',
      conflito: '',
      atualizar: true,
      modalConflito: false,
      codigo: null,
      mensagemErro: '',
    }
    this.changeModal = this.changeModal.bind(this);
  }



  changeModal() {
    this.setState({ modalConflito: !this.state.modalConflito });
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
      mensagemErro: null,

    })
  }

  componentDidMount() {
    this.props.actions.getConfiguracaoConflitos();
  }

  salvarConflito = () => {
    this.setState({ 'mensagemErro': null })

    if (this.state.conflitoState === 'error') {
      this.setState({ 'mensagemErro': 'Favor, revisar os campos para continuar' })
      return;
    }

    let data = {
      id: this.state.codigo,
      conflito: this.state.conflito,
    }
    API.put('/admin/conflito', data)
      .then(response => {
        if (response.data.valor) {
          this.props.actions.getConfiguracaoConflitos();
          this.changeModal();
        }
      }).catch(err => {
        if (err.response && err.response.data.message === 'CONFLITO_EXISTENTE') {
          this.setState({ conflitoState: 'error', mensagemErro: 'Conflito existente. Tente com outro nome.' })
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
    const { classes } = this.props;
    return this.props.configuracao.conflitos
      ? this.props.configuracao.conflitos.map((prop, key) => {
        return {
          id: prop.id,
          conflito: prop.conflito,
          actions: (
            <div>
              {
                <Button color='success' className={classes.actionButton} key={key} onClick={() => this.atualizarConflito(prop)}>
                  <Edit />
                </Button>
              }
            </div>
          )
        }
      }).map(
        n =>
          [
            n.id,
            n.conflito,
            n.actions
          ]
      )
      : []

  }

  render() {
    const { classes } = this.props;

    return (
      <GridItem xs={12} sm={12} md={6} className={classes.paddingGrid}>
        <Card>
          <CardHeader color='primary' icon>
            <CardIcon color='primary'>
              <Person />
            </CardIcon>
            <h4 className={[classes.marginZero, classes.titleCard].join(` `)}> Conflitos</h4>
            <Button color='primary' className={classes.right} onClick={() => this.changeModal()}>Novo Conflito</Button>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={[
                '#',
                'Conflitos',
                'Acões'
              ]}
              tableData={this.atribuirBotoes()}
              customCellClasses={[
                classes.center,
                classes.textRight,
              ]}
              customClassesForCells={[0, 2]}
              customHeadCellClasses={[
                classes.center,
                classes.textRight,
              ]}
              customHeadClassesForCells={[0, 2]}
            />
            <Modal open={this.state.modalConflito} classNames={classes} onExited={() => this.onBlurModal()} onClose={() => this.changeModal()} center>

              <CustomInput
                success={this.state.conflitoState === 'success'}
                error={this.state.conflitoState === 'error'}
                labelText='Conflito *'
                id='conflito'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.conflito,
                  onChange: event =>
                    this.change(event, 'conflito', 'range', 3, 25)
                }}
              />
              <p>{this.state.mensagemErro && this.state.conflitoState === 'error' ? this.state.mensagemErro : null}</p>
              <Button className={classes.right} color='secondary' onClick={this.salvarConflito}>Salvar Conflito</Button>
            </Modal>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

Conflitos.propTypes = {
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
)(Conflitos)); 