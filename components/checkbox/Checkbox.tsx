import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Checkbox extends Component<PropsType, any> {
  static Group;

  static defaultProps = {
    prefixCls: 'zw-checkbox',
    defaultChecked: false,
    isDisabled: false,
    indeterminate: false,
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

  _onClick(e) {
    const { checked } = this.state;
    const { onChange } = this.props;

    this.setState({
      checked: !checked,
    });
    onChange(e);
  }

  render() {
    const { checked } = this.state;
    const {
      prefixCls,
      value,
      isDisabled,
      className,
      children,
      style,
      indeterminate,
    } = this.props;
    const disabled = 'disabled' in this.props || isDisabled;
    const cls = classnames(prefixCls, className, {
      'is-checked': checked,
      'is-disabled': disabled,
      'is-indeterminate': checked && indeterminate,
    });

    return (
      <label style={style}>
        <span className={cls}>
          <input
            className={`${prefixCls}__input`}
            type="checkbox"
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={e => this._onClick(e)}
          />
          <span className={`${prefixCls}__inner`} />
        </span>
        {children}
      </label>
    );
  }
}

export default Checkbox;
