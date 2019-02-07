import React from 'react';
import Card from '../../../../../components/Card/Card';
import CardHeader from '../../../../../components/Card/CardHeader';
import CardBody from '../../../../../components/Card/CardBody';
import FaceIcon from '@material-ui/icons/Face';
import CustomChip from '../../../../../components/Chip/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import getAdaptedMessage from '../utils/mediacaoMessagesHelper';

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
});

class Situacao extends React.Component {

  handleGetValue(name) {
    return this.props.situacao[name] ? this.props.situacao[name] : 'Pendente';
  }

  render() {
    const { classes, situacao } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader color="success">
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Situação</h4>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>{getAdaptedMessage(situacao.situacao)}</p>
          </CardHeader>
          <CardBody>
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label={"Requerente: " + this.handleGetValue('nomeRequerente')}
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label={"Requerido: " + this.handleGetValue('nomeRequerido')}
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label={"Mediador: " + this.handleGetValue('nomeMediador')}
              clickable
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label={"Negociador: " + this.handleGetValue('nomeNegociador')}
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  situacao: state.mediacaoSituacao
});

/*const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({

  }, dispatch)
})*/

export default compose(
  withStyles(style),
  connect(mapStateToProps)
)(Situacao);