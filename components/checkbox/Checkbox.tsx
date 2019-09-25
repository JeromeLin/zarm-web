import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Checkbox extends Component<PropsType, any> {
  static Group;

  static defaultProps = {
    prefixCls: 'zw-checkbox',
    defaultChecked: false,
    indeterminate: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('checked' in nextProps) {
      return {
        checked: !!nextProps.checked,
      };
    }
    return null;
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
    const checkboxWrapperClass = classnames(className, `${prefixCls}--wrapper`, {
      [`${prefixCls}--wrapper--disabled`]: defualtDisabled,
    });
    const checkboxClass = classnames(className, `${prefixCls}`, {
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: defualtDisabled,
      [`${prefixCls}--indeterminate`]: indeterminate,
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
