import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    const { visible, children, ...others } = this.props;

    return visible ? (
      <div className="ui-loading" {...others}>
        <div className="ui-loading-spins">
          <span className="ui-loading-spin ui-loading-spin-first" />
          <span className="ui-loading-spin ui-loading-spin-second" />
          <span className="ui-loading-spin ui-loading-spin-third" />
        </div>
        <div className="ui-loading-inner">{children}</div>
      </div>
    ) : (
      children
    );
  }
}

Loading.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string
};

Loading.defaultProps = {
  visible: false,
  message: '加载中'
};

export default Loading;
