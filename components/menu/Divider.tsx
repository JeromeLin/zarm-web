import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { DividerProps } from './PropsType';

export default class Divider extends Component<DividerProps, any> {
  static isDivider = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    style: {},
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])),
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
