import 'core-js/es';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { LocaleProvider } from 'zarm-web';
import App from './components/App';

ReactDOM.render((
  <HashRouter>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </HashRouter>
), document.getElementById('app'));
