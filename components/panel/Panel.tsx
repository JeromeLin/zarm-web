import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Panel extends Component<PropsType, any> {
  static defaultProps = {
    theme: 'default',
    isRadius: false,
  };

  static Header;

  static Body;

  static Footer;

  static More;

  static Title;

  render() {
    const {
      isRadius, theme, className, children, style,
    } = this.props;

    const cls = classnames({
      'ui-panel': true,
      radius: 'radius' in this.props || isRadius,
      [`theme-${theme}`]: !!theme,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Panel;
