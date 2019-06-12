import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import classnames from 'classnames';
import { hot } from 'react-hot-loader';
import '@/components/style/index.scss';
import '@/components/style/components.scss';
import { qs } from '../../components/locale/util';
import Markdown from './markdown';
import '../../components/style/index.scss';
import '../styles/index.scss';
import '../styles/components/App.scss';

import pages from '../page.config';

const changeLanguage = (_lang) => {
  const { href } = window.location;
  window.location.href = `${href.split('?')[0]}?lang=${_lang}`;
  window.location.reloadd();
};

const LoadableComponent = ({ component, name }) => {
  return Loadable({
    loader: component,
    render: (loaded, props) => {
      const C = loaded.default;
      return <Markdown document={C} {...props} name={name} />;
    },
    loading: () => null,
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.components = {};
  }

  render() {
    const hash = window.location.hash.match(/#\/(\w+)?/);
    const lang = qs('lang') || 'zh';
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1>zarm-web</h1>
            <ul className="nav">
              <li className="nav-item">
                <a href="/#/" className="active">Components</a>
              </li>
              <li className="nav-item">
                <a href="//github.com/JeromeLin/zarm-web" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
              <li className="nav-item">
                {
                  lang === 'en'
                    ? <span className="lang" onClick={() => changeLanguage('zh')}>中文</span>
                    : <span className="lang" onClick={() => changeLanguage('en')}>English</span>
                }
              </li>
            </ul>
          </div>
        </header>
        <div className="main container">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a href={`#/QuickStart?lang=${lang}`}>开发指南</a>
                <ul className="pure-menu-list sub-nav">
                  <li className="nav-item">
                    <a href={`#/QuickStart?lang=${lang}`}>快速上手</a>
                  </li>
                  <li className="nav-item">
                    <a href={`#/I18n?lang=${lang}`} className={classnames({ active: hash[1] === 'i18n' })}>国际化</a>
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
                                  <a href={`#/${page}?lang=${lang}`} className={classnames({ active: page === hash[1] })}>{page}</a>
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
              {
                Object.keys(pages.documents).map((name) => {
                  return (
                    <Route
                      path={`/${name}`}
                      key={name}
                      component={LoadableComponent({
                        component: pages.documents[name].component,
                        name: pages.documents[name].name,
                      })}
                    />
                  );
                })
              }
              {
                Object.keys(this.components).map((name) => {
                  return (
                    <Route
                      path={`/${name}`}
                      key={name}
                      component={LoadableComponent({
                        component: this.components[name].component,
                        name: this.components[name].name,
                      })}
                    />
                  );
                })
              }
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
