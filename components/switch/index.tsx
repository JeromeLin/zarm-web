import React, { Component } from 'react';
import ActivityIndicator from 'zarm/lib/activity-indicator';
import classnames from 'classnames';
import PropsType from './PropsType';
import 'zarm/components/activity-indicator/style/index';

export interface SwitchState {
  checked?: boolean;
}

class Switch extends Component<PropsType, SwitchState> {
  static displayName = 'Switch';

  static defaultProps = {
    prefixCls: 'zw-switch',
    loading: false,
    size: 'md',
    checked: false,
    defaultChecked: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  _onClick() {
    const { onChange } = this.props;
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
    onChange && onChange(!checked);
  }

  render() {
    const {
      size, disabled, className, prefixCls, loading, style,
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
        style={{ ...style }}
        onClick={() => !disabled && !loading && this._onClick()}
      >
        <span className={`${prefixCls}__inner`}>
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
