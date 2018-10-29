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
  ...negociadorStyle
});

class Negociador extends React.Component {

  componentDidMount() {
    
  }



  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
          <GridItem xs={12} sm={6} md={3} lg={3}>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Negociador</h4>
              </CardHeader>
              <CardBody pricing className={classes.card}>
                    <div className={classes.icon}>
                      <PersonOutline className={classes.iconColor} />
                    </div>
                    <h3
                      className={`${classes.cardTitle} ${classes.marginTop20}`}
                    >
                     Nenhum Selecionado
                    </h3>
                    <Button round color="secondary">
                       Remover
                    </Button>
                  </CardBody>
            </Card>
          </GridItem>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  requeridosPendentes: state.requeridosPendentes
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
