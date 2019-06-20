import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Loadable from 'react-loadable';
import './style.scss';

// const LoadableComponent = (component) => {
//   return Loadable({
//     loader: component,
//     loading: () => null,
//   });
// };

class App extends Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/" component={LoadableComponent(() => import('@site/pages/Index'))} />
        <Route path="/components/:component" component={LoadableComponent(() => import('@site/pages/Components'))} />
        <Route path="*" component={LoadableComponent(() => import('@site/pages/NotFoundPage'))} /> */}
        <Route path="/components/:component" component={require('@site/pages/Components').default} />
        <Redirect exact from="/" to="/components/quick-start" />
        <Route component={require('@site/pages/NotFoundPage').default} />
      </Switch>
    );
  }
}

export default withRouter(App);
