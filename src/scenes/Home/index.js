import React from 'react';
import Typography from '@material-ui/core/Typography';
import Permissions from 'react-redux-permissions';

const Home = () => (
  <React.Fragment>
    
    <Permissions allowed={["99"]}>
      <Typography variant="subheading" color="textSecondary" noWrap>Permissão 99</Typography>
    </Permissions>
    <Permissions allowed={["1"]}>
      <Typography variant="subheading" color="textSecondary" noWrap>Permissão 1</Typography>
    </Permissions>
  </React.Fragment>
);

export default Home;