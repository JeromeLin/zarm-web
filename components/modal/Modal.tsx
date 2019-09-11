import React, { Component, MouseEvent, KeyboardEvent } from 'react';
import { createPortal, unmountComponentAtNode } from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import { ModalProps, StyleType, ModalBodyProps, ModalHeaderProps, ModalFooterProps } from './PropsType';
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

class Modal extends Component<ModalProps, StateIF> {
  static Header: typeof ModalHeader;

  static Body: typeof ModalBody;

  static Footer: typeof ModalFooter;

  static defaultProps = {
    prefixCls: 'ui-modal',
    visible: false,
    animationType: 'zoom',
    animationDuration: 300,
    width: 600,
    minWidth: 270,
    isRadius: false,
    isRound: false,
    onMaskClick() { },
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

  constructor(props: ModalProps) {
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
    if (this.modalContent) {
      if (isShow) {
        this.modalContent.focus();
      } else {
        this.modalContent.blur();
      }
    }
  }

  componentWillUnmount() {
    Events.off(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.off(this.modal, 'animationend', this.animationEnd);
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

  animationEnd = () => {
    if (this.state.animationState === 'leave') {
      this.setState({
        isShow: false,
        isPending: false,
      });
    } else {
      this.setState({
        isShow: true,
        isPending: false,
      });
    }
  };

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
      prefixCls,
      animationType,
      animationDuration,
      width,
      minWidth,
      isRadius,
      isRound,
      className,
      onMaskClick,
      children,
    } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const classes = {
      modal: classnames({
        [prefixCls!]: true,
        radius: 'radius' in this.props || isRadius,
        round: 'round' in this.props || isRound,
        [`fade-${animationState}`]: isPending,
        [className!]: !!className,
      }),
      dialog: classnames({
        [`${prefixCls}-dialog`]: true,
        [`${animationType}-${animationState}`]: true,
      }),
    };

    const style: StyleType = {
      modal: {
        [animationDurationKey]: `${animationDuration}ms`,
        position: 'fixed',
      },
      dialog: {
        width: Number(width),
        minWidth: Number(minWidth),
        [animationDurationKey]: `${animationDuration}ms`,
      },
    };
    if (!isShow) {
      style.modal.display = 'none';
    }
    return createPortal(
      <div
        className={classes.modal}
        style={style.modal}
        onClick={onMaskClick}
        ref={this.getModalRef}
      >
        <div className={`${prefixCls}-wrapper`}>
          <div
            ref={this.modalContentRef}
            tabIndex={-1}
            className={classes.dialog}
            style={style.dialog}
            onClick={this.onMaskClick}
            onKeyDown={this.onKeyDown}
            onKeyPress={this.onKeyPress}
          >
            {children}
          </div>
        </div>
      </div>,
      this.div,
    );
  }
}

// tslint:disable-next-line:no-namespace
// eslint-disable-next-line no-redeclare
declare namespace Modal {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Props extends ModalProps {}
  export interface BodyProps extends ModalBodyProps { }
  export interface HeaderProps extends ModalHeaderProps { }
  export interface FooterProps extends ModalFooterProps { }
}

export default Modal;
