import React from 'react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import Table from '../../components/Table';
import adminCardTableStyle from '../../assets/jss/scenes/Dashboard/adminCardTableStyle';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import Edit from "@material-ui/icons/Edit";
import Button from '../../components/CustomButtons/Button';
import { bindActionCreators } from 'redux';
import * as  mediacoesActions from '../../services/admin/mediacao/mediacoes/actions';
import { connect } from 'react-redux';
import getAdaptedMessage from '../../services/admin/mediacao/messages';
import { withRouter } from 'react-router-dom';

class Usuario extends React.Component {

  componentDidMount() {
    if (this.props.mediacoes.lista.length === 0) {
      this.props.actions.buscarMediacoes(this.props.auth.id);
    }
  }

  dataToTableData = () => {
    const { mediacoes } = this.props;
    
    let localMediacoes = [];
    
    mediacoes.lista.forEach(element => {
      localMediacoes = localMediacoes.concat([[
        (mediacoes.lista.indexOf(element) + 1).toString(),
        element.protocolo,
        element.nomeRequerente,
        getAdaptedMessage(element.situacao),
        this.botao(element)
      ]])
    });
    
    return localMediacoes;
  }

  handleClickMediacao = idMediacao => {
    this.props.history.push(`/mediacao/protocolo?id=${idMediacao}`);
  }

  botao(mediacao) {
    const { classes }  = this.props;
    
    return (
      <Button
          round
          color="primary"
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={mediacao.idMediacao}
          onClick={() => this.handleClickMediacao(mediacao.idMediacao)}
        >
          <Edit className={classes.icon} />
        </Button>
    );
  }

  render() {
    const { classes }  = this.props;

    return(
      <React.Fragment>
        <Card minHeight>
          <CardHeader color="primary">
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mediações</h4>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mediações atribuídas</p>
          </CardHeader>
          <CardBody>
            <Table 
              tableHead={[
                "#",
                "Protocolo",
                "Requerente",
                "Situação"
              ]}
              tableData={this.dataToTableData()}
              customCellClasses={[
                classes.center,
                classes.right
              ]}
              customClassesForCells={[0, 4]}
              customHeadCellClasses={[
                classes.center,
                classes.right
              ]}
              customHeadClassesForCells={[0,4]}
              footer
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  mediacoes: state.mediacoes
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...mediacoesActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(adminCardTableStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(Usuario));