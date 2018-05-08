import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

class Input extends Component {
  render() {
    const { props } = this;
    const {
      type,
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
      'ui-input': true,
      disabled,
      radius,
      [`size-${size}`]: size,
      [className]: !!className
    });

    if ('value' in props) {
      otherProps.value = fixControlledValue(props.value);
      // value 和 defautValue只能设置一个
      delete otherProps.defaultValue;
    }

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

Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isRadius: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  size: null,
  isRadius: false,
  isDisabled: false,
  className: null
};

export default Input;
