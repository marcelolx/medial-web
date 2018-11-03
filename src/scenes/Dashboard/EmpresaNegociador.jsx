import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import adminCadastroPendenteStyle from '../../assets/jss/scenes/Dashboard/adminCadastroPendenteStyle';
import CardBody from '../../components/Card/CardBody';
import * as negociadorActions from '../../services/dashboard/negociador/actions';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from '../../components/CustomButtons/Button';


const styles = ({
  ...adminCadastroPendenteStyle,
  semMargen: {
    margin: 0,
  },
  botaoVisualizar:{
    textAlign: 'center'
  }
});

class EmpresaNegociador extends React.Component {

  componentDidMount() {
    this.props.actions.quantidadeNegociadores();
  }

  abrirTelaNegociadores(){
    this.props.history.push(`/negociadores`);
  }

 

  render() {
    const { classes , negociadores } = this.props;

    return(
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Negociadores</h4>
                </CardHeader>
              <CardBody profile  className={[classes.card,classes.botaoVisualizar].join(' ')}>
                <h4>Você possui 
                {negociadores.quantidadeNegociadores ===0 ? " nenhum": " "+negociadores.quantidadeNegociadores}
                 {negociadores.quantidadeNegociadores <= 1 ? " negociador": " negociadores"} na sua empresa</h4>
                <Button round color="secondary" onClick={() =>this.abrirTelaNegociadores()}>
                {negociadores.quantidadeNegociadores ===0 ? "Adicionar" : "Visualizar"}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  negociadores: state.negociadores
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...negociadorActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EmpresaNegociador));