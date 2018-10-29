import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../components/Card/CardBody';
import FaceIcon from '@material-ui/icons/Face';
import CustomChip from '../../../components/Chip/Chip';
import CardFooter from '../../../components/Card/CardFooter';
import Button from '../../../components/CustomButtons/Button';
import TextField from '@material-ui/core/TextField';
import CustomInput from '../../../components/CustomInput';
import AttachFile from '@material-ui/icons/AttachFile'

const style = theme => ({
  semMargen: {
    margin: 0,
  },
  marginChip:{
    margin: '5px'
  },
  icon: {
    color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
    marginLeft: 4,
    marginRight: 'auto'
  },
  cardPropostas: {
    height: '250px'
  },
  cardMensagens: {
    height: '478px'
  },
  multilineTextField: {
    width: '100%'
  },
  inputCenterText: {
    textAlign: 'center'
  },
  gridItemStyle: {
    minWidth: '50px'
  },
  botaoEnviar: {
    width: '85px',
    marginLeft: '5px'
  },
  botaoAnexar: {
    marginLeft: '25px'
  },
  mensagemEnviada: {
    align: 'right'
  }
});

class Mediacao extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={9} lg={9}>
            <Card>
              <CardHeader color="success">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mediação</h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem 
                    xs={12} sm={12} md={2} lg={2}
                    className={classes.gridItemMargin}
                  >
                    <CustomInput
                      labelText="Protocolo"
                      inputProps={{
                        value: '#201810281',
                        disabled: true
                      }}
                      className={classes.inputCenterText}
                      id="protocolo"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <CustomInput
                      labelText="Conflito"
                      inputProps={{
                        value: 'Produto',
                        disabled: true,
                      }}
                      id="conflito"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <CustomInput
                      labelText="Assunto"
                      inputProps={{
                        value: 'Aleatório',
                        disabled: true,
                      }}
                      id="assunto"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9} lg={9}>
                    <TextField
                      label="Motivo"
                      multiline
                      disabled
                      rows="10"
                      className={classes.multilineTextField}
                      margin="normal"
                      variant="outlined"
                      value="Valor teste"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            <Card 
              className={classes.cardMensagens}
            >
              <CardHeader color="success">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mensagens</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      icon={<FaceIcon className={classes.icon}/>}
                      label="Medial LTDA"
                      multiline
                      disabled
                      rows="2"
                      className={classes.multilineTextField}
                      margin="normal"
                      variant="outlined"
                      value="Essa é uma mensagem teste recebida"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomChip
                      icon={<FaceIcon className={classes.icon}/>}
                      label="Essa é uma mensagem teste enviada"
                      variant="outlined"
                      className={classes.mensagemEnviada}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <CustomInput 
                  labelText="Mensagem"
                  inputProps={{

                  }}
                  id="input-mensagem"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <Button
                  justIcon
                  color="secondary"
                  className={classes.botaoAnexar}
                >
                  <AttachFile />
                </Button>
                <Button   
                  className={classes.botaoEnviar}
                  color="secondary"
                >
                  Enviar
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3} lg={3}>
            <Card>
              <CardHeader color="success">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Situação</h4>
                <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Em Andamento</p>
              </CardHeader>
              <CardBody>
                <CustomChip
                  icon={<FaceIcon className={classes.icon}/>}
                  label="Requerente: Marcelo Lauxen"
                  color="success"
                  variant="outlined"
                  width="fullWidth"
                  className={classes.marginChip}
                />
                <CustomChip
                  icon={<FaceIcon className={classes.icon}/>}
                  label="Requerido: Medial LTDA"
                  color="success"
                  variant="outlined"
                  width="fullWidth"
                  className={classes.marginChip}
                />
                <CustomChip
                  icon={<FaceIcon className={classes.icon}/>}
                  label="Mediador: Fernanda Trentin"
                  clickable
                  color="success"
                  variant="outlined"
                  width="fullWidth"
                  className={classes.marginChip}
                />
                <CustomChip
                  icon={<FaceIcon className={classes.icon}/>}
                  label="Negociador: Fulano"
                  color="success"
                  variant="outlined"
                  width="fullWidth"
                  className={classes.marginChip}
                />
              </CardBody>
            </Card>
            <Card 
              className={classes.cardPropostas}
            >
              <CardHeader color="success">
                <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Propostas de acordo</p>
              </CardHeader>
              <CardBody>
                  
              </CardBody>
              <CardFooter>
                <Button fullWidth>Propor Acordo</Button>
              </CardFooter>
            </Card>
            <Card 
              className={classes.cardPropostas}
            >
              <CardHeader color="success">
                <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Anexos</p>
              </CardHeader>
              <CardBody>
                  
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(compose(
  withStyles(style)
)(Mediacao));