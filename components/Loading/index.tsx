import React, { Component } from 'react';
import PropsType from './PropsType';

class Loading extends Component<PropsType, any> {
  static defaultProps = {
    visible: false,
  };

  render() {
    const { visible, children, style } = this.props;

    return visible ? (
      <div className="ui-loading" style={style}>
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

export default Loading;
