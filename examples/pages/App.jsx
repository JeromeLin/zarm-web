
import React, { Component, PropTypes } from 'react';
import '../styles/pages/App.scss';

class App extends Component {

  render() {
    return (
      <div>
        <div className="App-container">
          <div className="inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children : PropTypes.element.isRequired,
  error    : PropTypes.object,
};

export default App;