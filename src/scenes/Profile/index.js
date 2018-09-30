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
import Button from '../../components/CustomButtons/Button';
import {  } from '@material-ui/core';

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
});

class Profile extends Component {

  constructor(props) {
    super(props); 

    this.state ={
          id: this.props.profileInfo.id,
          nome: this.props.profileInfo.nome, 
          dataNascimento: this.props.profileInfo.dataNascimento, 
          email: this.props.profileInfo.email, 
          dataCadastro: this.props.profileInfo.dataCadastro, 
          ultimoAcesso: this.props.profileInfo.ultimoAcesso, 
          telefone: this.props.profileInfo.telefone, 
          endereco: this.props.profileInfo.endereco, 
          avatar: this.props.profileInfo.avatar, 
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
componentDidUpdate(){

  console.log('Falha')
}

render() {
    const { classes,profileInfo } = this.props;
    debugger
    return (
      <React.Fragment>
          <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Olá, {this.state.nome}</h4>
                    <p className={classes.cardTitleWhite}>Editar Perfil</p>
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
                          id="last-name"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
        
                      <GridItem xs={12} sm={12} md={7}>
                        <CustomInput
                          labelText="Email"
                          id="email-address"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Rua"
                          id="city"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Número"
                          id="country"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Bairro"
                          id="postal-code"
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
                          id="city"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Estado"
                          id="country"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="CEP"
                          id="postal-code"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                    <Button color="primary">Update Profile</Button>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                          <Card profile>
                            <CardAvatar profile>
                              <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={"https://meapaixonei.com.br/wp-content/uploads/2017/10/sinais-que-comprovam-que-voce-tem-se-tornado-uma-pessoa-melhor-a-cada-dia.jpg"} alt="..." />
                              </a>
                            </CardAvatar>
                          <CardBody profile>
                            <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                            <h4 className={classes.cardTitle}>Alec Thompson</h4>
                            <p className={classes.description}>
                              Don't be scared of the truth because we need to restart the
                              human foundation in truth And I love you like Kanye loves Kanye
                              I love Rick Owens’ bed design but the back is...
                            </p>
                            <Button color="primary" round>
                              Follow
                            </Button>
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
