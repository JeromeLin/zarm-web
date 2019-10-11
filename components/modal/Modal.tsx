import React, { Component, KeyboardEvent, KeyboardEventHandler } from 'react';
import Popup from 'zarm/lib/popup';
import 'zarm/lib/popup/style';
import cn from 'classnames';

import { ModalProps } from './PropsType';
import Button from '../button';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { Alert, Confirm } from './alert';

const activeElem: Element[] = [document.activeElement || document.body];

function toggleBodyOverflow(show: boolean) {
  const scrollBarWidth = window.innerWidth - (document.documentElement as HTMLElement).offsetWidth;
  if (show === true) {
    document.body.classList.add('ui-modal-body-overflow');
    if (scrollBarWidth > 0) {
      document.body.style.setProperty('padding-right', `${scrollBarWidth}px`);
    }
  } else {
    document.body.classList.remove('ui-modal-body-overflow');
    document.body.style.setProperty('padding-right', null);
  }
}

interface StateIF {
  isShow: boolean;
  sleep: boolean;
}

class Modal extends Component<ModalProps, StateIF> {
  static Alert = Alert;

  static Confirm = Confirm;

  static defaultProps = {
    prefixCls: 'zw-modal',
    okText: '确定',
    cancelText: '取消',
    closable: true,
    maskClosable: false,
    mask: true,
    centered: true,
    autoFocus: true,
    disableEscapeKeyDown: false,
    disableEnterKeyDown: false,
    zIndex: 2020,
    hideWhenShowOthers: true,
    destroy: false,
    scrollInModal: false,
  };

  private static instanceList: Modal[] = [];

  private static visibleList: Modal[] = [];

  private static handleVisbibleList(instance: Modal, visible: boolean) {
    if (visible) {
      const lastIndex = Modal.visibleList.length - 1;
      if (lastIndex >= 0) {
        const theLastInstance = Modal.visibleList[lastIndex];
        if (theLastInstance.props.hideWhenShowOthers === true) {
          theLastInstance.state.sleep = true;
          theLastInstance.setState({
            isShow: false,
          });
        }
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
      // eslint-disable-next-line no-plusplus
      while (index--) {
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

  private static unmountModalInstance(instance: Modal, callback: () => void) {
    const instanceIndex = Modal.instanceList.findIndex((item) => (item === instance));
    if (instanceIndex >= 0) {
      Modal.instanceList.splice(instanceIndex, 1);
    }
    if (Modal.instanceList.length === 0) {
      callback();
    }
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
    Modal.instanceList.push(this);
  }

  componentDidMount() {
    const { isShow } = this.state;
    const { autoFocus, visible } = this.props;
    setTimeout(() => {
      if (this.modalContent && autoFocus) {
        if (visible) {
          Modal.handleVisbibleList(this, !!visible);
          if (this.modalContent && autoFocus) {
            activeElem.push(this.modalContent);
            this.modalContent.focus();
          }
        }
      }
    });
  }

  componentDidUpdate(prevProps: ModalProps, prevState: StateIF) {
    const { isShow } = this.state;
    const { autoFocus, visible } = this.props;
    if (prevProps.visible && visible === false) {
      Modal.handleVisbibleList(this, !!visible);
      setTimeout(() => {
        if (this.modalContent && autoFocus) {
          activeElem.pop();
          activeElem[activeElem.length - 1].focus();
        }
        console.log(activeElem);
      });
    }
    if (visible && !prevProps.visible) {
      setTimeout(() => {
        if (this.modalContent && autoFocus) {
          activeElem.push(this.modalContent);
          this.modalContent.focus();
        }
      });
      Modal.handleVisbibleList(this, !!visible);
    }
  }

  componentWillUnmount() {
    Modal.unmountModalInstance(this, () => {
      toggleBodyOverflow(false);
    });
  }

  setModalContainer = (elem: null | HTMLDivElement) => {
    if (elem) {
      this.modalContent = elem;
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    const { visible, onCancel, onKeyDown, disableEscapeKeyDown } = this.props;
    if (visible && !disableEscapeKeyDown) {
      if (e.keyCode === 27) {
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
      if (this.modalContent === document.activeElement && visible && e.nativeEvent.keyCode === 13) {
        if (onOk) {
          onOk();
        }
      }
    }
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  onBlur = () => {
    this.modalContent.focus();
  };

  render() {
    const {
      prefixCls,
      children,
      title,
      closable,
      visible,
      zIndex,
      style,
      onOk,
      onCancel,
      okText,
      cancelText,
      className,
      centered,
      footer,
      scrollInModal,
      ...others
    } = this.props;

    const styles = { ...style, zIndex };

    const { isShow } = this.state;

    const show = isShow;
    const hasFooter = footer !== null;
    const showHeader = title !== undefined || closable;
    const rewriteClassName = cn({
      [prefixCls]: true,
      [`${className}`]: !!className,
      [`${prefixCls}-popup`]: true,
      [`${prefixCls}-popup__top`]: !centered,
      [`${prefixCls}-scroll__modal`]: scrollInModal,
    });
    return (
      <Popup
        visible={show}
        direction="center"
        {...others}
        className={rewriteClassName}
      >
        <div
          className={`${prefixCls}-content`}
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress}
          ref={this.setModalContainer}
          style={styles}
          data-show={show}
          data-visible={visible}
        >
          {showHeader && <ModalHeader closable={closable} onCancel={onCancel}>{title}</ModalHeader>}
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <div className={`${prefixCls}-button__warpper`}>
              {
                hasFooter && (footer || (
                  <>
                    <Button onClick={onCancel}>{cancelText}</Button>
                    <Button theme="primary" onClick={onOk}>{okText}</Button>
                  </>
                ))
              }
            </div>
          </ModalFooter>
        </div>
        <div className={`${prefixCls}-hidden__elem`}>
          <input type="readonly" tabIndex={0} onFocus={this.onBlur} />
        </div>
      </Popup>
    );
  }
}

export default Modal;
