import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'zarm';

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type TooltipTheme = 'dark' | 'light';

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual' | 'contextMenu';

export interface TooltipProps {
  prefixCls?: string;
  visible?: boolean;
  hasArrow?: boolean;
  className?: string;
  arrowPointAtCenter?: boolean;
  direction?: TooltipPlacement;
  trigger?: TooltipTrigger;
  content?: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  theme?: TooltipTheme;
  onVisibleChange?: (visible: boolean) => void;
}

class Tooltip extends Component<TooltipProps, any> {
  static defaultProps = {
    prefixCls: 'zw-tooltip',
    direction: 'top' as TooltipPlacement,
    hasArrow: true,
    theme: 'dark',
    onVisibleChange: () => {},
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    direction: PropTypes.string,
    visible: PropTypes.bool,
    hasArrow: PropTypes.bool,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    content: PropTypes.node,
    onVisibleChange: PropTypes.func,
    theme: PropTypes.oneOf(['dark', 'light']),
  };

  static updateAll() {
    Popper.update();
  }

  render() {
    const { children, content, className, theme, ...others } = this.props;

    const cls = classnames(className, {
      [`zw-tooltip--${theme}`]: theme,
    });

    return content ? (
      <Popper
        className={cls}
        content={content}
        {...others}
      >
        {children}
      </Popper>
    ) : children;
  }
}

export default Tooltip;
