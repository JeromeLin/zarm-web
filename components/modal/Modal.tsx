import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import { ModalProps, StyleType } from './PropsType';

function toggleBodyOverflow(show) {
  let scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;
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

class Modal extends Component<ModalProps, any> {

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

  private modal: HTMLDivElement | null;
  private div: HTMLDivElement = document.createElement('div');

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isPending: false,
      animationState: 'leave',
    };
    this.animationEnd = this.animationEnd.bind(this);
  }

  componentWillMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentDidMount() {
    document.body.appendChild(this.div);
  }

  componentWillUpdate() {
    Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.on(this.modal, 'animationend', this.animationEnd);
  }

  componentWillUnmount() {
    Events.off(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.off(this.modal, 'animationend', this.animationEnd);
    toggleBodyOverflow(false);
    setTimeout(() => {
      document.body.removeChild(this.div);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  shouldComponentUpdate(_, nextState) {
    return !!(this.state.isShow || nextState.isShow);
  }

  animationEnd() {
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

  enter() {
    toggleBodyOverflow(true);
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
    toggleBodyOverflow(false);
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
        ref={(ele) => { this.modal = ele; }}
      >
        <div className={`${prefixCls}-wrapper`}>
          <div
            className={classes.dialog}
            style={style.dialog}
            onClick={e => e.stopPropagation()}
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
