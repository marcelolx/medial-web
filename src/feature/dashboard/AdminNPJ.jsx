import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../core/components/grid/GridItem';
import Card from '../../core/components/card/Card';
import CardHeader from '../../core/components/card/CardHeader';
import CardBody from '../../core/components/card/CardBody';
import Table from '../../core/components/CustomTable';
import Edit from '@material-ui/icons/Edit';
import Button from '../../core/components/CustomButton';
import adminCardTableStyle from '../../assets/jss/scenes/dashboard/adminCardTableStyle';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as requeridoPendenteActions from '../../feature/admin/cadastropendente/services/requeridoPendenteActions';

class AdminNPJ extends React.Component {

  componentDidMount() {
    if (this.props.requeridosPendentes.pendentes.length === 0) {
      this.props.actions.buscarRequeridosPendentes();  
    }
  }

  handleClickCadastroPendente = idCadastroPendente => {
    this.props.history.push(`/mediacao/cadastropendente?id=${idCadastroPendente}`);
  }

  dataToTableData = () => {
    const { requeridosPendentes } = this.props;
    let requeridos = [];

    requeridosPendentes.pendentes.forEach(element => {
      requeridos = requeridos.concat([[
        (requeridosPendentes.pendentes.indexOf(element) + 1).toString(),
        element.nomeRequerido,
        this.botao(element)
      ]])
    });

    return requeridos;
  }

  botao(cadastroPendente) {
    const { classes }  = this.props;
    
    return (
      <Button
          round
          color='primary'
          className={classes.actionButton + ' ' + classes.actionButtonRound}
          key={cadastroPendente.idCadastroPendente}
          onClick={() => this.handleClickCadastroPendente(cadastroPendente.idCadastroPendente)}
        >
          <Edit className={classes.icon} />
        </Button>
    );
  }

  render() {
    const { classes } = this.props;

    return(
      <GridItem xs={12} sm={12} md={6} lg={6}>
        <Card minHeight>
          <CardHeader color='primary'>
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Cadastros pendentes</h4>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Requeridos com cadastro pendente no sistema</p>
          </CardHeader>
          <CardBody>
            <Table 
              tableHead={[
                '#',
                'Nome',
                '',
              ]}
              tableData={this.dataToTableData()}
              customCellClasses={[
                classes.center,
                classes.right
              ]}
              customClassesForCells={[0, 2]}
              customHeadCellClasses={[
                classes.center,
                classes.right
              ]}
              customHeadClassesForCells={[0,2]}
              footer
            />
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  requeridosPendentes: state.requeridosPendentes
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...requeridoPendenteActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(adminCardTableStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(AdminNPJ));