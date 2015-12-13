
import React, { Component, PropTypes } from 'react';

class ModalHeader extends Component {

  render () { 
    const { title, onClose } = this.props;
    const btnClose = onClose
                   ? <div className="ui-modal-more" onClick={onClose}>x</div>
                   : null;

    return (
      <div className="ui-modal-header">
        <div className="ui-modal-title">{title}</div>
        {btnClose}
      </div>
    );
  }

}

ModalHeader.propTypes = { 
  title   : PropTypes.string,
  onClose : PropTypes.func,
};

ModalHeader.defaultProps = {
  title   : '',
};

export default ModalHeader;

