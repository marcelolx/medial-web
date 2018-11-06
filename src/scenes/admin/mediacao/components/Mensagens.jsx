import React from 'react';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import TextField from '@material-ui/core/TextField';
import CustomInput from '../../../../components/CustomInput';
import withStyles from '@material-ui/core/styles/withStyles';
import FaceIcon from '@material-ui/icons/Face';
import CustomChip from '../../../../components/Chip/Chip';
import CardFooter from '../../../../components/Card/CardFooter';
import Button from '../../../../components/CustomButtons/Button';
import AttachFile from '@material-ui/icons/AttachFile'

const style = theme => ({  
  cardMensagens: {
    height: '478px'
  },
  semMargen: {
    margin: 0,
  },
  multilineTextField: {
    width: '100%'
  },
  icon: {
    color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
    marginLeft: 4,
    marginRight: 'auto'
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

class Mensagens extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Card className={classes.cardMensagens}>
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
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Mensagens);