import React from 'react';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../../core/components/CustomButton';
import CardFooter from '../../../../core/components/card/CardFooter';

const style = ({
  semMargen: {
    margin: 0,
  },
  cardPropostas: {
    height: '250px'
  }
});

class Acordos extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.cardPropostas}>
          <CardHeader color="success">
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Propostas de acordo</p>
          </CardHeader>
          <CardBody>
              
          </CardBody>
          <CardFooter>
            <Button fullWidth>Propor Acordo</Button>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Acordos);