import React, { Component, PropTypes } from 'react';
import Popover from '../Popover';
import Button from '../Button';

const noop = () => {};

class Popconfirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      this.setState({
        visible: !!nextProps.visible
      });
    }
  }

  handleCancel() {
    const { onCancel } = this.props;
    this.setState({
      visible: false
    });
    onCancel();
  }

  handleConfirm() {
    const { onConfirm } = this.props;
    this.setState({
      visible: false
    });
    onConfirm();
  }

  render() {
    const { visible } = this.state;
    const { children, content, prefixCls, className, trigger, direction, confirmText, cancelText } = this.props;

    const popContent = () => {
      return (
        <div>
          {content}
          <div className={`${prefixCls}-actions`}>
            <Button onClick={() => this.handleCancel()}>{cancelText}</Button>
            <Button theme="info" onClick={() => this.handleConfirm()}>{confirmText}</Button>
          </div>
        </div>
      );
    };

    return (
      <Popover
        content={popContent}
        visible={visible}
        direction={direction}
        prefixCls={prefixCls}
        className={className}
        trigger={trigger}>
        { children }
      </Popover>
    );
  }
}

Popconfirm.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf([
    'click', 'hover'
  ]),
  direction: PropTypes.oneOf([
    'topLeft', 'top', 'topRight',
    'rightTop', 'right', 'rightBottom',
    'bottomLeft', 'bottom', 'bottomRight',
    'leftTop', 'left', 'leftBottom'
  ]),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  content: PropTypes.any,
};

Popconfirm.defaultProps = {
  prefixCls: 'ui-popover',
  className: null,
  visible: false,
  trigger: 'click',
  direction: 'bottomLeft',
  onCancel: noop,
  onConfirm: noop,
  confirmText: '确认',
  cancelText: '取消',
  content: null,
};

export default Popconfirm;
