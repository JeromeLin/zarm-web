import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
    const { history, location, match } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    return (
      <TransitionGroup>
        <CSSTransition
          key={currentKey}
          timeout={300}
          classNames={(history.action === 'PUSH' || (history.action === 'POP' && !match.isExact)) ? 'out' : 'in'}
          appear>
          <section>
            <Switch key={location.pathname} location={location}>
              <Route exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />

              {/* 操作反馈 */}
              <Route path="/button" component={AsyncComponent(() => import('../pages/ButtonPage'))} />

              <Route component={AsyncComponent(() => import('../pages/NotFoundPage'))} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);
