import React, { Component, KeyboardEvent, Fragment } from 'react';
import Popup from 'zarm/lib/popup';
import 'zarm/lib/popup/style';
import cn from 'classnames';

import { ModalProps, ModalBodyProps, ModalHeaderProps, ModalFooterProps } from './PropsType';
import Button from '../button';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { Alert, Confirm } from './alert';

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
    centered: false,
    autoFocus: true,
    disableEscapeKeyDown: false,
    disableEnterKeyDown: false,
    zIndex: 2020,
  };

  private static instanceList: Modal[] = [];

  private static visibleList: Modal[] = [];

  private static handleVisbibleList(instance: Modal, visible: boolean) {
    if (visible) {
      const lastIndex = Modal.visibleList.length - 1;
      if (lastIndex >= 0) {
        Modal.visibleList[lastIndex].state.sleep = true;
        Modal.visibleList[lastIndex].setState({
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
    const instanceIndex = Modal.instanceList.findIndex(item => item === instance);
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
    // todo 第一次加载的时候不能正确获取this.modalContent
    if (this.modalContent && autoFocus) {
      if (visible) {
        Modal.handleVisbibleList(this, !!visible);
        setTimeout(() => {
          this.modalContent.focus();
        }, 500);
      }
      if (isShow) {
        setTimeout(() => {
          this.modalContent.focus();
        }, 50);
      }
      if (visible === false) {
        Modal.handleVisbibleList(this, !!visible);
        this.modalContent.blur();
      }
    }
  }

  componentDidUpdate(prevProps: ModalProps, prevState: StateIF) {
    const { isShow } = this.state;
    const { autoFocus, visible } = this.props;
    if (this.modalContent && autoFocus) {
      if (visible && !prevProps.visible) {
        Modal.handleVisbibleList(this, !!visible);
        setTimeout(() => {
          this.modalContent.focus();
        }, 500);
      }
      if (isShow && !prevState.isShow) {
        setTimeout(() => {
          this.modalContent.focus();
        }, 50);
      }
      if (prevProps.visible && visible === false) {
        Modal.handleVisbibleList(this, !!visible);
        this.modalContent.blur();
      }
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

  onKeyPress = (e: KeyboardEvent) => {
    const { visible, onOk, onKeyPress, disableEnterKeyDown } = this.props;
    if (visible && disableEnterKeyDown === false) {
      if (document.activeElement === this.modalContent && visible && e.nativeEvent.keyCode === 13) {
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
      prefixCls, children, title, closable, visible, zIndex, style,
      onOk, onCancel,
      okText, cancelText,
      footer,
    } = this.props;

    const styles = { ...style, zIndex };

    const { isShow } = this.state;

    const show = isShow;
    const hasFooter = footer !== null;
    const showHeader = title !== undefined || closable;
    const classname = cn({
      [prefixCls]: true,
    });
    return (
      <Popup
        visible={show}
        direction="center"
      >
        <div
          className={classname}
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
                  <Fragment>
                    <Button onClick={onCancel}>{cancelText}</Button>
                    <Button theme="primary" onClick={onOk}>{okText}</Button>
                  </Fragment>
                ))
              }
            </div>
          </ModalFooter>
        </div>
        <div className={`${prefixCls}-hidden__elem`} tabIndex={0} onFocus={this.onBlur} />
      </Popup>
    );
  }
}

// tslint:disable-next-line:no-namespace
// eslint-disable-next-line no-redeclare
declare namespace Modal {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Props extends ModalProps { }
  export interface BodyProps extends ModalBodyProps { }
  export interface HeaderProps extends ModalHeaderProps { }
  export interface FooterProps extends ModalFooterProps { }
}

export default Modal;
