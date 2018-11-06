import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../components/Card/CardBody';
import TextField from '@material-ui/core/TextField';
import CustomInput from '../../../components/CustomInput';
import Situacao from './components/Situacao';
import Acordos from './components/Acordos';
import Anexos from './components/Anexos';
import Mensagens from './components/Mensagens';

const style = theme => ({
  semMargen: {
    margin: 0,
  },
  multilineTextField: {
    width: '100%'
  },
  inputCenterText: {
    textAlign: 'center'
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
            <Mensagens />
          </GridItem>
          <GridItem xs={12} sm={12} md={3} lg={3}>
            <Situacao />
            <Acordos />
            <Anexos />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(compose(
  withStyles(style)
)(Mediacao));