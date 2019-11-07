import React from 'react';
import Popper from 'zarm/lib/popper';
import classnames from 'classnames';
import { PropsType } from './PropsType';

const defaultProps = {
  visible: false,
  prefixCls: 'zw-dropdown',
  direction: 'bottomLeft',
  trigger: 'click',
  disabled: false,
  shape: 'rect',
};

export default class Dropdown extends React.Component<PropsType> {
  static defaultProps = defaultProps;

  triggerPointRef = React.createRef<HTMLSpanElement>();

  popperContenRef = React.createRef<HTMLDivElement>();

  private hoverTimer?: number;

  componentDidMount() {
    document.addEventListener('click', this.onDocClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocClick);
  }

  onDocClick = (e: MouseEvent) => {
    const { visible } = this.props;
    const { current } = this.triggerPointRef;
    const { current: popperContentCurrent } = this.popperContenRef;
    if (visible) {
      if (current && popperContentCurrent) {
        if (popperContentCurrent.contains(e.target as Node) || current.contains(e.target as Node)) {
          return;
        }
      }
      this.onVisibleChange(false);
    }
  };

  onVisibleChange = (visible: boolean) => {
    const { disabled, onVisibleChange } = this.props;
    if (disabled) {
      return;
    }
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  };

  onClick = () => {
    const { trigger, onVisibleChange, visible } = this.props;
    if (trigger !== 'click') {
      return;
    }
    onVisibleChange(!visible);
  };

  onMouseEnter = () => {
    const { trigger, onVisibleChange, visible } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }
    if (!visible) {
      onVisibleChange(true);
    }
  };

  onMouseLeave = () => {
    const { trigger, onVisibleChange, visible } = this.props;
    if (trigger !== 'hover' || !visible) {
      return;
    }
    this.hoverTimer = setTimeout(() => {
      onVisibleChange(false);
    }, 300);
  };

  onContextMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { trigger, onVisibleChange, visible } = this.props;
    if (trigger !== 'contextMenu') {
      return;
    }
    e.preventDefault();
    onVisibleChange(!visible);
  };

  render() {
    const {
      children,
      className,
      prefixCls,
      onVisibleChange,
      visible,
      disabled,
      content,
      trigger,
      triggerProps,
      shape,
      ...others
    } = this.props;
    const cls = classnames({
      [prefixCls]: true,
      [`${className}`]: !!className,
      [`${prefixCls}--${shape}`]: true,
    });
    const dropdownContent = (
      <div
        ref={this.popperContenRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {content}
      </div>
    );
    return (
      <Popper
        {...others}
        visible={disabled ? false : visible}
        className={cls}
        onVisibleChange={this.onVisibleChange}
        trigger="manual"
        content={dropdownContent}
      >
        <span
          {...triggerProps}
          ref={this.triggerPointRef}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onContextMenu={this.onContextMenu}
        >
          {children}
        </span>
      </Popper>
    );
  }
}
