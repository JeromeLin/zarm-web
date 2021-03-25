import React, { Component } from 'react';
import classnames from 'classnames';
import Popover from '../popover';
import Button from '../button';
import PopconfirmProps from './PropsType';
import Icon from '../icon';

interface PopconfirmStates {
  visible: boolean;
}

class Popconfirm extends Component<PopconfirmProps, PopconfirmStates> {
  static defaultProps: PopconfirmProps = {
    prefixCls: 'zw-popconfirm',
    trigger: 'click',
    direction: 'top',
    icon: <Icon type="warning-round-fill" theme="warning" />,
  };

  state: PopconfirmStates = {
    visible: false,
  };

  static getDerivedStateFromProps(props: PopconfirmProps, state: PopconfirmStates) {
    if ('visible' in props && props.trigger === 'manual') {
      return {
        ...state,
        visible: props.visible,
      };
    }
    return null;
  }

  private isManual = (): boolean => {
    const { trigger } = this.props;
    return trigger === 'manual';
  };

  private onVisibleChange = (visible: boolean): void | boolean => {
    if (visible === this.state.visible) return false;
    this.setState({ visible });
  };

  private handleClose = (): void => {
    !this.isManual() && this.setState({ visible: false });
  };

  private handleCancel = (): void => {
    const { onCancel } = this.props;
    typeof onCancel === 'function' && onCancel();
    this.handleClose();
  };

  private handleConfirm = (): void => {
    const { onOk } = this.props;
    typeof onOk === 'function' && onOk();
    this.handleClose();
  };

  render() {
    const {
      prefixCls,
      className,
      children,
      content,
      cancelText,
      okText,
      locale,
      icon,
      ...others
    } = this.props;
    const { visible } = this.state;
    const cls = classnames(prefixCls, className);

    console.log(cancelText, locale);
    const popContent: React.ReactNode = (
      <>
        <div className={`${prefixCls}__message`}>
          {icon}
          <div className={`${prefixCls}__title`}>{content}</div>
        </div>
        <div className={`${prefixCls}__buttons`}>
          <Button size="sm" onClick={this.handleCancel}>
            {cancelText || locale!.cancelText}
          </Button>
          <Button size="sm" theme="primary" onClick={this.handleConfirm}>
            {okText || locale!.okText}
          </Button>
        </div>
      </>
    );

    return (
      <Popover
        className={cls}
        content={popContent}
        {...others}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
      >
        {children}
      </Popover>
    );
  }
}

export default Popconfirm;
