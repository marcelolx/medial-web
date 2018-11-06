import React from 'react';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';

const style = ({
  semMargen: {
    margin: 0,
  },
  cardPropostas: {
    height: '250px'
  }
});

class Anexos extends React.Component {
  render() {
    const { classes } = this.props;
    
    return(
      <React.Fragment>
        <Card className={classes.cardPropostas}>
          <CardHeader color="success">
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Anexos</p>
          </CardHeader>
          <CardBody>
              
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Anexos);