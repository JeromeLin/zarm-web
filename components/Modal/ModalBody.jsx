import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalBody extends Component {
  render() {
    const { height, children } = this.props;
    const bodyStyle = {
      height
    };

    return (
      <div className="ui-modal-body" style={bodyStyle}>
        {children}
      </div>
    );
  }
}

ModalBody.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ModalBody.defaultProps = {
  height: 'auto'
};

export default ModalBody;
