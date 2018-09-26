import React from 'react';
import WithStyles from '@material-ui/core/styles/withStyles';

const styles = {
  infoText: {
    fontWeight: '300',
  }
}

class Confirmacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmou: false,
    }
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  render() {
    return(
      <div>
        Confirmação
      </div>
    );
  }
}

export default WithStyles(styles)(Confirmacao);