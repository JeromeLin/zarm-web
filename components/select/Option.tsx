import React, { PureComponent, Component } from 'react';
import cn from 'classnames';
import Icon from '../icon';
import { OptionProps } from './PropsType';

class Option extends PureComponent<OptionProps, any> {
  static defaultProps = {
    isDisabled: false,
    onChange: () => { },
  };

  render() {
    const { props } = this;
    const {
      children, className, checked, disabled, onChange, isDisabled, onDoubleClick, showCheckIcon, ...DOMProps
    } = props;

    const cls = cn({
      [`${className}`]: !!className,
      'ui-option-list': true,
      'checked': checked,
      'disabled': isDisabled || disabled,
    });
    return (
      <li
        className={cls}
        style={{ paddingRight: showCheckIcon ? 25 : 10 }}
        onClick={onChange}
        onDoubleClick={onDoubleClick}
        {...DOMProps}
      >
        {children}
        {showCheckIcon && checked && <Icon className="checked-icon" theme="info" type="right" />}
      </li>
    );
  }
}

export default Option;
