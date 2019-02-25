import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../../core/components/grid/GridContainer';
import GridItem from '../../../../core/components/grid/GridItem';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../../core/components/card/CardBody';
import CustomInput from '../../../../core/components/CustomInput';
import bindActionCreators from 'redux/src/bindActionCreators';
import * as mediacaoActions from '../services/mediacaoActions';
import { connect } from 'react-redux';
import queryString from 'query-string';
import ReactQuill from 'react-quill';
import buttonStyle from '../../../../assets/jss/components/buttonStyle';


const style = ({
  ...buttonStyle,
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

  _handleDashboard(){
    this.props.history.push(`/`);
  }

  render() {
    const { classes, mediacao } = this.props;

    //When mediacao.failMessage === 'SEM_PERMISSAO_ACESSO_MEDIACAO' redirect to dashboard

    const al = <SweetAlert
      error
      style={{ display: 'block', color: `#222` }}
      onConfirm={() => this._handleDashboard()}
      confirmBtnCssClass={
        classes.button + ' ' + classes.warning
      }
      confirmBtnText='MENU INICIAL'
      showCancel={false}
    >
      <h4>{`Você não tem permissão para acessar essa mediação`}</h4>
    </SweetAlert>;

    return (
      <React.Fragment>
        {mediacao.failMessage === 'SEM_PERMISSAO_ACESSO_MEDIACAO'? al :null}
        <Card>
          <CardHeader color='success'>
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mediação</h4>
          </CardHeader>
          <CardBody>
            <GridContainer justify='center'>
              <GridItem
                xs={12} sm={12} md={2} lg={2}
                className={classes.gridItemMargin}
              >
                <CustomInput
                  labelText='Protocolo'
                  inputProps={{
                    value: '#' + this.getMediacaoValueOrDefault('protocolo'),
                    disabled: true
                  }}
                  className={classes.inputCenterText}
                  id='protocolo'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText='Conflito'
                  inputProps={{
                    value: this.getMediacaoValueOrDefault('conflito'),
                    disabled: true,
                  }}
                  id='conflito'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText='Assunto'
                  inputProps={{
                    value: this.getMediacaoValueOrDefault('assunto'),
                    disabled: true,
                  }}
                  id='assunto'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={9} lg={9}>
                <ReactQuill style={{ height: 145 }} value={this.getMediacaoValueOrDefault('motivo')}
                  readOnly
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