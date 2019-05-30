import React, { Component, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { PropsType, StateType } from './PropsType';
import Icon from '../icon';

type SwitchPropsType = PropsType & HTMLAttributes<HTMLSpanElement>;

class Switch extends Component<SwitchPropsType, StateType> {
  static defaultProps: PropsType = {
    prefixCls: 'za-switch',
    checked: false,
    defaultChecked: false,
    disabled: false,
    loading: false,
    checkedChildren: '',
    unCheckedChildren: '',
    onChange: () => {},
  };

  state: StateType = {
    checked: this.props.checked || this.props.defaultChecked,
  };

  componentWillReceiveProps(nextProps: SwitchPropsType) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    const checked = !this.state.checked;
    this.setState({
      checked,
    });
    this.props.onChange(e, checked);
  }

  render() {
    const { props } = this;
    const {
      size, checkedChildren, unCheckedChildren, prefixCls,
      loading, disabled, className, ...others
    } = props;
    const { checked } = this.state;
    const cls = classnames({
      [prefixCls!]: true,
      [className!]: className,
      [`${prefixCls}--${size}`]: typeof size === 'string' && size,
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled || loading,
    });
    const loadingIcon = loading ? <Icon type="loading" className={`${prefixCls}__loadingIcon`} /> : null;
    return (
      <span
        className={cls}
        onClick={(e) => !disabled && !loading && this.onClick(e)}
        {...others}
      >
        {loadingIcon}
        <span className={`${prefixCls}__inner`}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
      </span>
    );
  }
}

export default Switch;
