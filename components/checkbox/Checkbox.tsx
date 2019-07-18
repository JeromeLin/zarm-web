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
      id,
      indeterminate,
      disabled,
    } = this.props;
    const defualtDisabled = disabled || isDisabled;
    const checkboxWrapperClass = classnames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: checked,
      [`${prefixCls}-wrapper-disabled`]: defualtDisabled,
      [`${prefixCls}-wrapper-indeterminate`]: indeterminate,
    });

    const checkboxClass = classnames(prefixCls, {
      [`${prefixCls}-disabled`]: defualtDisabled,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-indeterminate`]: indeterminate,
    });

    return (
      <label className={checkboxWrapperClass} style={style}>
        <span className={checkboxClass}>
          <input
            className={`${prefixCls}__input`}
            type="checkbox"
            value={value}
            checked={checked}
            disabled={disabled}
            id={id}
            onChange={e => this._onClick(e)}
          />
          <span className={`${prefixCls}__inner`} />
        </span>
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  }
}

export default Checkbox;
