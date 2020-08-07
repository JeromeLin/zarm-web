import React, { Component } from 'react';
import { Popper } from 'zarm';
import Button from '../button';
import PopconfirmProps from './PropsType';
import Icon from '../icon';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

const noop = () => { };

interface PopconfirmStates {
  visible: boolean;
}

class Popconfirm extends Component<PopconfirmProps, PopconfirmStates> {
  static defaultProps = {
    prefixCls: 'zw-popconfirm',
    className: null,
    trigger: 'click',
    direction: 'bottomLeft',
    onCancel: noop,
    icon: <Icon size="sm" type="warning-round" theme="warning" />,
    onOk: noop,
    content: null,
    hasArrow: true,
  };

  state = {
    visible: false,
  };

  static getDerivedStateFromProps(props: PopconfirmProps, state: PopconfirmStates) {
    if ('show' in props && props.trigger === 'manual') {
      return {
        ...state,
        visible: props.show,
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
    onCancel();
    this.handleClose();
  };

  private handleConfirm = (): void => {
    const { onOk } = this.props;
    onOk();
    this.handleClose();
  };

  render() {
    const { children, content, cancelText, okText, locale, icon, ...others } = this.props;
    const { prefixCls } = this.props;
    const { visible } = this.state;

    const popContent: React.ReactNode = (
      <>
        <div className={`${prefixCls}__message`}>
          {icon}
          <div className={`${prefixCls}__title`}>{content}</div>
        </div>
        <div className={`${prefixCls}__buttons`}>
          <Button size="sm" onClick={this.handleCancel}>
            {cancelText || locale!.cancel}
          </Button>
          <Button size="sm" theme="primary" onClick={this.handleConfirm}>
            {okText || locale!.confirm}
          </Button>
        </div>
      </>
    );

    return (
      <Popper
        content={popContent}
        {...others}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
      >
        {children}
      </Popper>
    );
  }
}

export default LocaleReceiver('Popconfirm')(Popconfirm);
