import React from 'react';
import Popper from 'zarm/lib/popper';
import 'zarm/lib/popper/style';
import classnames from 'classnames';
import { PropsType } from './PropsType';

const defaultProps = {
  visible: false,
  prefixCls: 'zw-dropdown',
  direction: 'bottomLeft',
  trigger: 'click',
};

export default class Dropdown extends React.Component<PropsType> {
  static defaultProps = defaultProps;

  render() {
    const {
      children,
      className,
      prefixCls,
      ...others
    } = this.props;
    const cls = classnames({
      [prefixCls]: true,
      [`${className}`]: !!className,
    });
    return (
      <>
        <Popper className={cls} {...others}>{children}</Popper>
      </>
    );
  }
}
