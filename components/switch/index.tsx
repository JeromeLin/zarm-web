import React, { Component } from 'react';
import { ActivityIndicator } from 'zarm';
import classnames from 'classnames';
import 'zarm/components/activity-indicator/style';
import PropsType from './PropsType';


class Switch extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-switch',
    loading: false,
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
      size, isCheckedText, unCheckedText, disabled, style, prefixCls, loading,
    } = this.props;
    const { value } = this.state;
    const cls = classnames(prefixCls, '', {
      [`${prefixCls}--checked`]: value,
      [`${prefixCls}--disabled`]: disabled || loading,
      [`${prefixCls}--${'sm'}`]: size === 'sm',
    });

    return (
      <span
        className={cls}
        onClick={() => !disabled && this._onClick()}
        style={style}
      >
        <span className={`${prefixCls}__inner`}>
          {value ? isCheckedText : unCheckedText}

          {loading ? (
            <span className={`${prefixCls}__loading`}>
              <ActivityIndicator />
            </span>
          ) : <span />}
        </span>
      </span>
    );
  }
}

export default Switch;
