import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
      style
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
