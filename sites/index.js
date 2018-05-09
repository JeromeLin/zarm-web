import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './root';

const render = (Component) => {
  ReactDOM.render(
    // eslint-disable-next-line
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./root.js', () => {
    // eslint-disable-next-line
    const NextRootContainer = require('./root');
    render(NextRootContainer);
  });
}
