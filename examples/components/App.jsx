import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';
// import ScrollToTop from 'react-scroll-up';
import AsyncComponent from './AsyncComponent';
import '../../components/style/index.scss';
import '../styles/index';
import '../styles/components/App';
import i18n from '../../components/locale';
import langZH from '../../components/locale/lang/zh-CN';
import langEN from '../../components/locale/lang/en';

import pages from '../pages/Index';

class App extends Component {
  constructor(props) {
    super(props);
    this.components = {};

    if (localStorage.lang === 'en') {
      i18n.use(langEN);
    } else {
      i18n.use(langZH);
    }
  }

  // eslint-disable-next-line
  changeLang(lang) {
    localStorage.lang = lang;
    window.location.reload();
  }

  render() {
    const hash = window.location.hash.match(/#\/(\w+)?/);
    const { lang } = window.localStorage;
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
              <li className="nav-item">
                {
                  lang === 'en'
                  ? <span className="lang" onClick={() => this.changeLang('zh')}>中文</span>
                  : <span className="lang" onClick={() => this.changeLang('en')}>English</span>
                }
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
                  <li className="nav-item">
                    <a href="#/i18n">国际化</a>
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
                              this.components[page] = pages.components[group][page];
                              return (
                                <li key={page} className="nav-item">
                                  <a href={`#/${page}`} className={classnames({ active: page === hash[1] })}>{page}</a>
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
              <Route path="/" exact component={AsyncComponent(() => import('../pages/QuikStart'))} />
              <Route path="/quick-start" component={AsyncComponent(() => import('../pages/QuikStart'))} />
              <Route path="/i18n" component={AsyncComponent(() => import('../pages/I18n'))} />
              {
                Object.keys(this.components).map((name) => {
                  return <Route path={`/${name}`} key={name} component={AsyncComponent(() => import(`../pages/${name}`))} />;
                })
              }
            </Switch>
            {/* <ScrollToTop showUnder={210}>
              <div className="page-up" />
            </ScrollToTop> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
