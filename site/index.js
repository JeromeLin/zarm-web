import 'raf/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const renderApp = Component => (
  render((
    <AppContainer>
      <HashRouter>
        <Component />
      </HashRouter>
    </AppContainer>
  ), document.getElementById('app'))
);

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
