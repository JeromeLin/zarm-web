import React, { Component } from 'react';
import classnames from 'classnames';
import { DividerProps } from './PropsType';

export default class Divider extends Component<DividerProps, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
    disabled: true,
    style: {},
  };

  render() {
    const { className, prefixCls, style } = this.props;
    const cls = classnames({
      [`${prefixCls}-item-divider`]: true,
      [className!]: !!className,
    });
    return <li className={cls} style={style} />;
  }
}
