import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import 'normalize.css';
import AsyncComponent from './AsyncComponent';
import '../styles/index';
import '../styles/components/App';

import pages from '../pages/Index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1>
              dragon-ui
            </h1>
            <ul className="nav">
              <li className="nav-item">
                <a href="/#/" className="active">Components</a>
              </li>
              <li className="nav-item">
                <a href="//github.com/JeromeLin/dragon-ui" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
            </ul>
          </div>
        </header>
        <div className="main container">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a href="#/quick-start">开发指南</a>
                <ul className="pure-menu-list sub-nav">
                  <li className="nav-item">
                    <a href="#/quick-start">快速上手</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#/">组件</a>
                {
                  Object.keys(pages.components).map((group) => {
                    return (
                      <div className="nav-group" key={group}>
                        <div className="nav-group__title">{group}</div>
                        <ul className="pure-menu-list">
                          {
                            Object.keys(pages.components[group]).map((page) => {
                              return (
                                <li key={page} className="nav-item">
                                  <a href={`#/${page}`}>{page}</a>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    );
                  })
                }
              </li>
            </ul>
          </nav>
          <div className="content">
            <Switch>
              <Route path="/alert" component={AsyncComponent(() => import('../pages/Alert'))} />
            </Switch>
            <ScrollToTop showUnder={210}>
              <div className="page-up" />
            </ScrollToTop>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
