
import React, { Component, PropTypes, Children } from 'react';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui-switch">
      {
        Children.map(children, (result, index) => {
          <i></i>
        })
      }
      </div>
    );
  }
}

Switch.propTypes = {
  defaultValue : PropTypes.bool,
};

Switch.defaultProps = {
  defaultValue : false,
};

export default Switch;