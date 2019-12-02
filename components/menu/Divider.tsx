import React, { Component } from 'react';
import classnames from 'classnames';
import { DividerProps } from './PropsType';

export default class Divider extends Component<DividerProps, any> {
  static isDivider = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    disabled: true,
    style: {},
  };

  render() {
    const { className, prefixCls, style } = this.props;
    const cls = classnames({
      [`${prefixCls}__divider`]: true,
      [className!]: !!className,
    });
    return <li className={cls} style={style} />;
  }
}
