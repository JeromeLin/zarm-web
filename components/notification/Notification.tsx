import React, { Component } from 'react';
import classnames from 'classnames';
import Transition from '../transition';
import { PropsType } from './PropsType';
import Icon from '../icon';

export default class Notification extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-notification',
    message: '',
    top: 20,
    stayTime: 5000,
    onClick: () => { },
    onClose: () => { },
  };

  state = {
    visible: false,
  };

  private timeout: number | undefined;

  private offsetHeight;

  private notification: any;

  componentDidMount() {
    this.enter();
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  get type() {
    const { type } = this.props;
    switch (type) {
      case 'success':
        return 'right-round-fill';
      case 'error':
        return 'wrong-round-fill';
      case 'info':
        return 'info-round-fill';
      case 'warning':
        return 'warning-round-fill';
      default:
        return type;
    }
  }

  get theme() {
    const { type } = this.props;
    switch (type) {
      case 'error':
        return 'danger';
      case 'info':
        return 'primary';
      default:
        return type;
    }
  }

  onClick = (event) => {
    const { onClick, prefixCls } = this.props;
    if (typeof onClick === 'function') {
      const reg = new RegExp(`${prefixCls}__close`);
      const { currentTarget } = event;
      let { target } = event;
      do {
        if (currentTarget === target) {
          onClick(event);
          return;
        }
        if (reg.test(target.className)) {
          return;
        }
        target = target.parentNode;
      } while (target);
    }
  };

  onClose = (event?: React.SyntheticEvent<any>) => {
    const { onClose } = this.props;

    this.stopTimer();
    this.leave();

    if (typeof onClose === 'function') {
      onClose(event);
    }
  };

  onMouseEnter = () => {
    this.stopTimer();
  };

  onMouseLeave = () => {
    this.startTimer();
  };

  startTimer() {
    const { stayTime } = this.props;
    if (stayTime) {
      this.timeout = setTimeout(() => {
        this.onClose();
      }, stayTime);
    }
  }

  stopTimer() {
    clearInterval(this.timeout);
  }

  enter() {
    this.setState({ visible: true });
  }

  leave() {
    this.setState({ visible: false });
  }

  renderMessage() {
    const { prefixCls, message } = this.props;
    return (
      <>
        <div className={`${prefixCls}__custom-content`}>
          <Icon type={this.type} theme={this.theme} className={`${prefixCls}__icon`} />
          {message}
        </div>
      </>
    );
  }

  renderNotification() {
    const { prefixCls, title, message, btn } = this.props;
    return (
      <>
        <div className={`${prefixCls}__close`} onClick={this.onClose}><Icon type="wrong" /></div>
        {this.type && <Icon type={this.type} theme={this.theme} className={`${prefixCls}__icon`} />}
        <div className={`${prefixCls}__title`}>{title}</div>
        <div className={`${prefixCls}__custom-content`}>
          {message}
        </div>
        {btn && <div className={`${prefixCls}__action-area`}>{btn}</div>}
      </>
    );
  }

  render() {
    const { prefixCls, className, top, style, type, isMessage, willUnMount } = this.props;
    const { visible } = this.state;
    const componentName = isMessage ? 'message' : 'notification';

    return (
      <Transition
        visible={visible}
        name={componentName}
        duration={200}
        unmountOnHide
        onStart={() => { this.offsetHeight = this.notification.offsetHeight; }}
        onBeforeHide={() => willUnMount(this.offsetHeight, parseInt(this.notification.style.top, 10))}
      >
        <div
          ref={(el) => { this.notification = el; }}
          className={classnames(prefixCls, className)}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          style={{ ...style, top }}
        >
          <div className={classnames(`${prefixCls}__content`, { 'has-icon': type })}>
            {isMessage ? this.renderMessage() : this.renderNotification()}
          </div>
        </div>
      </Transition>
    );
  }
}
