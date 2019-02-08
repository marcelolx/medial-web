import React from 'react';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
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
          <CardHeader color='success'>
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