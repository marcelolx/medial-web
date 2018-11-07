import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../../components/Card/CardBody';
import TextField from '@material-ui/core/TextField';
import CustomInput from '../../../../components/CustomInput';
import bindActionCreators from 'redux/src/bindActionCreators';
import * as mediacaoActions from '../../../../services/admin/mediacao/actions';
import { connect } from 'react-redux';
import queryString from 'query-string';

const style = ({
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

class Solicitacao extends React.PureComponent {

  componentDidMount() {
    this.props.actions.buscarMediacao(queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id);
  }

  getMediacaoValueOrDefault(prop) {
    return (this.props.mediacao.mediacao !== null) ? this.props.mediacao.mediacao[prop] : '';
  }

  render() {
    const { classes } = this.props;

    //When mediacao.failMessage === 'SEM_PERMISSAO_ACESSO_MEDIACAO' redirect to dashboard

    return(
      <React.Fragment>
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
                    value: '#' + this.getMediacaoValueOrDefault('protocolo'),
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
                    value: this.getMediacaoValueOrDefault('conflito'),
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
                    value: this.getMediacaoValueOrDefault('assunto'),
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
                  value={this.getMediacaoValueOrDefault('motivo')}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mediacao: state.mediacao
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...mediacaoActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps)
)(Solicitacao));