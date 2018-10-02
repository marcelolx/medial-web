import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as profileActions from '../../services/admin/profile/actions';


import * as authActions from '../../services/admin/authentication/actions';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import GridContainer from '../../components/Grid/GridContainer';
import CardHeader from '../../components/Card/CardHeader';
import CardAvatar from '../../components/Card/CardAvatar';
import CustomInput from '../../components/CustomInput';
import Snackbar from '../../components/Snackbar/Snackbar';
import Button from '../../components/CustomButtons/Button';
import defaultImage from '../../assets/images/avatar-default-icon.png'

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
  margin: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
  semMargem: {
    margin: 0,
  }
});

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      nome: ``,
      dataNascimento: ``,
      email: ``,
      dataCadastro: ``,
      ultimoAcesso: ``,
      telefone: ``,
      pais: ``,
      estado: ``,
      cidade: ``,
      rua: ``,
      cep: ``,
      bairro: ``,
      numero: ``,
      editar: true,
      alterarImagem: false,
      emailLogin: ``,
      senha: ``,
      senhaConfirmacao: ``
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    this.props.actions.loadProfile(this.props.auth.token);
  }
  atualizarPerfil(place) {

    let data = {
      nome: this.state.nome,
      email: this.state.email,
      telefone: this.state.telefone,
    }

    this.props.actions.salvarDadosBasicos(this.props.auth.token, data);


    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function () {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  componentDidUpdate() {

    if (this.state.id !== this.props.profileInfo.id) {
      this.setState({
        id: this.props.profileInfo.id,
        nome: this.props.profileInfo.nome,
        dataNascimento: this.props.profileInfo.dataNascimento,
        email: this.props.profileInfo.email,
        dataCadastro: this.props.profileInfo.dataCadastro,
        ultimoAcesso: this.props.profileInfo.ultimoAcesso,
        telefone: this.props.profileInfo.telefone,
        cidade: this.props.profileInfo.endereco.cidade.label,
        estado: this.props.profileInfo.endereco.estado.label,
        rua: this.props.profileInfo.endereco.rua,
        numero: this.props.profileInfo.endereco.numero,
        bairro: this.props.profileInfo.endereco.bairro,
        cep: this.props.profileInfo.endereco.cep,
        avatar: this.props.profileInfo.avatar,
        emailLogin: this.props.profileInfo.email,
        editar: true
      });
    }
  }
  alterarImagem = () => {
    this.setState({
      alterarImagem: true,
    });
  }

  render() {
    const { classes } = this.props;
    let inputValue;
    let valueButton;

    if (this.state.alterarImagem) {
      inputValue = <input type="file" />;
      valueButton = <Button color="success" round disabled>    Alterar   </Button>;
    } else {
      valueButton = <Button color="success" round onClick={this.alterarImagem}>
        Atualizar Imagem
                   </Button>;
    }
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Olá, {this.state.nome}</h4>
                <p className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Editar Perfil</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Nome"
                      inputProps={{
                        value: this.state.nome,
                        onChange: this.handleChange('nome')
                      }}
                      id="nome"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Telefone"
                      id="telefone"
                      inputProps={{
                        value: this.state.telefone,
                        onChange: this.handleChange('telefone')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      inputProps={{
                        value: this.state.email,
                        onChange: this.handleChange('email')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <Snackbar
                place="tc"
                color="warning"
                message="Sucesso! Seus dados foram atualizados.(Mentira, Ainda não. Até a Próxima)"
                open={this.state.tc}
                closeNotification={() => this.setState({ tc: false })}
                close
              />
              <Button color="secondary" onClick={() => this.atualizarPerfil("tc")}>Atualizar</Button>
            </Card>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Endereço</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Rua"
                      id="rua"
                      inputProps={{
                        value: this.state.rua,
                        onChange: this.handleChange('rua')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Número"
                      id="numero"
                      inputProps={{
                        value: this.state.numero,
                        onChange: this.handleChange('numero')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Bairro"
                      id="bairro"
                      inputProps={{
                        value: this.state.bairro,
                        onChange: this.handleChange('bairro')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Cidade"
                      id="cidade"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.cidade.label
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Estado"
                      id="estado"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.estado.label
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="CEP"
                      id="cep"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.cep,
                        onChange: this.handleChange('cep')
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <Button color="secondary" disabled >Alterar</Button>
            </Card>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email"
                      id="emailLogin"
                      inputProps={{
                        value: this.state.emailLogin,
                        onChange: this.handleChange('emailLogin')
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
                      labelText="Senha"
                      id="senha"
                      inputProps={{
                        type: 'password',
                        value: this.state.senha,
                        onChange: this.handleChange('senha')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Confirmação Senha"
                      id="senhaConfirmacao"
                      inputProps={{
                        type: 'password',
                        value: this.state.senhaConfirmacao,
                        onChange: this.handleChange('senhaConfirmacao')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <Button color="secondary" disabled>Alterar</Button>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardHeader color="info">
                <h4 className={[classes.cardTitleWhite, classes.semMargem].join(' ')}>Avatar</h4>
              </CardHeader>
              <CardAvatar profile>
                <img src={this.state.avatar || defaultImage} alt="Avatar do Usuário" />
              </CardAvatar>
              <CardBody profile>
                {inputValue}
                {valueButton}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profileInfo: state.profileInfo,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
    ...profileActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);
