import React, { Component } from 'react';
import classnames from 'classnames';
import { ModalFooterProps } from './PropsType';

class ModalFooter extends Component<ModalFooterProps, any> {
  static defaultProps = {
    prefixCls: 'ui-modal',
    style: {},
  };

  render() {
    const { children, style, prefixCls, className } = this.props;

    const cls = classnames({
      [`${prefixCls}-footer`]: true,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default ModalFooter;
