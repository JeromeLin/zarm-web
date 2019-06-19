import React, { Component } from 'react';
import classnames from 'classnames';
import Popover from '../popover';
import PropsType from './PropsType';

class Tooltip extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-tooltip',
    direction: 'bottom',
    trigger: 'hover',
  };

  render() {
    const {
      title,
      direction,
      className,
      children,
      trigger,
      style,
      prefixCls,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: !!className,
    });
    return (
      title ? (
        <Popover
          content={title}
          direction={direction}
          trigger={trigger}
          className={cls}
        >
          <div style={style}>
            {children}
          </div>
        </Popover>
      ) : (
        <div style={style}>
          {children}
        </div>
      )
    );
  }
}

export default Tooltip;
