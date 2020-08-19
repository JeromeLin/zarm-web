import React, { KeyboardEventHandler } from 'react';
import { Popper } from 'zarm';
import classnames from 'classnames';
import { DropdownProps } from './PropsType';

const defaultProps = {
  prefixCls: 'zw-dropdown',
  direction: 'bottomLeft',
  trigger: 'click',
  disabled: false,
  shape: 'radius',
};

interface DropdownStates {
  visible: boolean;
}

function getVisible(props, state) {
  const { visible: propsState } = props;
  const { visible: stateProps } = state;
  return propsState === undefined ? stateProps : propsState;
}

export default class Dropdown extends React.Component<DropdownProps, DropdownStates> {
  static defaultProps = defaultProps;

  static visibleList = new Set();

  triggerPointRef = React.createRef<HTMLDivElement>();

  popperContentRef = React.createRef<HTMLDivElement>();

  private hoverTimer?: number;

  private prevActiveElem?: Element;

  state: DropdownStates = {
    visible: false,
  };

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
    const visible = getVisible(this.props, this.state);
    const { current } = this.triggerPointRef;
    const { current: popperContentCurrent } = this.popperContentRef;
    if (visible) {
      if (current && current.contains(e.target as Node)) {
        return;
      }
      if (popperContentCurrent && popperContentCurrent.contains(e.target as Node)) {
        return;
      }
      this.onVisibleChange(false);
    }
  };

  onVisibleChange = (visible: boolean) => {
    const { disabled, onVisibleChange, visible: propsVisible } = this.props;
    if (disabled) {
      return;
    }
    if (visible) {
      Dropdown.visibleList.add(this);
    } else {
      Dropdown.visibleList.delete(this);
    }
    if (propsVisible === undefined) {
      return this.setState({
        visible,
      });
    }
    if (typeof onVisibleChange === 'function') {
      onVisibleChange(visible);
    }
  };

  onClick = () => {
    const { trigger } = this.props;
    const visible = getVisible(this.props, this.state);
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
    const { trigger } = this.props;
    const visible = getVisible(this.props, this.state);
    if (trigger !== 'hover' || !visible) {
      return;
    }
    this.hoverTimer = setTimeout(() => {
      this.onVisibleChange(false);
    }, 300);
  };

  onContextMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { trigger } = this.props;
    const visible = getVisible(this.props, this.state);
    if (trigger !== 'contextMenu') {
      return;
    }
    e.preventDefault();
    this.onVisibleChange(!visible);
  };

  onKeydown: KeyboardEventHandler = (e) => {
    const visible = getVisible(this.props, this.state);
    if (visible && e.keyCode === 27) {
      e.stopPropagation();
      if (this.popperContentRef.current && this.popperContentRef.current.contains(e.currentTarget)) {
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
    const visible = getVisible(this.props, this.state);
    const cls = classnames(prefixCls, className, `${prefixCls}--${shape}`);
    const dropdownContent = (
      <div
        tabIndex={-1}
        ref={this.popperContentRef}
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
        trigger="manual"
        onVisibleChange={this.onVisibleChange}
        content={dropdownContent}
      >
        <div
          style={{ display: 'inline-block' }}
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
        </div>
      </Popper>
    );
  }
}
