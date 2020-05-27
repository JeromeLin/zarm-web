import React, { Component } from 'react';
import { ActivityIndicator } from 'zarm';
import classnames from 'classnames';
import PropsType from './PropsType';

export interface SwitchState {
  checked?: boolean;
}

class Switch extends Component<PropsType, SwitchState> {
  static displayName = 'Switch';

  static defaultProps = {
    prefixCls: 'zw-switch',
    loading: false,
    size: 'md',
    defaultChecked: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (('checked' in nextProps) && nextProps.checked !== prevState.checked) {
      return {
        checked: nextProps.checked,
      };
    }
    return null;
  }

  _onClick() {
    const { onChange } = this.props;
    const { checked } = this.state;

    const newChecked = !checked;
    if (!('checked' in this.props)) {
      this.setState({ checked: newChecked });
    }

    typeof onChange === 'function' && onChange(newChecked);
  }

  render() {
    const { size, disabled, className, prefixCls, loading, onChange, checkedText, unCheckedText, ...rest } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled || loading,
      [`${prefixCls}--loading`]: loading,
      [`${prefixCls}--${size}`]: size === 'sm',
    });

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && !loading && this._onClick()}
        className={cls}
        {...rest}
      >
        {loading && <ActivityIndicator prefixCls="zw-activity-indicator" />}
        {(checkedText || unCheckedText) && <span className={`${prefixCls}__text`}>{checked ? checkedText : unCheckedText}</span>}
      </button>
    );
  }
}

export default Switch;
