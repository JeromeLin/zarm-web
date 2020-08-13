import React, { Component, KeyboardEventHandler } from 'react';
import { Popup } from 'zarm';
import cn from 'classnames';

import { ModalProps } from './PropsType';
import Button from '../button';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { Alert, Confirm, ModalStatic, ModalConfigProps } from './index';

interface StateIF {
  isShow: boolean;
  sleep: boolean;
}

class Modal extends Component<ModalProps, StateIF> {
  static displayName = 'Modal';

  static confirm: typeof Confirm;

  static alert: typeof Alert;

  static success: typeof Alert;

  static info: typeof Alert;

  static error: typeof Alert;

  static warning: typeof Alert;

  static destroy: () => void;

  static open: (props: ModalConfigProps) => ModalStatic;

  static close: (key: string | number) => Promise<void>;

  static staticTriggerInstanceList: { close: () => any; key?: string | number }[];

  static defaultProps = {
    prefixCls: 'zw-modal',
    okText: '确定',
    cancelText: '取消',
    closable: true,
    maskClosable: true,
    mask: true,
    centered: true,
    autoFocus: true,
    disableEscapeKeyDown: false,
    disableEnterKeyDown: false,
    hideWhenShowOthers: true,
    destroy: false,
    animationType: 'fade',
    shape: 'radius',
  };

  private static visibleList: Modal[] = [];

  private static activeElem: Element[] = [document.activeElement || document.body];

  private static handleVisbibleList(instance: Modal, visible: boolean) {
    if (visible) {
      const lastIndex = Modal.visibleList.length - 1;
      if (lastIndex >= 0) {
        const theLastInstance = Modal.visibleList[lastIndex];
        theLastInstance.state.sleep = true;
        theLastInstance.setState({
          isShow: false,
        });
      }
      Modal.visibleList.push(instance);
    } else {
      Modal.visibleList.pop();
      let index = Modal.visibleList.length;
      if (index > 0) {
        const modal = Modal.visibleList[index - 1];
        const currentVisible = modal.props.visible;
        if (currentVisible) {
          modal.setState({
            isShow: true,
          });
          modal.state.sleep = false;
        }
      }
      while (index) {
        index -= 1;
        const modal = Modal.visibleList[index];
        const currentVisible = modal.props.visible;
        if (!currentVisible) {
          modal.state.sleep = false;
          Modal.visibleList.splice(index, 1);
        }
      }
    }
  }

  static getDerivedStateFromProps(props: ModalProps, state: StateIF) {
    if (state.sleep) {
      return null;
    }
    return {
      isShow: !!props.visible,
    };
  }

  private modalContent!: HTMLDivElement;

  state: StateIF;

  constructor(props: ModalProps) {
    super(props);
    const { visible } = this.props;
    this.state = {
      isShow: !!visible,
      sleep: false,
    };
  }

  componentDidMount() {
    const { autoFocus, visible } = this.props;
    setTimeout(() => {
      if (this.modalContent && autoFocus) {
        if (visible) {
          Modal.handleVisbibleList(this, !!visible);
          if (this.modalContent && autoFocus) {
            Modal.activeElem.push(this.modalContent);
            this.modalContent.focus();
          }
        }
      }
    });
  }

  componentDidUpdate(prevProps: ModalProps) {
    const { autoFocus, visible } = this.props;
    if (prevProps.visible && visible === false) {
      Modal.handleVisbibleList(this, !!visible);
      setTimeout(() => {
        if (this.modalContent && autoFocus) {
          Modal.activeElem.pop();
          const lastElem = Modal.activeElem[Modal.activeElem.length - 1];
          if (lastElem instanceof HTMLElement) {
            lastElem.focus();
          }
        }
      });
    }
    if (visible && !prevProps.visible) {
      setTimeout(() => {
        if (this.modalContent && autoFocus) {
          Modal.activeElem.push(this.modalContent);
          this.modalContent.focus();
        }
      });
      Modal.handleVisbibleList(this, !!visible);
    }
  }

  setModalContainer = (elem: null | HTMLDivElement) => {
    if (elem) {
      this.modalContent = elem;
    }
  };

  onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { visible, onCancel, onKeyDown, disableEscapeKeyDown } = this.props;
    if (visible && !disableEscapeKeyDown) {
      if (e.nativeEvent.keyCode === 27) {
        if (onCancel) {
          onCancel();
        }
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  onKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { visible, onOk, onKeyPress, disableEnterKeyDown } = this.props;
    if (visible && disableEnterKeyDown === false) {
      if (this.modalContent === document.activeElement && e.nativeEvent.keyCode === 13) {
        onOk && onOk();
      }
    }
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  onBlur = () => {
    this.modalContent.focus();
  };

  onMaskClick = () => {
    const { onCancel, maskClosable, onMaskClick } = this.props;
    if (maskClosable && onCancel) {
      onCancel();
    }
    if (onMaskClick) {
      onMaskClick();
    }
  };

  render() {
    const {
      prefixCls,
      children,
      title,
      closable,
      visible,
      onOk,
      onCancel,
      okText,
      cancelText,
      className,
      centered,
      footer,
      shape,
      style,
      bodyStyle,
      ...others
    } = this.props;
    const { isShow } = this.state;
    const show = isShow;
    const hasFooter = footer !== null;
    const showHeader = title !== undefined || closable;
    const rewriteClassName = cn({
      [prefixCls]: true,
      [`${className}`]: !!className,
      [`${prefixCls}--popup`]: true,
      [`${prefixCls}--top`]: !centered,
      [`${prefixCls}--${shape}`]: true,
    });
    return (
      <Popup
        visible={show}
        direction="center"
        {...others}
        onMaskClick={this.onMaskClick}
        className={rewriteClassName}
      >
        <div
          className={`${prefixCls}__content`}
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress}
          ref={this.setModalContainer}
          data-show={show}
          data-visible={visible}
          style={style}
        >
          {showHeader && <ModalHeader closable={closable} onCancel={onCancel}>{title}</ModalHeader>}
          <ModalBody style={bodyStyle}>{children}</ModalBody>
          <ModalFooter>
            {
              hasFooter && (
                <div className={`${prefixCls}__button-warpper`}>
                  {footer || (
                    <>
                      <Button onClick={onCancel}>{cancelText}</Button>
                      <Button theme="primary" onClick={onOk}>{okText}</Button>
                    </>
                  )}
                </div>
              )
            }
          </ModalFooter>
        </div>
        <div className={`${prefixCls}__hidden-elem`}>
          <input type="readonly" tabIndex={0} onFocus={this.onBlur} />
        </div>
      </Popup>
    );
  }
}

export default Modal;
