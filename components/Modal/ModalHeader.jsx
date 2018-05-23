import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

class ModalHeader extends Component {
  render() {
    const { title, onClose, style } = this.props;
    const btnClose = onClose ? (
      <div className="ui-modal-close" onClick={onClose}>
        <Icon type="wrong" />
      </div>
    ) : null;

    return (
      <div className="ui-modal-header" style={style}>
        <div className="ui-modal-title">{title}</div>
        {btnClose}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
};

ModalHeader.defaultProps = {
  title: '',
  style: {},
  onClose: () => {},
};

export default ModalHeader;
