import React from 'react';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import FaceIcon from '@material-ui/icons/Face';
import CustomChip from '../../../../components/Chip/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

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
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader color="success">
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Situação</h4>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Em Andamento</p>
          </CardHeader>
          <CardBody>
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label="Requerente: Marcelo Lauxen"
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label="Requerido: Medial LTDA"
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label="Mediador: Fernanda Trentin"
              clickable
              color="success"
              variant="outlined"
              width="fullWidth"
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon}/>}
              label="Negociador: Fulano"
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

export default withStyles(style)(Situacao);