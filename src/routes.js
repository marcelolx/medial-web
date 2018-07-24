function from(path){
  return asyncComponent(() => {
    return import(`${path}/index.js`);
  });
}

export default () => (
  <Switch>
    <PrivateRoute exact path="/" component={} />
    <Route path="/login" component={Login} />
    <Route render={() => Redirect to ="/"} />
  </Switch>
);