import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as profileActions from './services/profileActions';
import * as estadosActions from '../../core/services/graphql/estados/estadosActions';
import * as cidadesActions from '../../core/services/graphql/cidades/cidadesActions';
import * as authActions from '../../core/services/authentication/loginActions';

import { replaceNaoNumeros, verifyEmail } from '../../core/utils/utils';
import Loader from '../../core/components/Loader';

import GridItem from '../../core/components/grid/GridItem';
import Card from '../../core/components/card/Card';
import CardBody from '../../core/components/card/CardBody';
import GridContainer from '../../core/components/grid/GridContainer';
import CardHeader from '../../core/components/card/CardHeader';
import CustomInput from '../../core/components/CustomInput';
import SearchSelect from '../../core/components/SearchSelect';
import Snackbar from '../../core/components/snackbar/Snackbar';
import Button from '../../core/components/CustomButton';
import ImageUpload from '../../core/components/ImageUpload';
import { TextMaskCellPhone } from '../../core/components/Masks';
import API from '../../core/http/API';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
  semMargem: {
    margin: 0,
  },
  semPadding: {
    padding: '0px 5px',
  }
});

class Profile extends Component {

  state = {
    nomeState: '',
    emailState: '',
    telefoneState: '',
    ruaState: '',
    numeroState: '',
    bairroState: '',
    estadoState: '',
    cidadeState: '',
    cepState: '',
    emailLoginState: '',
    senhaState: '',
    senhaConfirmacaoState: '',

    id: null,
    nome: ``,
    dataNascimento: ``,
    email: ``,
    documento: ``,
    dataCadastro: ``,
    ultimoAcesso: ``,
    telefone: ``,
    pais: ``,
    estado: [],
    cidade: [],
    rua: ``,
    cep: ``,
    bairro: ``,
    numero: ``,
    editar: true,
    alterarImagem: false,
    emailLogin: ``,
    senha: ``,
    senhaConfirmacao: ``,
    primeiraRiquisicao: true,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp('^[0-9]+$');
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }

  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }


  change(event, stateName, type) {
    switch (type) {
      case 'email':
        if (verifyEmail(event.target.value)) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      case 'senha':
        if (this.verifyLength(event.target.value, 8)) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      case 'texto':
        if (this.verifyLength(event.target.value, 3)) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      case 'senhaConfirmacao':
        if (this.verifyLength(event.target.value, 8) && this.compare(event.target.value, this.state.senha)) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      case 'numero':
        if (this.verifyNumber(event.target.value)) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      case 'telefone':
        let telefone = replaceNaoNumeros(event.target.value.toString());
        if (
          telefone.length >= 10 &&
          telefone.length <= 11
        ) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      case 'cep':
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value.toString().length === 8
        ) {
          this.setState({
            [stateName + 'State']: 'success'
          });
        } else {
          this.setState({
            [stateName + 'State']: 'error'
          });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case 'checkbox':
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }

  componentDidMount() {
    this.props.actions.loadProfile(this.props.auth.token);
    this.props.actions.getCountryStates(1);
  }
  atualizarPerfil() {

    if (this.state.nomeState === 'error' || this.state.emailState === 'error' || this.state.telefoneState === 'error') {
      this.errorNotification();
      return;
    }

    let data = {
      nome: this.state.nome,
      email: this.state.email,
      telefone: replaceNaoNumeros(this.state.telefone),
    }

    this.props.actions.salvarDadosBasicos(data);
  }

  atualizarEndereco() {

    if (this.state.ruaState === 'error'
      || this.state.numeroState === 'error'
      || this.state.cepState === 'error'
      || this.state.bairroState === 'error'
      || this.state.cidadeState === 'error'
      || this.state.estadoState === 'error') {
      this.errorNotification();
      return;
    }
    let data = {
      rua: this.state.rua,
      numero: this.state.numero,
      cep: this.state.cep,
      bairro: this.state.bairro,
      cidade: this.state.cidade,
      estado: this.state.estado,
    }

    this.props.actions.atualizarDadosEndereco(data);
  }

  atualizarLogin() {

    if (this.state.senhaState.length === 0
      || this.state.senhaConfirmacaoState.length === 0) {
      this.setState({ senhaState: 'error', senhaConfirmacaoState: 'error' })
      this.errorNotification();
      return;
    }
    if (this.state.senhaState === 'error'
      || this.state.senhaConfirmacaoState === 'error'
      || this.state.emailLogin === 'error') {
      this.errorNotification();
      return;
    }
    let data = {
      email: this.state.email,
      senha: this.state.senha,
      senhaConfirmacao: this.state.senhaConfirmacao,
    }


    this.props.actions.atualizarDadosLogin(data);
  }

  errorNotification() {

    this.setState({ 'errorNotification': true });
    this.notification('errorNotification');
  }

  componentDidUpdate() {

    if (this.state.id !== this.props.profileInfo.id) {
      this.setState({
        id: this.props.profileInfo.id,
        nome: this.props.profileInfo.nome,
        dataNascimento: this.props.profileInfo.dataNascimento,
        email: this.props.profileInfo.email,
        documento: this.props.profileInfo.documento,
        dataCadastro: this.props.profileInfo.dataCadastro,
        ultimoAcesso: this.props.profileInfo.ultimoAcesso,
        telefone: this.props.profileInfo.telefone,
        cidade: this.props.profileInfo.endereco.cidade,
        estado: this.props.profileInfo.endereco.estado,
        rua: this.props.profileInfo.endereco.rua,
        numero: this.props.profileInfo.endereco.numero,
        bairro: this.props.profileInfo.endereco.bairro,
        cep: this.props.profileInfo.endereco.cep,
        avatar: this.props.profileInfo.avatar,
        emailLogin: this.props.profileInfo.emailLogin,
        editar: true
      });
    }

    if (this.state.primeiraRiquisicao) {

      if (this.props.estados.list != null && this.props.estados.list.length > 0) {

        this.buscarCidades(this.state.estado.value || 24);
        this.setState({
          'primeiraRiquisicao': false
        });
      }
    }

  }

  handleSelectChange = name => selecionado => {
    this.setState({
      [name]: selecionado
    });
    if (selecionado.length !== 0) {
      this.setState({
        [name + 'State']: 'success'
      });
    } else {
      this.setState({
        [name + 'State']: 'error'
      });
    }
    if (name === 'estado') {
      this.setState({
        'cidade': []
      });
      this.setState({
        'cidadeState': 'error'
      });
      this.buscarCidades(selecionado.value)
    }

  }

  buscarCidades(cidade) {
    if (cidade !== undefined) {

      this.props.actions.getStateCities(cidade);
    }
  }


  limparListasCidades() {
    this.setState({
      cidade: []
    });
    this.props.actions.clearCidades();
  }

  alterarImagem = () => {
    this.setState({
      alterarImagem: true,
    });
  }

  notification(stat) {
    var x = [];
    x[stat] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function () {
        x[stat] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }


  notificationCloseAuto() {
    setTimeout(
      function () {
        this.props.actions.closeNotification()
      }.bind(this),
      6000
    );
  }

  alteracaoStatus(status) {
    this.notificationCloseAuto();
    return <Snackbar
      place='tr'
      color={status ? 'success' : 'warning'}
      message={status ? 'Seus dados foram atualizados' : 'Erro! Não foi possivel atualizar os dados...'}
      open
      closeNotification={() => this.props.actions.closeNotification()}
      close
    />
  }

  _uploadFile(file) {

    this.props.actions.carregando();
    let formData = new FormData();
    formData.append('file', file);

    API.post('/profile/uploadAvatar', formData)
      .then(response => {
        this.props.actions.carregandoFinish(true);
        this.props.actions.openNotification();

      })
      .catch(err => {
        this.props.actions.carregandoFinish(false);
        this.props.actions.openNotification();
      });


  }

  render() {
    const { classes, cidades, estados, profileInfo } = this.props;

    return (
      <React.Fragment>

        {profileInfo.exibirAlteracao ? this.alteracaoStatus(profileInfo.sucessoAlteracao) : null}

        <Loader open={profileInfo.carregando} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.semPadding}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Olá, {this.state.nome}</h4>
                <p className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Editar Perfil</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      success={this.state.nomeState === 'success'}
                      error={this.state.nomeState === 'error'}
                      labelText='Nome *'
                      inputProps={{
                        value: this.state.nome,
                        onChange: event =>
                          this.change(event, 'nome', 'texto')
                      }}
                      id='nome'
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText='CPF/CNPJ *'
                      id='documento'
                      inputProps={{
                        value: this.state.documento,
                        disabled: true
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                      disabled
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      success={this.state.telefoneState === 'success'}
                      error={this.state.telefoneState === 'error'}
                      labelText='Celular *'
                      id='telefone'
                      inputProps={{
                        value: this.state.telefone,
                        onChange: event =>
                          this.change(event, 'telefone', 'telefone'),
                        inputComponent: TextMaskCellPhone
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      success={this.state.emailState === 'success'}
                      error={this.state.emailState === 'error'}
                      labelText='Email *'
                      id='email'
                      inputProps={{
                        value: this.state.email,
                        onChange: event =>
                          this.change(event, 'email', 'email')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button color='secondary' onClick={() => this.atualizarPerfil()}>Atualizar Perfil</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color='primary'>
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Endereço</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      success={this.state.ruaState === 'success'}
                      error={this.state.ruaState === 'error'}
                      labelText='Rua'
                      id='rua'
                      inputProps={{
                        value: this.state.rua,
                        onChange: event =>
                          this.change(event, 'rua', 'texto')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.numeroState === 'success'}
                      error={this.state.numeroState === 'error'}
                      labelText='Número'
                      id='numero'
                      inputProps={{
                        value: this.state.numero,
                        onChange: event =>
                          this.change(event, 'numero', 'numero')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.bairroState === 'success'}
                      error={this.state.bairroState === 'error'}
                      labelText='Bairro'
                      id='bairro'
                      inputProps={{
                        value: this.state.bairro,
                        onChange: event =>
                          this.change(event, 'bairro', 'texto')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer justify='center'>
                  <GridItem xs={12} sm={12} md={4}>
                    <SearchSelect
                      opcoes={estados.list}
                      name='estado'
                      onChange={(name, value) => this.handleSelectChange(name, value)}
                      value={this.state.estado}
                      placeholder='Estados'
                      formControlProps={{
                        fullWidth: true
                      }}
                      error={this.state.estadoState === 'error'}
                      errorHelperText='Selecione o estado'
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <SearchSelect
                      opcoes={cidades.list}
                      name='cidade'
                      onChange={(name, value) => this.handleSelectChange(name, value)}
                      value={this.state.cidade}
                      placeholder='Cidades'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      error={this.state.cidadeState === 'error'}
                      errorHelperText='Selecione a cidade'
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      success={this.state.cepState === 'success'}
                      error={this.state.cepState === 'error'}
                      labelText='CEP'
                      id='cep'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.cep,
                        onChange: event =>
                          this.change(event, 'cep', 'cep')
                      }}
                    />
                  </GridItem>
                </GridContainer>  <Button color='secondary' onClick={() => this.atualizarEndereco()} >Alterar endereço</Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.semPadding}>
            <Card profile>
              <CardHeader color='primary'>
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Avatar</h4>
              </CardHeader>
              <CardBody profile>
                <GridContainer justify='center'>
                  <GridItem xs={12} sm={12} md={12}>
                    <ImageUpload
                      upload={(file) => this._uploadFile(file)}
                      imagem={this.state.avatar}
                      adicionarButtonProps={{
                        color: 'secondary',
                        round: true
                      }}
                      alterarButtonProps={{
                        color: 'secondary',
                        round: true
                      }}
                      removerButtonProps={{
                        color: 'danger',
                        round: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            <Card profile>
              <CardHeader color='primary'>
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      success={this.state.emailLoginState === 'success'}
                      error={this.state.emailLoginState === 'error'}
                      labelText='Email'
                      id='emailLogin'
                      inputProps={{
                        value: this.state.emailLogin,
                        onChange: event =>
                          this.change(event, 'emailLogin', 'email')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.senhaState === 'success'}
                      error={this.state.senhaState === 'error'}
                      labelText='Senha'
                      id='senha'
                      inputProps={{
                        type: 'password',
                        value: this.state.senha,
                        onChange: event =>
                          this.change(event, 'senha', 'senha')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.senhaConfirmacaoState === 'success'}
                      error={this.state.senhaConfirmacaoState === 'error'}
                      labelText='Confirmação Senha'
                      id='senhaConfirmacao'
                      inputProps={{
                        type: 'password',
                        value: this.state.senhaConfirmacao,
                        onChange: event =>
                          this.change(event, 'senhaConfirmacao', 'senhaConfirmacao')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button color='secondary' onClick={() => this.atualizarLogin()}>Alterar acesso</Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          place='tc'
          color='warning'
          message='Erro! Campos estão inválidos'
          open={this.state.errorNotification}
          closeNotification={() => this.setState({ errorNotification: false })}
          close
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  profileInfo: state.profileInfo,
  cidades: state.cidades,
  estados: state.estados,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
    ...profileActions,
    ...cidadesActions,
    ...estadosActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);