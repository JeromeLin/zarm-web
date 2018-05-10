import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class ModalBody extends Component {
  render() {
    const { height, children, className } = this.props;
    const bodyStyle = {
      height
    };

    const cls = classnames({
      'ui-modal-body': true,
      [className]: !!className
    });

    return (
      <div className={cls} style={bodyStyle}>
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
