import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './scenes/components/PrivateRoute';
import asyncComponent from './scenes/components/hoc/asyncComponent';

const Home = from('./scenes/Home');
const Login = from('./scenes/Login');

function from(path){
  return asyncComponent(() => {
    return import(`${path}/index.js`);
  });
}

export default () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} /> 
    <Route path="/login" component={Login} />
    <Route render={() => <Redirect to ="/" />} />
  </Switch>
);