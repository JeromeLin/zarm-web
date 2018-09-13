import React, { Component } from 'react';
import classnames from 'classnames';
import IconProps from './PropsType';

class Icon extends Component<IconProps, any> {
  static defaultProps = {
    prefixCls: 'ui-icon',
    type: '',
    theme: 'default',
    className: '',
    style: {},
    onClick: () => { },
  };

  render() {
    const {
      prefixCls, type, theme, className, style, onClick,
    } = this.props;
    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
      [className!]: !!className,
    });

    return <i className={cls} style={style} onClick={onClick} />;
  }
}

export default Icon;
