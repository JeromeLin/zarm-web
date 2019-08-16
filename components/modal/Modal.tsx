import React, { Component, MouseEvent, KeyboardEvent, ReactNode } from 'react';
import Popup from 'zarm/lib/popup';
import 'zarm/lib/popup/style';
import cn from 'classnames';
import PopupTypes from 'zarm/types/popup/PropsType';
import { unmountComponentAtNode } from 'react-dom';
import Events from '../utils/events';
import { ModalProps, StyleType, ModalBodyProps, ModalHeaderProps, ModalFooterProps } from './PropsType';
import Button from '../button';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import domUtil from '../utils/dom';

const { getSupportedPropertyName } = domUtil;
let animationDurationKey = getSupportedPropertyName('animationDuration') || 'animationDuration';
if (animationDurationKey && animationDurationKey !== 'animationDuration' && !animationDurationKey.startsWith('ms')) {
  animationDurationKey = animationDurationKey.charAt(0).toUpperCase() + animationDurationKey.slice(1);
}

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
  isPending: boolean;
  animationState: 'leave' | 'enter';
}

interface PropsIF extends PopupTypes {
  prefixCls: string;
  okText: ReactNode;                     // 确认按钮的事件
  cancelText: ReactNode;                 // 取消按钮的事件
  closable: boolean;                     // 是显示关闭按钮
  title?: ReactNode;                     // modal的标题
  maskClosable: boolean;                 // 点击空白区域是否关闭
  mask: boolean;                         // 是否显示遮罩层
  footer?: ReactNode;                    // modal底部的内容，为null时不显示底部
  centered: boolean;                     // 是否居中显示
  onOk?: () => void;                     // 点击了确定按钮的回调函数
  onCancel?: () => void;                 // 点击了取消按钮的回调函数
  autoFocus: boolean;                    // 打开弹框时自动获取焦点
  disableEscapeKeyDown: boolean;         // 禁用按esc按键的时候，执行onCancel的行为
  disableEnterKeyDown: boolean;          // 禁用按enter按键的时候，执行onOk的行为
}

class Modal extends Component<PropsIF, StateIF> {
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
  };

  private static instanceList: Modal[] = [];

  private static visibleList: Modal[] = [];

  private static handleVisbibleList(instance: Modal, visible: boolean, noAnimation?: boolean) {
    if (visible) {
      const lastIndex = Modal.visibleList.length - 1;
      if (lastIndex >= 0) {
        Modal.visibleList[lastIndex].sleep = true;
        if (noAnimation) {
          Modal.visibleList[lastIndex].setState({
            isPending: true,
            isShow: false,
          });
        } else {
          Modal.visibleList[lastIndex].leave();
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
          modal.enter();
          modal.sleep = false;
        }
      }
      // eslint-disable-next-line no-plusplus
      while (index--) {
        const modal = Modal.visibleList[index];
        const currentVisible = modal.props.visible;
        if (!currentVisible) {
          modal.sleep = false;
          Modal.visibleList.splice(index, 1);
        }
      }
    }
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

  private sleep: boolean = false;

  private modal!: HTMLDivElement | null;

  private div: HTMLDivElement = document.createElement('div');

  private modalContent!: HTMLDivElement;

  private appended: boolean = false;

  private zwModalContainer = React.createRef<HTMLDivElement>();

  constructor(props: PropsIF) {
    super(props);
    this.state = {
      isShow: false,
      isPending: false,
      animationState: 'leave',
    };
    Modal.instanceList.push(this);
  }

  componentDidMount() {
    const { visible } = this.props;
    if (this.sleep === true) {
      return;
    }
    if (visible) {
      if (!this.appended) {
        document.body.appendChild(this.div);
        this.appended = true;
      }
      this.enter();
      Modal.handleVisbibleList(this, true, true);
    }
    if (this.modal) {
      Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
      Events.on(this.modal, 'animationend', this.animationEnd);
    }
  }

  componentWillReceiveProps(nextProps: ModalProps) {
    const { visible } = this.props;
    if (this.sleep === true) {
      return;
    }
    if (!visible && nextProps.visible) {
      if (!this.appended) {
        document.body.appendChild(this.div);
        this.appended = true;
      }
      Modal.visibleList.forEach((item) => {
        item.setState({
          isShow: false,
        });
      });
      this.enter();
      Modal.handleVisbibleList(this, true);
    } else if (visible && !nextProps.visible) {
      Modal.handleVisbibleList(this, false);
      this.leave();
    }
  }

  componentDidUpdate() {
    const { isShow } = this.state;
    const { current } = this.zwModalContainer;
    if (current) {
      if (isShow) {
        current.focus();
      } else {
        current.blur();
      }
    }
  }

  componentWillUnmount() {
    Modal.unmountModalInstance(this, () => {
      toggleBodyOverflow(false);
    });
    setTimeout(() => {
      unmountComponentAtNode(this.div);
      const { parentNode } = this.div;
      if (parentNode) {
        // 对已插入document的节点进行删除
        document.body.removeChild(this.div);
      }
    });
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (this.state.isShow && this.state.animationState !== 'leave') {
      if (e.keyCode === 27) {
        React.Children.forEach(this.props.children, (elem: any) => {
          if (elem && typeof elem !== 'string' && typeof elem !== 'number') {
            if (elem.props.onClose) {
              elem.props.onClose();
            }
          }
        });
      }
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    if (document.activeElement === this.modalContent) {
      if (this.state.isShow && this.state.animationState !== 'leave') {
        if (this.props.onKeyPress) {
          this.props.onKeyPress(e.nativeEvent);
        }
      }
    }
  };

  onMaskClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  getModalRef = (ele: HTMLDivElement) => {
    if (ele) {
      this.modal = ele;
    }
  };

  modalContentRef = (elem: HTMLDivElement) => {
    this.modalContent = elem;
  };

  enter() {
    if (Modal.visibleList.length === 0) {
      toggleBodyOverflow(true);
    }
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'enter',
    });
  }

  leave() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'leave',
    });
    if (Modal.visibleList.length === 0) {
      toggleBodyOverflow(false);
    }
  }

  render() {
    const {
      prefixCls, children, title, closable, visible,
      onOk, onCancel,
      okText, cancelText,
    } = this.props;
    const showHeader = title !== undefined && closable;
    const classname = cn({
      [prefixCls]: true,
    });
    return (
      <Popup
        visible={visible}
        direction="center"
      >
        <div className={classname} tabIndex={-1} ref={this.zwModalContainer}>
          {showHeader && <ModalHeader onClose={onCancel}>{title}</ModalHeader>}
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <div className={`${prefixCls}-button__warpper`}>
              <Button onClick={onCancel}>{cancelText}</Button>
              <Button theme="primary" onClick={onOk}>{okText}</Button>
            </div>
          </ModalFooter>
        </div>
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
