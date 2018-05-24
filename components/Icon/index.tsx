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
  };

  render() {
    const {
      prefixCls, type, theme, className, style,
    } = this.props;
    const cls = classnames({
      [prefixCls as string]: true,
      [`${prefixCls}-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
      [className as string]: !!className,
    });

    return <i className={cls} style={style} />;
  }
}

export default Icon;
