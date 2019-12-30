import React, { KeyboardEventHandler } from 'react';
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

  static visibleList = new Set();

  triggerPointRef = React.createRef<HTMLSpanElement>();

  popperContenRef = React.createRef<HTMLDivElement>();

  private hoverTimer?: number;

  private prevActiveElem?: Element;

  componentDidMount() {
    document.addEventListener('mousedown', this.onDocClick);
  }

  componentDidUpdate() {
    this.prevActiveElem = document.activeElement || document.body;
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onDocClick);
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
    if (visible) {
      Dropdown.visibleList.add(this);
    } else {
      Dropdown.visibleList.delete(this);
    }
    onVisibleChange(visible);
  };

  onClick = () => {
    const { trigger, visible } = this.props;
    if (trigger !== 'click') {
      return;
    }
    this.onVisibleChange(!visible);
  };

  onMouseEnter = () => {
    const { trigger, visible } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }
    if (!visible) {
      this.onVisibleChange(true);
    }
  };

  onMouseLeave = () => {
    const { trigger, visible } = this.props;
    if (trigger !== 'hover' || !visible) {
      return;
    }
    this.hoverTimer = setTimeout(() => {
      this.onVisibleChange(false);
    }, 300);
  };

  onContextMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { trigger, visible } = this.props;
    if (trigger !== 'contextMenu') {
      return;
    }
    e.preventDefault();
    this.onVisibleChange(!visible);
  };

  onKeydown: KeyboardEventHandler = (e) => {
    const { visible } = this.props;
    if (visible && e.keyCode === 27) {
      e.stopPropagation();
      if (this.popperContenRef.current && this.popperContenRef.current.contains(e.currentTarget)) {
        const { prevActiveElem } = this;
        if (prevActiveElem && prevActiveElem instanceof HTMLElement) {
          setTimeout(() => {
            prevActiveElem.focus();
          });
        }
      }
      this.onVisibleChange(false);
    }
  };

  render() {
    const {
      visible,
      children,
      className,
      prefixCls,
      onVisibleChange,
      disabled,
      content,
      trigger,
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
        tabIndex={-1}
        ref={this.popperContenRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onKeyDown={this.onKeydown}
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
          ref={this.triggerPointRef}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onContextMenu={this.onContextMenu}
          onKeyDown={this.onKeydown}
        >
          {children}
        </span>
      </Popper>
    );
  }
}
