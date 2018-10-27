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

class Usuario extends React.Component {

  dataToTableData = () => {
    return [
      [
        1,
        '201827101',
        'Tio Sam',
        'Aguardando cadastro da empresa.',
        this.botao({})
      ] 
    ];
  }

  botao(cadastroPendente) {
    const { classes }  = this.props;
    
    return (
      <Button
          round
          color="primary"
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={cadastroPendente.idCadastroPendente}
          onClick={() => this.handleClickCadastroPendente(cadastroPendente.idCadastroPendente)}
        >
          <Edit className={classes.icon} />
        </Button>
    );
  }

  render() {
    const { classes }  = this.props;

    return(
      <React.Fragment>
        <Card>
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

export default compose(withStyles(adminCardTableStyle))(Usuario);