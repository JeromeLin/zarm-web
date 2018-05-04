import React, { Component } from 'react';

class ModalFooter extends Component {
  render() {
    const { children, style } = this.props;

    return (
      <div className="ui-modal-footer" style={style}>
        {children}
      </div>
    );
  }
}

export default ModalFooter;
