import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './root';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./root.js', () => {
    const NextRootContainer = require('./root');
    render(NextRootContainer);
  });
}
