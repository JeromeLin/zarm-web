
import React, { Component, PropTypes } from 'react';
import '../styles/App.scss';

import Header from './Header';
import Footer from './Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="App-container">
          {this.props.children}
        </div>
        {
          /* <Footer /> */
        }
      </div>
    );
  }
}

App.propTypes = {
  children : PropTypes.element.isRequired,
  error    : PropTypes.object,
};

export default App;