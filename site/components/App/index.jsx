import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import './style.scss';

const App = () => {
  return (
    <Switch>
      <Route path="/components/:component" component={require('@site/pages/Components').default} />
      <Redirect exact from="/" to="/components/quick-start" />
      <Route component={require('@site/pages/NotFoundPage').default} />
    </Switch>
  );
};

export default hot(App);
