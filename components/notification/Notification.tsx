import React, { Component } from 'react';
import classnames from 'classnames';
import Transition from '../transition';
import NotificationProps from './PropsType';
import Icon from '../icon';

export default class Notification extends Component<NotificationProps, any> {
  static defaultProps = {
    prefixCls: 'za-notification',
    message: '',
    top: 20,
    stayTime: 4500,
    onClick: () => {},
    onClose: () => {},
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
    const { theme } = this.props;
    switch (theme) {
      case 'success':
        return 'right-round-fill';
      case 'danger':
        return 'wrong-round-fill';
      case 'primary':
        return 'info-round-fill';
      case 'warning':
        return 'warning-round-fill';
      // case 'loading':
      //   return 'loading';
      default:
        return '';
    }
  }

  onClick = (event: React.SyntheticEvent<any>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
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
    const { prefixCls, className, top, style, title, message, theme, isMessage, willUnMount, btn } = this.props;
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
          <div className={classnames(`za-${componentName}__content`, { 'has-icon': theme })}>
            {!isMessage && <div className={`za-${componentName}__close`} onClick={this.onClose}><Icon type="wrong" /></div>}
            {!isMessage && theme && <Icon type={this.type} className={`za-${componentName}__icon`} theme={theme} />}
            {title && <div className={`za-${componentName}__title`}>{title}</div>}
            <div className={`za-${componentName}__custom-content`} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
              {isMessage && <Icon type={this.type} className={`za-${componentName}__icon`} theme={theme} />}
              {message}
              {!isMessage && <span className={`za-${componentName}__action-area`}>{btn}</span>}
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}
