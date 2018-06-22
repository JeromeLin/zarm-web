import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Tooltip extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-tooltip',
    direction: 'bottom',
  };

  render() {
    const { props } = this;
    const {
      title,
      direction,
      className,
      children,
      tipStyle,
      style,
      prefixCls,
    } = props;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${direction}`]: !!direction,
      [className!]: !!className,
    });
    return (
      <div className={cls} style={style}>
        <div className={`${prefixCls}-inner`} style={tipStyle}>
          {title}
        </div>
        {children}
      </div>
    );
  }
}

export default Tooltip;
