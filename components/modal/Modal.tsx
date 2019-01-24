import React, { Component, MouseEvent, KeyboardEvent } from 'react';
import { createPortal, unmountComponentAtNode } from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import { ModalProps, StyleType } from './PropsType';

function toggleBodyOverflow(show: boolean) {
  let scrollBarWidth = window.innerWidth - (document.documentElement as HTMLElement).offsetWidth;
  if (show === true) {
    document.body.classList.add('ui-modal-body-overflow');
    if (scrollBarWidth > 0) {
      document.body.style.setProperty('padding-right', scrollBarWidth + 'px');
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
  static Header: any;
  static Body: any;
  static Footer: any;

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
  private static handleVisbibleList(instance: Modal, visible: boolean) {
    if (visible) {
      const lastIndex = Modal.visibleList.length - 1;
      if (lastIndex >= 0) {
        Modal.visibleList[lastIndex].sleep = true;
        Modal.visibleList[lastIndex].leave();
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
    if (this.props.visible) {
      this.enter();
    }
    if (this.modal) {
      Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
      Events.on(this.modal, 'animationend', this.animationEnd);
      Events.on(document, 'keydown', this.onKeyPress);
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
      if (this.div.getAttribute('role') === 'dialog') { // 对已插入document的节点进行删除
        document.body.removeChild(this.div);
      }
    });
  }

  componentWillReceiveProps(nextProps: ModalProps) {
    if (this.sleep === true) {
      return;
    }
    if (!this.props.visible && nextProps.visible) {
      if (!this.appended) {
        document.body.appendChild(this.div);
        this.appended = true;
      }
      this.enter();
      Modal.handleVisbibleList(this, true);
    } else if (this.props.visible && !nextProps.visible) {
      Modal.handleVisbibleList(this, false);
      this.leave();
    }
  }

  shouldComponentUpdate(_: ModalProps, nextState: StateIF) {
    return !!(this.state.isShow || nextState.isShow);
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
  }

  onKeyPress = (e: KeyboardEvent) => {
    if (this.state.isShow && e.keyCode === 27 && this.state.animationState !== 'leave') {
      React.Children.forEach(this.props.children, (elem) => {
        if (typeof elem !== 'string' && typeof elem !== 'number') {
          if (elem.props.onClose) {
            elem.props.onClose();
          }
        }
      });
    }
  }

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

  onMaskClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  getModalRef = (ele: HTMLDivElement) => {
    if (ele) {
      this.modal = ele;
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
        WebkitAnimationDuration: `${animationDuration}ms`,
        MozAnimationDuration: `${animationDuration}ms`,
        msAnimationDuration: `${animationDuration}ms`,
        OAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
        position: 'fixed',
      },
      dialog: {
        width: Number(width),
        minWidth: Number(minWidth),
        WebkitAnimationDuration: `${animationDuration}ms`,
        MozAnimationDuration: `${animationDuration}ms`,
        msAnimationDuration: `${animationDuration}ms`,
        OAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
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
            className={classes.dialog}
            style={style.dialog}
            onClick={this.onMaskClick}
          >
            {children}
          </div>
        </div>
      </div>,
      this.div,
    );
  }
}

export default Modal;
