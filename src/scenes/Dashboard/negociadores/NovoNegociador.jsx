import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import { bindActionCreators } from 'redux';
import negociadorStyle from '../../assets/jss/scenes/Dashboard/negociadorStyle';
import { withRouter } from 'react-router-dom';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Button from '../../components/CustomButtons/Button';
import * as negociadorActions from '../../services/dashboard/negociador/actions';


const styles = ({
  ...negociadorStyle,
  imagemUser:{
      width: '100%'
  }
});

class Negociador extends React.Component {

  componentDidMount() {
    this.props.actions.adquirirNegociadores();
  }

  adicionarNegociador(negociador,empresa) {
    this.props.actions.adicionarNegociador(empresa,negociador);
  }


  render() {
    const { classes,negociadores } = this.props;
    return(
      <React.Fragment>
         {negociadores.negociadores.map(negociador => {
            return (
                <GridItem xs={12} sm={6} md={3} lg={3}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Negociador</h4>
                    </CardHeader>
                    <CardBody pricing className={classes.card}>
                          <div className={classes.icon}>
                            {negociador.avatar?<img className={classes.imagemUser}  src={negociador.avatar} alt={negociador.negociador}/>
                            : <PersonOutline className={classes.iconColor} />}
                          </div>
                          <h4
                            className={`${classes.cardTitle} ${classes.marginTop20}`}
                          >
                          {negociador.negociador}
                          </h4>
                          <h4> Situação: {negociador.ativo ===1? "Ativo" : "Desativado"}</h4> 
                          <Button round color="secondary" onClick={() =>this.adicionarNegociador(negociador.id,negociador.empresa)}>
                            Remover
                          </Button>
                        </CardBody>
                  </Card>
                </GridItem>
           );
          }, this)}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  negociadores: state.negociadores
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...negociadorActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Negociador));
