import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType, { OtherProps } from './PropsType';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

class Input extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-input',
    type: 'text',
    size: null,
  };

  render() {
    const { props } = this;
    const {
      type,
      prefixCls,
      isRadius,
      isDisabled,
      size,
      defaultValue,
      className,
      rows,
      cols,
      placeholder,
      maxLength,
      style,
      ...otherProps
    } = props;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    const cls = classnames({
      [prefixCls!]: true,
      disabled,
      radius,
      [className!]: !!className,
      [`size-${size}`]: !!size,
    });

    if ('value' in props) {
      (otherProps as OtherProps).value = fixControlledValue(props.value);
      // value 和 defautValue只能设置一个
      delete (otherProps as OtherProps).defaultValue;
    }

    delete otherProps.radius;

    const input =
      type === 'textarea' ? (
        <textarea
          className={cls}
          style={style}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          {...otherProps}
        >
          {defaultValue}
        </textarea>
      ) : (
        <input
          type={type}
          defaultValue={defaultValue}
          className={cls}
          style={style}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          {...otherProps}
        />
      );

    return <span>{input}</span>;
  }
}

export default Input;
