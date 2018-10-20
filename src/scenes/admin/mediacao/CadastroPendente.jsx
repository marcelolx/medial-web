import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import PropTypes from "prop-types";
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../components/Card/CardBody';
import CustomInput from '../../../components/CustomInput';
import { TextMaskCNPJ, TextMaskCellPhone } from '../../../components/Masks';
import Button from '../../../components/CustomButtons/Button';
 

const styles = ({
  semMargen: {
    margin: 0,
  },
  statusCadastro: {
    marginTop: "3%",
    marginBottom: "3px",
    textAlign: "center"
  },
  botaoEnviar: {
    position: 'inherit',
    float: 'right',
  },
  botaoCadastroSolicitado: {
    flexBasis: '100%',
  }
});

//No menu ficaria --> Mediacao -> Cadastros Pendentes
//url: /mediacao/cadastropendente/id
class CadastroPendente extends React.Component {  
  constructor(props) {
    super(props);
    console.log(this.props);
    
    this.state = {
      mensagemHistorico: '',
      confirmacaoCadastroSolicitada: false,
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleEnviaMensagemHistorico() {
    console.log('Envia mensagem');
  }

  handleConfirmarSolicitacaoCadastro() {
    console.log('Confirmar solciitação de cadastro');
  }

  render() {
    const { classes, transacionadorPendente } = this.props;

    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Cadastro Empresa Pendente</h4>
                <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>{"Empresa:" && (transacionadorPendente !== null) ? transacionadorPendente.nome : 'Empresa: Nome da empresa aqui'}</p>
              </CardHeader>
              <CardBody>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Protocolo"
                          inputProps={{
                            //value: this.state.nome,
                            value: '#16102018123456',
                            disabled: true,
                          }}
                          id="protocolo"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Nome do Solicitante"
                          inputProps={{
                            //value: this.state.nome,
                            value: 'Marcelo Lauxen',
                            disabled: true,
                          }}
                          id="nome-solicitante"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Data da solicitação"
                          inputProps={{
                            //value: this.state.nome,
                            value: '16/10/2018',
                            disabled: true,
                          }}
                          id="data-solicitacao"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Nome do Requerido"
                          inputProps={{
                            //value: this.state.nome,
                            value: 'Sysmo Sistemas LTDA',
                            disabled: true,
                          }}
                          id="nome-requerido"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput                      
                          labelText="CNPJ"
                          id="cnpj-empresa"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            //value: this.state.cnpj,
                            value: '22.222.222/0001-22',
                            inputComponent: TextMaskCNPJ
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput                      
                          labelText="E-mail"
                          id="email-empresa"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            //value: this.state.cnpj,
                            value: 'oktoberfest@seila.com.br  ',
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput                      
                          labelText="Telefone"
                          id="telefone-empresa"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            //value: this.state.cnpj,
                            value: '(49) 9 9946-2839',
                            inputComponent: TextMaskCellPhone
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        <h4 className={classes.statusCadastro}>
                          Cadastro não solicitado
                        </h4>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <CustomInput                      
                          labelText="Mensagem de histórico"
                          id="msg-historico-cadastro"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: this.state.mensagemHistorico,
                            onChange: this.handleChange('mensagemHistorico')
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Button 
                          color="secondary" 
                          className={classes.botaoEnviar}
                          onClick={() => this.handleEnviaMensagemHistorico()}
                        >
                          Enviar                          
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Button 
                  color="secondary"
                  fullWidth
                  onClick={() => this.handleConfirmarSolicitacaoCadastro()}
                  disabled={this.state.confirmacaoCadastroSolicitada}
                >
                  Confirmar a solicitação de cadastro
                </Button>
                <Card>
                  <CardHeader color="primary">
                    <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Histórico</p>
                  </CardHeader>
                  <CardBody>
                    <Card>
                      <CardBody>
                        Mediador: Administrador NPJ<br/>
                        Status: Cadastro Solicitado<br/>
                        Mensagem: Entrado em contato e solicitado cadastro
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        Mediador: Administrador NPJ<br/>
                        Status: Cadastro Solicitado<br/>
                        Mensagem: Entrado em contato novamente, para solicitar o cadastro
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        Mediador: Administrador NPJ<br/>
                        Status: Cadastro Solicitado<br/>
                        Mensagem: Auxílio cadastro
                      </CardBody>
                    </Card>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

CadastroPendente.defaultProps = {
  transacionadorPendente: null
}

CadastroPendente.propTypes = {
  transacionadorPendente: PropTypes.object,
};

export default withRouter(withStyles(styles)(CadastroPendente));