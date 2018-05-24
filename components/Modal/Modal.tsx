import React, { Component } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import { ModalProps, StyleType } from './PropsType';

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
    onMaskClick() {},
  };

  private modal: HTMLDivElement | null;

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

  componentWillUpdate() {
    Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.on(this.modal, 'animationend', this.animationEnd);
  }

  componentWillUnmount() {
    Events.off(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.off(this.modal, 'animationend', this.animationEnd);
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
        [prefixCls as string]: true,
        radius: 'radius' in this.props || isRadius,
        round: 'round' in this.props || isRound,
        [`fade-${animationState}`]: isPending,
        [className as string]: !!className,
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
      },
      dialog: {
        width,
        minWidth,
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

    return (
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
      </div>
    );
  }
}

export default Modal;
