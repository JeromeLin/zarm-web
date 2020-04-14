import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MenuDividerProps } from './PropsType';

export default class Divider extends Component<MenuDividerProps, any> {
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
    const cls = classnames(
      `${prefixCls}__divider`,
      { [className!]: !!className },
    );
    return <li className={cls} style={style} />;
  }
}
