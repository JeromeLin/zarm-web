import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Mask extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-mask',
    visible: false,
    type: 'normal',
    onClose: () => {},
  };

  render() {
    const {
      visible, type, onClose, style, prefixCls,
    } = this.props;
    const markCls = classnames({
      [prefixCls!]: true,
      transparent: type === 'transparent',
      light: type === 'light',
      dark: type === 'dark',
    });

    return visible ? (
      <div className={markCls} onClick={onClose} style={style} />
    ) : null;
  }
}

export default Mask;
