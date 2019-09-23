import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Switch extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-switch',
    size: null,
    value: false,
    defaultValue: false,
    isCheckedText: '',
    unCheckedText: '',
    onChange: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: !!nextProps.value,
      });
    }
  }

  _onClick() {
    const { onChange } = this.props;
    const { value } = this.state;
    this.setState({
      value: !value,
    });
    onChange(!value);
  }

  render() {
    const {
      size, isCheckedText, unCheckedText, isDisabled, style, prefixCls,
    } = this.props;
    const { value } = this.state;
    const disabled = 'disabled' in this.props || isDisabled;

    const cls = classnames({
      [prefixCls!]: true,
      checked: value,
      disabled,
      [`size-${size}`]: !!size,
    });

    return (
      <span
        className={cls}
        onClick={() => !disabled && this._onClick()}
        style={style}
      >
        <span className={`${prefixCls}-inner`}>
          {value ? isCheckedText : unCheckedText}
        </span>
      </span>
    );
  }
}

export default Switch;
