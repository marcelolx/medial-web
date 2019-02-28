import React from 'react';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../../core/components/CustomButton';
import CardFooter from '../../../../core/components/card/CardFooter';
import ProporAcordo from './ProporAcordo';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import Done from '@material-ui/icons/Done';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { ListItemIcon, ListItem } from '@material-ui/core';

import { textSecondaryColor, textSuccessColor, textDangerColor, textWarningColor } from '../../../../assets/jss/styles';
import PropostaAcordo from './PropostaAcordo';

const style = ({
  textSecondaryColor,
  textDangerColor,
  textSuccessColor,
  textWarningColor,
  semMargen: {
    margin: 0,
  },
  cardPropostas: {
    height: '250px'
  },
  cardBody: {
    overflow: 'overlay',
  },
  listItem: {
    margin: 5,
    padding: 0,
    cursor: 'pointer'
  }
});


class Acordos extends React.Component {

  state = {
    modalOpen: false,
    modalOpenProposta: false,
    dados: [{ id: 1, status: 'R', dataMediacao: '28/02/2018 00:00:00' }, { id: 2, status: 'I', dataMediacao: '28/02/2018 00:00:00' }, { id: 3, status: 'R', dataMediacao: '28/02/2018 00:00:00' }, { id: 4, status: 'A', dataMediacao: '28/02/2018 00:00:00' }, { id: 5, status: 'A', dataMediacao: '28/02/2018 00:00:00' }]
  }

  abrirProposta(id) {
    this.setState({ modalOpenProposta: true, codigoAcordo: id })
  }

  getIcon(status) {
    const { classes } = this.props;

    switch (status) {
      case 'A':
        return (<ListItemIcon className={classes.textSuccessColor} >
          <Done />
        </ListItemIcon>);
      case 'R':
        return (<ListItemIcon className={classes.textDangerColor}>
          <CancelOutlined />
        </ListItemIcon>);
      case 'C':
        return (<ListItemIcon className={classes.textWarningColor}>
          <CancelOutlined />
        </ListItemIcon>);
      default:
        return (<ListItemIcon className={classes.textSecondaryColor}>
          <InfoOutlined />
        </ListItemIcon>);
    }

  }

  _listaAcordos() {
    const { classes } = this.props;

    return (
      <CardBody className={classes.cardBody}>
        {this.state.dados.map(el => {
          return <ListItem className={classes.listItem} key={el.id.toString()} onClick={() => this.abrirProposta(el.id)}>
            {this.getIcon(el.status)}
            {'Acordo: ' + el.id + ' - Data: ' + el.dataMediacao}
          </ListItem>
        })}
      </CardBody>

    )
  }
  render() {
    const { classes } = this.props;


    return (
      <React.Fragment>
        <Card className={classes.cardPropostas}>
          <CardHeader color='success'>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Propostas de acordo</p>
          </CardHeader>
          {this._listaAcordos()}
          <CardFooter>
            <Button fullWidth onClick={() => this.setState({ modalOpen: true })}>Propor Acordo</Button>
          </CardFooter>
        </Card>
        {this.state.modalOpen ? <ProporAcordo closeModal={() => this.setState({ modalOpen: false, codigoAcordo: 0 })} /> : null}
        {this.state.modalOpenProposta ? <PropostaAcordo codigoAcordo={this.state.codigoAcordo} closeModal={() => this.setState({ modalOpenProposta: false, codigoAcordo: 0 })} /> : null}
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Acordos);