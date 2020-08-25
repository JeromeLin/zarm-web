import React, { PureComponent } from 'react';
import { Popper } from 'zarm';
import { PopperProps } from 'zarm/es/popper';

export type PopoverProps = PopperProps;

export default class Popover extends PureComponent<PopoverProps, {}> {
  static defaultProps = {
    prefixCls: 'zw-popover',
    trigger: 'hover',
    shape: 'radius',
    hasArrow: true,
  };

  render() {
    return <Popper {...this.props} />;
  }
}
