import React, { Component } from 'react';
import { ActivityIndicator } from 'zarm';
import classnames from 'classnames';
import 'zarm/components/activity-indicator/style';
import PropsType from './PropsType';


class Switch extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-switch',
    loading: false,
    className: '',
    size: 'md',
    checked: false,
    defaultChecked: false,
    isCheckedText: '',
    unCheckedText: '',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  _onClick() {
    const { onChange } = this.props;
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
    onChange(!checked);
  }

  render() {
    const {
      size, isCheckedText, unCheckedText, disabled, className, prefixCls, loading,
    } = this.props;
    const { checked } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled || loading,
      [`${prefixCls}--${'sm'}`]: size === 'sm',
    });

    return (
      <span
        className={cls}
        onClick={() => !disabled && this._onClick()}
      >
        <span className={`${prefixCls}__inner`}>
          {checked ? isCheckedText : unCheckedText}

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
