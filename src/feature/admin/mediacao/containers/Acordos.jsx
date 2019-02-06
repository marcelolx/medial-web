import React from 'react';
import Card from '../../../../../components/Card/Card';
import CardHeader from '../../../../../components/Card/CardHeader';
import CardBody from '../../../../../components/Card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../../../components/CustomButtons/Button';
import CardFooter from '../../../../../components/Card/CardFooter';

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