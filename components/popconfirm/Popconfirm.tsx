import React, { Component } from 'react';
import Popper from 'zarm/lib/popper';
import Button from '../button';
import PropsType from './PropsType';
import Icon from '../Icon';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

const noop = () => { };

class Popconfirm extends Component<PropsType, any> {
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

  private popperRef: React.RefObject<any> = React.createRef();


  constructor(props) {
    super(props);
    this.state = {};
  }


  private handleClose = (): void => {
    this.popperRef.current.handleClose();
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

    const popContent: React.ReactNode = (
      <>
        <div className={`${prefixCls}__message`}>
          {icon}
          <div className={`${prefixCls}__message--title`}>{content}</div>
        </div>
        <div className={`${prefixCls}__buttons`}>
          <Button
            size="sm"
            onClick={this.handleCancel}
          >
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
        ref={this.popperRef}
        content={popContent}
        {...others}
      >
        {children}
      </Popper>
    );
  }
}

export default LocaleReceiver('Popconfirm')(Popconfirm);
