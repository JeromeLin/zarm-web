import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'normalize.css';
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
        <Route path="/alert" component={AsyncComponent(() => import('../pages/Alert'))} />
      </Switch>
    );
  }
}

export default withRouter(App);
