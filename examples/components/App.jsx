import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'normalize.css';
// import FastClick from 'fastclick';
import AsyncComponent from './AsyncComponent';
import '../styles/index';
import '../styles/components/App';

class App extends Component {

  componentDidMount() {
    // Events.on(window, 'resize', window.__setFontSize__);
    // FastClick.attach(document.body);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />

        {/* 操作反馈 */}
        <Route path="/button" component={AsyncComponent(() => import('../pages/ButtonPage'))} />
        <Route path="/icon" component={AsyncComponent(() => import('../pages/IconPage'))} />
        <Route path="/badge" component={AsyncComponent(() => import('../pages/BadgePage'))} />
        <Route path="/modal" component={AsyncComponent(() => import('../pages/ModalPage'))} />

        <Route component={AsyncComponent(() => import('../pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default withRouter(App);
