import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './style.scss';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/components/:component" component={require('@site/pages/Components').default} />
        <Redirect exact from="/" to="/components/quick-start" />
        <Route component={require('@site/pages/NotFoundPage').default} />
      </Switch>
    );
  }
}

export default withRouter(App);
