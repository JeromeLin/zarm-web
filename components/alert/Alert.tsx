import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import AlertProps from './PropsType';

class Alert extends Component<AlertProps, any> {
  static defaultProps = {
    prefixCls: 'ui-alert',
    type: 'info',
    title: '',
    description: null,
    width: 500,
    showIcon: false,
    closable: false,
    closeText: null,
    preventHide: false,
    onClick: () => {},
    onClose: () => {},
    afterClose: () => {},
  };

  domRef: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = {
      // 是否展示提示框
      visibility: true,
    };
  }

  componentDidMount() {
    if (this.domRef) {
      this.domRef.style.height = `${this.domRef.offsetHeight}px`;
    }
  }

  close = () => {
    const { afterClose } = this.props;
    window.setTimeout(() => {
      this.setState({ visibility: false });
      afterClose();
    }, 550);
    if (this.domRef) {
      this.domRef.style.height = '0px';
      this.domRef.style.paddingTop = '0px';
      this.domRef.style.paddingBottom = '0px';
      this.domRef.style.marginBottom = '0px';
    }
  };

  handleClose = () => {
    const { preventHide, onClick, onClose } = this.props;
    if (preventHide) {
      onClick({
        close: this.close.bind(this),
      });
    } else {
      this.close();
      onClose();
    }
  };

  render() {
    const {
      prefixCls,
      type,
      title,
      width,
      className,
      style,
      closable,
      closeText,
      description,
      showIcon,
    } = this.props;

    const { visibility, closeStart } = this.state;

    return (
      visibility && (
        <div
          ref={(domRef) => { this.domRef = domRef; }}
          style={{ width, ...style }}
          className={classnames(prefixCls, className, {
            [`${prefixCls}-${type}`]: Boolean(type),
            [`${prefixCls}-closable`]: closable,
            [`${prefixCls}-no-with-description`]: !description,
            [`${prefixCls}-sm-icon`]: showIcon && !description,
            [`${prefixCls}-lg-icon`]: showIcon && Boolean(description),
            [`${prefixCls}-close-animation`]: closeStart,
          })}
        >
          {showIcon && <AlertIcon {...this.props} />}
          {closable && <CloseIcon closable={closable} closeText={closeText} prefixCls={prefixCls} handleClose={this.handleClose} close={this.close} /> }
          <span className={`${prefixCls}-message`}>{title}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
        </div>
      )
    );
  }
}

/**
 * 适配icon
 * @param props
 */
function AlertIcon(props) {
  const { description, type, icon } = props;
  // 无描述显示小图， 有描述显示大图
  // 优先选用用户传入的icon类型
  // 适配type
  if (icon && icon.isReactComponent) {
    return icon;
  }
  let iconType;
  switch (type) {
    case 'warning':
      iconType = 'warning-round-fill';
      break;
    case 'success':
      iconType = 'right-round-fill';
      break;
    case 'error':
      iconType = 'wrong-round-fill';
      break;
    case 'info':
    default:
      iconType = 'info-round-fill';
      break;
  }
  if (description === null) {
    return <Icon type={iconType} size="sm" />;
  }
  return <Icon type={iconType} size="lg" />;
}

/**
 * 适配关闭按钮
 * @param param
 */
function CloseIcon({ closable, closeText, prefixCls, handleClose, close }) {
  if (!closable) {
    return null;
  }

  if (!closeText) {
    return (
      <Icon className={`${prefixCls}-close-btn`} type="wrong" onClick={handleClose} />
    );
  }

  if (Object.is(closeText.constructor, String)) {
    return <button className={`${prefixCls}-custom-close-btn`} onClick={handleClose}>{ closeText }</button>;
  }

  if (Object.is(closeText.constructor, Function)) {
    const ReactNode = closeText;
    return <ReactNode close={close} />;
  }

  return closeText;
}

export default Alert;
