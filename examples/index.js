
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

let history = createBrowserHistory({
  queryKey: false
});

const rootRoute = {
  path: '/',
  component: require('./components/App'),
  childRoutes: [
    {
      path: 'page1',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Page1'));
        }, 'Page1');
      }
    },
    {
      path: 'page2',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Page2'));
        }, 'Page2');
      }
    },
    {
      path: 'button',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/ButtonPage'));
        }, 'ButtonPage');
      }
    },
    {
      path: 'modal',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/ModalPage'));
        }, 'ModalPage');
      }
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/NotFoundPage'));
        }, 'NotFoundPage');
      }
    }
  ],
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Page1'));
      }, 'Page1');
    }
  }
}

ReactDOM.render(
  <Router routes={rootRoute} history={history} />,
  document.getElementById('app')
);
