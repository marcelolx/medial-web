import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './scenes/components/PrivateRoute';
import asyncComponent from './scenes/components/hoc/asyncComponent';

const Home = from('./scenes/Home');
const Login = from('./scenes/Login');
const Profile = from('./scenes/Profile');
const RegisterUser = from('./scenes/Register/User');

function from(path){
  return asyncComponent(() => {
    return import(`${path}/index.js`);
  });
}

export default () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} /> 
    <Route path="/login" component={Login} />
    <Route path="/user/register" component={RegisterUser} />
    <PrivateRoute path="/profile" component={Profile} />    
    <Route render={() => <Redirect to ="/" />} />
  </Switch>
);