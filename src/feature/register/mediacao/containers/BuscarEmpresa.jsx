import React from 'react';
import bindActionCreators from 'redux/src/bindActionCreators';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import GridContainer from '../../../../core/components/grid/GridContainer';
import GridItem from '../../../../core/components/grid/GridItem';
import CustomInput from '../../../../core/components/CustomInput';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../../core/components/CustomButton';
import Table from '../../../../core/components/CustomTable';
import empresasTableStyle from '../../../../assets/jss/scenes/empresasTableStyle';
import Check from '@material-ui/icons/Check';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import CardIcon from '../../../../core/components/card/CardIcon';
import Assignment from '@material-ui/icons/Assignment';
import * as empresaActions from './services/buscarEmpresaActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EMPRESA_INVALIDA } from '../../../admin/mediacao/utils/mediacaoMessagesHelper';

const style = {
  ...empresasTableStyle,
  inputAdornment: {
    position: 'relative'
  },
  errorTextHelper: {
    textAlign: 'center',
    color: '#e21515',
    margin: 0,
  },
  searchTextHelper: {
    textAlign: 'center',
    color: '#19c61c',
  },
  checkCadastroEmpresa: {
    maxWidth: '100%',
    margin: 'auto',
  }
};

class BuscarEmpresa extends React.Component {

  state = {
    fantasia: '',
    solicitarCadastro: false,
    searchWithoutFillFields: false,
    checked: [],
    messageNext: '',
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    const oneEmpSelected = (this.state.checked.length === 1);

    if ((!oneEmpSelected) &&
      (this.props.mediacaoEmpresas.empresas.length === 0) &&
      (this.state.checked.length === 0) &&
      !this.state.solicitarCadastro) {
      this.setState({ messageNext: 'Não é possível avançar sem selecionar alguém ou solicitar o cadastro' });
    } else if (this.state.messageNext) {
      this.setState({ messageNext: '' });
    }

    return oneEmpSelected || this.state.solicitarCadastro;
  }

  handleCheck = prop => event => {
    this.setState({ [prop]: event.target.checked });
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      this.setState({
        solicitarCadastro: false,
      });

      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleBuscarClick = () => {
    if (this.state.fantasia !== '') {
      this.setState({
        searchWithoutFillFields: false,
        checked: []
      });

      this.props.actions.getEmpresas(this.state.fantasia);
    } else {
      this.setState({
        searchWithoutFillFields: true,
      });
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  handleGetDataGrid = () => {
    const { mediacaoEmpresas, classes } = this.props;
    let empresas = [];

    mediacaoEmpresas.empresas.forEach(element => {
      const empresa = [
        (mediacaoEmpresas.empresas.indexOf(element) + 1).toString(),
        <Checkbox
          className={classes.positionAbsolute}
          tabIndex={-1}
          onClick={() => this.handleToggle(mediacaoEmpresas.empresas.indexOf(element))}
          checkedIcon={<Check className={classes.checkedIcon} />}
          icon={<Check className={classes.uncheckedIcon} />}
          classes={{
            checked: classes.checked
          }}
        />,
        element.nome,
        element.fantasia,
        element.cnpj,
        element.endereco.estado.label,
        element.endereco.cidade.label
      ];

      empresas = empresas.concat([empresa]);
    });

    return empresas;
  }

  render() {
    const { classes, mediacaoEmpresas, mediacao } = this.props;

    return (
      <React.Fragment>
        <GridContainer justify='center'>
          <h5>Busque a pessoa ou a empresa a partir do nome e relate o motivo para iniciar a mediação</h5>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                error={this.state.searchWithoutFillFields}
                errorHelperText='Informe o nome da pessoa ou empresa'
                labelText='Nome para pesquisa'
                id='nome-fantasia'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.fantasia,
                  onChange: this.handleChange('fantasia')
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <Button
                className={classes.searchButton}
                onClick={this.handleBuscarClick}
                color='primary'
              >
                Buscar
            </Button>
            </GridItem>
          </GridContainer>
        </GridContainer>
        <GridContainer justify='center'>
          <GridItem xs={12}>
            <Card>
              <CardHeader color='primary' icon>
                <CardIcon color='primary'>
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Pessoas/Empresas <small>
                    {' '}
                    - Selecione a pessoa ou empresa a qual deseja iniciar a mediação.
                  </small>
                </h4>
              </CardHeader>
              <CardBody>
                <Table
                  striped
                  tableHead={[
                    '#',
                    '',
                    'Nome',
                    'Fantasia',
                    'CPF/CNPJ',
                    'Estado',
                    'Cidade',
                  ]}
                  tableData={this.handleGetDataGrid()}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customClassesForCells={[0, 5, 6]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customHeadClassesForCells={[0, 5, 6]}
                />
              </CardBody>
              { //TODO: Tá feio, ajustar uma hora, deus me livre
                (mediacao.errorCode === EMPRESA_INVALIDA) ?
                  <h5 className={classes.errorTextHelper}>
                    {mediacao.mensagem}
                  </h5>
                  : (((mediacaoEmpresas.empresas.length > 0) && (this.state.checked.length === 0)) ?
                    <h5 className={classes.errorTextHelper}>
                      Selecione uma empresa
                  </h5>
                    : (this.state.checked.length > 1) ?
                      <h5 className={classes.errorTextHelper}>
                        Selecione somente uma empresa
                  </h5>
                      : null)
                  ||
                  ((mediacaoEmpresas.buscando) ?
                    <h5 className={classes.searchTextHelper}>
                      {mediacaoEmpresas.message}
                    </h5> : null)
                  ||
                  ((!mediacaoEmpresas.buscando &&
                    !mediacaoEmpresas.encontrou &&
                    mediacaoEmpresas.message) ?
                    <h5 className={classes.errorTextHelper}>
                      {mediacaoEmpresas.message}
                    </h5> : null
                  )
                  ||
                  (this.state.messageNext !== '' &&
                    <h5 className={classes.errorTextHelper}>
                      {this.state.messageNext}
                    </h5>
                  )
              }
              <GridItem
                xs={12} sm={12} md={4}
                className={classes.checkCadastroEmpresa}
              >
                <h5>Não encontrou o que você deseja? Solicite o cadastro da mesma.</h5>
              </GridItem>
              <GridItem
                xs={12} sm={12} md={4}
                className={classes.checkCadastroEmpresa}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={this.handleCheck('solicitarCadastro')}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      disabled={(this.state.checked.length > 0)}
                      checked={(this.state.solicitarCadastro && (this.state.checked.length === 0))}
                      classes={{
                        checked: classes.checked,
                      }}
                    />
                  }
                  label='Solicitar cadastro'
                />
              </GridItem>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mediacaoEmpresas: state.empresa,
  mediacao: state.novaMediacao,
});

const mapDispatchProps = dispatch => ({
  actions: bindActionCreators({
    ...empresaActions,
  }, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchProps),
  withStyles(style)
)(BuscarEmpresa);