import React from 'react';
import Popper from 'zarm/lib/popper';
import classnames from 'classnames';
import { PropsType } from './PropsType';

const defaultProps = {
  visible: false,
  prefixCls: 'zw-dropdown',
  direction: 'bottomLeft',
  trigger: 'click',
  disabled: false,
};

export default class Dropdown extends React.Component<PropsType> {
  static defaultProps = defaultProps;

  onVisibleChange = (visible) => {
    const { disabled, onVisibleChange } = this.props;
    if (disabled) {
      return;
    }
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  };

  render() {
    const {
      children,
      className,
      prefixCls,
      onVisibleChange,
      ...others
    } = this.props;
    const cls = classnames({
      [prefixCls]: true,
      [`${className}`]: !!className,
    });
    return (
      <>
        <Popper className={cls} onVisibleChange={this.onVisibleChange} {...others}>{children}</Popper>
      </>
    );
  }
}
