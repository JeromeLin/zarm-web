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
        return '';
    }
  }
  get theme() {
    const { type } = this.props;
    switch (type) {
      case 'success':
      case 'warning':
        return type;
      case 'error':
        return 'danger';
      case 'info':
        return 'primary';
      default:
        return '';
    }
  }

  onClick = event => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      let target = event.target;
      do {
        const className = target.className;
        // trigger click only when clicks the content
        if (
          className && className.indexOf &&
          className.indexOf('zw-notification__custom-content') != -1) {
          onClick(event);
          return
        }
      } while (target = target.parentNode)
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

  render() {
    const { prefixCls, className, top, style, title, message, type, isMessage, willUnMount, btn } = this.props;
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
          style={{ ...style, top }}
        >
          <div className={classnames(`${prefixCls}__content`, { 'has-icon': type })}>
            {!isMessage && <div className={`${prefixCls}__close`} onClick={this.onClose}><Icon type="wrong" /></div>}
            {!isMessage && type && <Icon type={this.type} theme={this.theme} className={`${prefixCls}__icon`} />}
            {!isMessage && title && <div className={`${prefixCls}__title`}>{title}</div>}
            <div className={`${prefixCls}__custom-content`} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
              {isMessage && <Icon type={this.type} theme={this.theme} className={`${prefixCls}__icon`} />}
              {message}
            </div>
            {!isMessage && btn && <div className={`${prefixCls}__action-area`}>{btn}</div>}
          </div>
        </div>
      </Transition>
    );
  }
}
